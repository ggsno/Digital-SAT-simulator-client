import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { fetchPostExamResults } from "../service/exam";
import { Urls } from "../pages/router";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loadingState } from "../atoms/loading";
import { useEffect, useRef, useState } from "react";
import {
  MODULE_TIME_MATH_MINUTE,
  MODULE_TIME_READING_AND_WRITING_MINUTE,
  SECTION_TITLES,
} from "../utils/constants";
import { ExamProps } from "../service/convertDataFunctions";
import { forReviewState, optionEliminatorState } from "./Simulator.atoms";

type AnnotateProps = {
  id: string;
  selectedText: string;
  comment: string;
};

type QuestionProps = {
  passage: string | null;
  question: string;
  choices: string[] | null;
};

const indexState = atom({
  key: "Index",
  default: { section: 0, module: 0, question: 0 },
});

const answerState = atom<{ module: string[]; accumulator: string[] }>({
  key: "Answer",
  default: { module: [], accumulator: [] },
});

const moduleState = atom<QuestionProps[]>({
  key: "Module",
  default: [],
});

const annotateState = atom<{
  list: AnnotateProps[];
  current: AnnotateProps | null;
  boundary: React.RefObject<HTMLDivElement | null> | null;
}>({
  key: "Annotate",
  default: {
    list: [],
    current: null,
    boundary: null,
  },
});

export const examTimeState = atom<{
  startTime: number | null;
  endTime: number | null;
}>({
  key: "ExamTime",
  default: { startTime: null, endTime: null },
});

export const useIndexControl = () => {
  const [index, setIndex] = useRecoilState(indexState);
  const [answer, setAnswer] = useRecoilState(answerState);

  const accumulateAnswer = () => {
    setAnswer({
      ...answer,
      accumulator: [...answer.accumulator, ...answer.module],
    });
    toast.success("임시 저장되었습니다.");
  };

  const getQuestionsLength = () => {
    return answer.module.length;
  };

  const navigateQuestion = (questionIndex: number) => {
    setIndex({ ...index, question: questionIndex });
  };

  const isAnswered = (questionIndex: number) =>
    answer.module[questionIndex] !== "" ? true : false;

  const goNextQuestion = () => {
    setIndex({ ...index, question: index.question + 1 });
  };

  const goPrevQuestion = () => {
    setIndex({ ...index, question: index.question - 1 });
  };

  const goNextModule = () => {
    accumulateAnswer();
    setIndex({ ...index, question: 0, module: index.module + 1 });
  };
  const goNextSection = () => {
    accumulateAnswer();
    setIndex({
      ...index,
      question: 0,
      module: -1,
      section: index.section + 1,
    });
  };

  const goReviewModule = () => {
    setIndex({ ...index, question: answer.module.length });
  };

  const timeout = () => {
    toast.success("시간 초과");
    goNextModule();
  };

  return {
    index,
    getQuestionsLength,
    navigateQuestion,
    isAnswered,
    goNextQuestion,
    goPrevQuestion,
    goNextModule,
    goNextSection,
    goReviewModule,
    timeout,
  };
};

export const useAnswer = () => {
  const [answer, setAnswer] = useRecoilState(answerState);

  const setModuleAnswer = (index: number, newAnswer: string) => {
    const newModuleAnswer = answer.module.slice();
    newModuleAnswer.splice(index, 1, newAnswer);
    setAnswer({
      ...answer,
      module: newModuleAnswer,
    });
  };

  const removeModuleAnswer = (index: number) => {
    const newModuleAnswer = answer.module.slice();
    newModuleAnswer.splice(index, 1, "");
    setAnswer({
      ...answer,
      module: newModuleAnswer,
    });
  };

  const moduleAnswers = answer.module;

  return { moduleAnswers, setModuleAnswer, removeModuleAnswer };
};

