import { useEffect } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import Question from "./Simulator.Question";
import Footer from "./Simulator.Footer";
import Header from "./Simulator.Header";
import {
  questionIndexState,
  moduleState,
  answerState,
  timerState,
  moduleIndexState,
  sectionIndexState,
  forReviewState,
  optionEliminatorState,
  annotateListState,
} from "./Simulator.atoms";
import Review from "./Simulator.Review";
import { userState } from "../atoms/user";
import { examState } from "../atoms/exam";

export default function Simulator() {
  const exam = useRecoilValue(examState);
  if (!exam) throw new Error("no exam state");
  const [module, setModule] = useRecoilState(moduleState);
  const setAnswers = useSetRecoilState(answerState);
  const questionIndex = useRecoilValue(questionIndexState);
  const moduleIndex = useRecoilValue(moduleIndexState);
  const sectionIndex = useRecoilValue(sectionIndexState);
  const user = useRecoilValue(userState);
  const setTimer = useSetRecoilState(timerState);

  const resetReview = useResetRecoilState(forReviewState);
  const resetOptionEliminator = useResetRecoilState(optionEliminatorState);
  const resetAnnoateList = useResetRecoilState(annotateListState);

  useEffect(() => {
    const newModule = exam.sections[sectionIndex].modules[moduleIndex];
    setModule(newModule);
    setAnswers(Array(newModule.questions.length).fill(""));
    resetReview();
    resetOptionEliminator();
    resetAnnoateList();
    setTimer(Date.now());
  }, [moduleIndex]);

  return (
    <>
      {!module ? (
        "loading ..."
      ) : (
        <>
          <Header
            title={`Section ${sectionIndex + 1}, Module ${moduleIndex + 1}: ${
              exam.sections[sectionIndex].title
            }`}
          />
          <hr className="border-dashed border-t-2 border-gray mb-2" />
          {questionIndex < module.questions.length ? (
            <Question
              passage={module.questions[questionIndex].passage}
              question={module.questions[questionIndex].question}
              choices={module.questions[questionIndex].choices}
            />
          ) : (
            <Review title={exam.sections[sectionIndex].title} />
          )}
          <Footer
            userName={user!.name}
            totalQuestionCount={module.questions.length}
          />{" "}
        </>
      )}
    </>
  );
}
