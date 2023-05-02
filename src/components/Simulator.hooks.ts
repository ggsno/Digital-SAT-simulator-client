import { useRecoilState, useRecoilValue } from "recoil";
import {
  answerAccumulatorState,
  answerState,
  moduleIndexState,
  moduleState,
  questionIndexState,
  sectionIndexState,
} from "./Simulator.atoms";
import { examState } from "../atoms/exam";
import { fetchPostExamResults } from "../service/exam";
import { Urls } from "../pages/router";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const useGoNextQuestion = () => {
  const module = useRecoilValue(moduleState);
  if (!module) throw new Error("no module state");
  const exam = useRecoilValue(examState);
  if (!exam) throw new Error("no exam state");
  const [sectionIndex, setSectionIndex] = useRecoilState(sectionIndexState);
  const [moduleIndex, setModuleIndex] = useRecoilState(moduleIndexState);
  const [questionIndex, setQuestionIndex] = useRecoilState(questionIndexState);
  const answer = useRecoilValue(answerState);
  const [answerAccumulator, setAnswerAcculmulator] = useRecoilState(
    answerAccumulatorState
  );
  const navigator = useNavigate();

  const goNextQuestion = async ({ isTimeout }: { isTimeout: boolean }) => {
    const questionLength = module.questions.length;
    const moduleLength = exam.sections[sectionIndex].modules.length;
    const sectionLength = exam.sections.length;

    const accumulateAnswer = () => {
      setAnswerAcculmulator([...answerAccumulator, ...answer]);
      if (isTimeout) toast.success("시간 초과로 자동 제출되었습니다.");
      else toast.success("제출되었습니다.");
    };

    if (questionIndex < questionLength && !isTimeout) {
      setQuestionIndex(questionIndex + 1);
    } else if (moduleIndex + 1 < moduleLength) {
      accumulateAnswer();
      setQuestionIndex(0);
      setModuleIndex(moduleIndex + 1);
    } else if (sectionIndex + 1 < sectionLength) {
      accumulateAnswer();
      setQuestionIndex(0);
      setModuleIndex(-1);
      setSectionIndex(sectionIndex + 1);
    } else {
      setQuestionIndex(0);
      setModuleIndex(0);
      setSectionIndex(0);
      await fetchPostExamResults({
        answers: [...answerAccumulator, ...answer],
      });

      navigator(Urls.home);
    }
  };

  return { goNextQuestion };
};
