import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { GraphingCalculator } from "desmos-react";
import Question from "./Simulator.Question";
import Footer from "./Simulator.Footer";
import Header from "./Simulator.Header";
import {
  isCalulatorOpenedState,
  questionIndexState,
  moduleState,
  answerState,
  timerState,
} from "./Simulator.atoms";
import Review from "./Simulator.Review";
import { userState } from "../atoms/user";

export default function Simulator() {
  const questionIndex = useRecoilValue(questionIndexState);
  const isCalculatorOpen = useRecoilValue(isCalulatorOpenedState);
  const [answers, setAnswers] = useRecoilState(answerState);
  const module = useRecoilValue(moduleState);
  if (!module) throw new Error("no module state");
  const user = useRecoilValue(userState);
  if (!user) throw new Error("no user state");
  const setTimer = useSetRecoilState(timerState);
  setTimer(Date.now());

  useEffect(() => {
    if (!answers) {
      setAnswers(Array(module.questions.length).fill(null));
    }
  }, [module]);

  return (
    <>
      <GraphingCalculator
        attributes={{
          className: `calculator fixed top-20 left-0 h-[80vh] w-full ${
            isCalculatorOpen ? "block" : "hidden"
          }
      `,
        }}
      />
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
        userName={user.name}
        totalQuestionCount={module.questions.length}
      />
    </>
  );
}
