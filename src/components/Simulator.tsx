import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Question from "./Simulator.Question";
import Footer from "./Simulator.Footer";
import Header from "./Simulator.Header";
import {
  questionIndexState,
  moduleState,
  answerState,
  timerState,
} from "./Simulator.atoms";
import Review from "./Simulator.Review";
import { userState } from "../atoms/user";
import { examState } from "../atoms/exam";

export default function Simulator() {
  const questionIndex = useRecoilValue(questionIndexState);
  const exam = useRecoilValue(examState);
  if (!exam) throw new Error("no exam state");
  const [module, setModule] = useRecoilState(moduleState);
  const [answers, setAnswers] = useRecoilState(answerState);
  const user = useRecoilValue(userState);
  const setTimer = useSetRecoilState(timerState);
  setTimer(Date.now());

  useEffect(() => {
    const firstModule = exam.sections[0].modules[0];
    setModule(firstModule);
    setAnswers(Array(firstModule.questions.length).fill(null));
  }, []);

  return (
    <>
      {!module ? (
        "loading ..."
      ) : (
        <>
          <Header title={module.title} />
          <hr className="border-dashed border-t-2 border-gray mb-2" />
          {questionIndex < module.questions.length ? (
            <Question
              passage={module.questions[questionIndex].passage}
              question={module.questions[questionIndex].question}
              choices={module.questions[questionIndex].choices}
            />
          ) : (
            <Review />
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
