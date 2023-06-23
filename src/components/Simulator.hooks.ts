import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { fetchPostExamResults } from "../service/apis/exam";
import { Urls } from "../pages/Urls";
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
import {
  forReviewState,
  indexState,
  optionEliminatorState,
} from "./Simulator.atoms";
import { annotateState } from "./Simulator.Annotate.hooks";

type QuestionProps = {
  passage: string | null;
  question: string;
  choices: string[] | null;
};

export const moduleState = atom<QuestionProps[]>({
  key: "Module",
  default: [],
});

const answerState = atom<{ module: string[]; accumulator: string[] }>({
  key: "Answer",
  default: { module: [], accumulator: [] },
});

export const examTimeState = atom<{
  startTime: number;
  timeLimit: number;
}>({
  key: "ExamTime",
  default: { startTime: 0, timeLimit: 0 },
});

export const useIndexControl = () => {
  const [index, setIndex] = useRecoilState(indexState);
  const [answer, setAnswer] = useRecoilState(answerState);

  const accumulateAnswer = () => {
    setAnswer({
      module: [],
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
    toast.success("제한 시간이 초과되어 다음 모듈로 이동했습니다.");
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
  const { goNextModule, goNextSection } = useIndexControl();
  const [index, setIndex] = useRecoilState(indexState);
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
      exam_id: exam.id,
      answers: [...answer.accumulator, ...answer.module],
    });
    setLoading(false);
    toast.success("제출되었습니다");
    resetAnswer();
    resetIndex();
    navigator(Urls.home);
  };

  useEffect(() => {
    const sectionLength = exam.sections.length;
    if (index.section >= sectionLength) {
      postResult();
      return;
    }
    if (index.module === -1) return;
    const moduleLength = exam.sections[index.section].modules.length;
    if (index.module >= moduleLength) {
      goNextSection();
      return;
    }
    const questionLength =
      exam.sections[index.section].modules[index.module].questions.length;
    if (index.question > questionLength) {
      goNextModule();
    }
  }, [index]);

  useEffect(() => {
    const sectionLength = exam.sections.length;
    if (index.section >= sectionLength) {
      return;
    }
    const moduleLength = exam.sections[index.section].modules.length;

    if (0 <= index.module && index.module < moduleLength) {
      const newModule =
        exam.sections[index.section].modules[index.module].questions;
      setModule(newModule);
      resetReview();
      resetOptionEliminator();
      resetAnnoateList();
      setAnswer({ ...answer, module: Array(newModule.length).fill("") });
      setExamTime({
        startTime: Date.now(),
        timeLimit:
          (index.section === 0
            ? MODULE_TIME_READING_AND_WRITING_MINUTE
            : MODULE_TIME_MATH_MINUTE) *
          60 *
          1000,
      });
    }
    setLoading(false);
  }, [index.module]);

  return { module };
};

export const useTimer = () => {
  const { startTime, timeLimit } = useRecoilValue(examTimeState);
  const answer = useRecoilState(answerState);
  const { timeout } = useIndexControl();
  const [remainingSeconds, setRemainingSeconds] = useState(timeLimit);
  const [isTimeHidden, setIsTimeHidden] = useState(false);

  const toggleTimeHidden = () => {
    setIsTimeHidden(!isTimeHidden);
  };

  const getTime = () =>
    `${Math.floor(remainingSeconds / 60 >= 0 ? remainingSeconds / 60 : 0)
      .toString()
      .padStart(2, "0")}:${(remainingSeconds % 60)
      .toString()
      .padStart(2, "0")}`;

  useEffect(() => {
    const callback = () => {
      if (startTime !== 0) {
        const remainingTime = startTime + timeLimit - Date.now();
        if (remainingTime > 0) {
          setRemainingSeconds(Math.ceil(remainingTime / 1000));
        } else {
          clearInterval(timer);
          timeout();
        }
      }
    };
    const timer = setInterval(callback, 1000);
    return () => clearInterval(timer);
  }, [startTime, answer]);

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