export const useModule = (exam: ExamProps) => {
  const [index, setIndex] = useRecoilState(indexState);

  const [sectionLength, moduleLength, questionLength] = [
    exam.sections.length,
    exam.sections[index.module].modules.length,
    exam.sections[index.section].modules[index.module].questions.length,
  ];

  /** TODO: 로딩 컴포넌트 분리 */
  const setLoading = useSetRecoilState(loadingState);
  const [answer, setAnswer] = useRecoilState(answerState);
  const resetAnswer = useResetRecoilState(answerState);
  const resetIndex = useResetRecoilState(indexState);
  const [module, setModule] = useRecoilState(moduleState);

  const setExamTime = useSetRecoilState(examTimeState);
  const resetReview = useResetRecoilState(forReviewState);
  const resetOptionEliminator = useResetRecoilState(optionEliminatorState);
  const resetAnnoateList = useResetRecoilState(annotateState);

  const navigator = useNavigate();

  const postResult = async () => {
    setLoading(true);
    await fetchPostExamResults({
      answers: [...answer.accumulator, ...answer.module],
    });
    setLoading(false);
    toast.success("제출되었습니다");
    resetAnswer();
    resetIndex();
    navigator(Urls.home);
  };

  useEffect(() => {
    if (index.module >= 0) {
      const newModule =
        exam.sections[index.section].modules[index.module].questions;
      setModule(newModule);
      resetReview();
      resetOptionEliminator();
      resetAnnoateList();
      setAnswer({ ...answer, module: Array(questionLength).fill("") });
      setExamTime({
        startTime: Date.now(),
        endTime:
          (index.section === 0
            ? MODULE_TIME_READING_AND_WRITING_MINUTE
            : MODULE_TIME_MATH_MINUTE) * 60,
      });
    }
    setLoading(false);
  }, [index.module]);

  useEffect(() => {
    const result = { ...index };
    if (result.question === 0) return;

    if (index.question > questionLength) {
      result.question = 0;
      result.module++;
    }
    if (index.module >= moduleLength) {
      result.question = 0;
      /** break time module index = -1 */
      result.module = -1;
      result.section++;
    }
    if (index.section >= sectionLength) {
      postResult();
      return;
    }
    if (result.question === 0) setIndex(result);
  }, [index]);

  return { module };
};

export const useAnnotate = () => {
  const [module, setModule] = useRecoilState(moduleState);
  const { question: questionIndex } = useRecoilValue(indexState);
  const selectionRef = useRef<Selection | null>(null);
  const [annotate, setAnnotate] = useRecoilState(annotateState);

  const setAnnotateBoundary = (
    ref: React.MutableRefObject<HTMLDivElement | null>
  ) => {
    setAnnotate({ ...annotate, boundary: ref });
  };

  const onClickAnnotate = () => {
    try {
      const selection = selectionRef.current;
      const range = selection?.getRangeAt(selection.rangeCount - 1);
      const container = range?.commonAncestorContainer as HTMLElement;
      if (
        !selection ||
        !container ||
        !range ||
        !annotate.boundary?.current?.contains(container) ||
        selection.isCollapsed
      ) {
        alert("MAKE A SELECTION FIRST");
        return;
      }

      const newId = Date.now().toString();
      const newSpan = document.createElement("span");
      newSpan.id = newId;
      newSpan.classList.add(
        "custom_highlight",
        "bg-yellow",
        "border-b",
        "border-dashed",
        "hover:bg-yellow-dark"
      );
      const newAnnotate = {
        id: newId,
        selectedText: selection.toString(),
        comment: "",
        ref: newSpan,
      };
      setAnnotate({
        ...annotate,
        current: newAnnotate,
        list: [...annotate.list, newAnnotate],
      });
      range.surroundContents(newSpan);

      setModule([
        ...module,
        ...module.map((question, i) =>
          i !== questionIndex
            ? question
            : {
                ...question,
                passage: annotate.boundary!.current!.innerHTML.replace(
                  /^<div.*?>|<\/div>$/g,
                  ""
                ),
              }
        ),
      ]);
    } catch (err) {
      alert(err);
      throw err;
    }
  };

  const saveAnnotate = (newComment: string) => {
    setAnnotate({
      ...annotate,
      current: null,
      list: annotate.list.map((element) =>
        element.id !== annotate.current?.id
          ? element
          : {
              ...element,
              comment: newComment,
            }
      ),
    });
  };

  const deleteAnnotate = () => {
    const currentId = annotate.current?.id;
    if (!currentId) throw new Error("no current annotate id");
    setAnnotate({
      ...annotate,
      list: annotate.list.filter((e) => e.id !== currentId),
      current: null,
    });

    const reg = new RegExp(
      `<span\\s+id\\s*=\\s*["']\\s*${currentId}\\s*["']\\s+class\\s*=\\s*["'].*?\\bcustom_highlight\\b.*?["']\\s*>(.*?)<\/span>`
    );

    setModule(
      module.map((question, i) =>
        i !== questionIndex
          ? question
          : {
              ...question,
              passage: question.passage!.replace(reg, "$1"),
            }
      )
    );
  };

  const closeAnnotate = () => {
    setAnnotate({ ...annotate, current: null });
  };

  const isDescendantOfSelection = (target: any) => {
    const range = document.getSelection()?.getRangeAt(0);
    const container = range?.commonAncestorContainer;
    return container?.contains(target);
  };

  useEffect(() => {
    const highlightElements = document.querySelectorAll(".custom_highlight");

    const removeListener = [...highlightElements].map((element) => {
      const callback = () => {
        setAnnotate({
          ...annotate,
          current: {
            id: element.id,
            selectedText: element.textContent ?? "",
            comment: "",
          },
        });
      };
      element.addEventListener("click", callback);
      return () => element.removeEventListener("click", callback);
    });

    return () => removeListener.forEach((remove) => remove());
  }, [annotate.list, questionIndex]);

  useEffect(() => {
    const callback = () => {
      const selectionNow = window.getSelection();
      if (
        selectionNow &&
        selectionNow.rangeCount > 0 &&
        !selectionNow.isCollapsed
      ) {
        selectionRef.current = selectionNow;
      }
    };
    document.addEventListener("selectionchange", callback);
    return () => document.removeEventListener("selectionchange", callback);
  }, []);

  return {
    annotate,
    setAnnotateBoundary,
    onClickAnnotate,
    saveAnnotate,
    deleteAnnotate,
    closeAnnotate,
    isDescendantOfSelection,
  };
};

export const useTimer = () => {
  const { startTime, endTime } = useRecoilValue(examTimeState);
  if (!startTime || !endTime) throw new Error("no exam time");
  const { timeout } = useIndexControl();
  const [time, setTime] = useState(endTime);
  const [isTimeHidden, setIsTimeHidden] = useState(false);

  const toggleTimeHidden = () => {
    setIsTimeHidden(!isTimeHidden);
  };

  const getTime = () =>
    `${Math.floor(time / 60 >= 0 ? time / 60 : 0)
      .toString()
      .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;

  useEffect(() => {
    const callback = () => {
      if (startTime) {
        setTime(Math.ceil((startTime + endTime * 1000 - Date.now()) / 1000));
      }
      if (startTime !== null && startTime + endTime * 1000 - Date.now() < 0) {
        clearInterval(timer);
        timeout();
      }
    };
    const timer = setInterval(callback, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  return { isTimeHidden, toggleTimeHidden, getTime };
};

export const useConstantValue = () => {
  const index = useRecoilValue(indexState);

  const getCurrentSectionTitle = () => {
    return SECTION_TITLES[index.section];
  };

  const getCurrentModuleTime = () => {
    if (index.module === 0) return MODULE_TIME_READING_AND_WRITING_MINUTE;
    if (index.module === 1) return MODULE_TIME_MATH_MINUTE;
    throw new Error(
      "Cannot get current module time. Module index is Undefined."
    );
  };

  return { getCurrentSectionTitle, getCurrentModuleTime };
};
