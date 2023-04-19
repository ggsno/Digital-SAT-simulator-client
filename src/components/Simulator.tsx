import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { GraphingCalculator } from "desmos-react";
import Question from "./Simulator.Question";
import Footer from "./Simulator.Footer";
import Header from "./Simulator.Header";
import {
  isCalulatorOpenedState,
  questionIndexState,
  moduleState,
  answerState,
} from "./Simulator.atoms";
import Review from "./Simulator.Review";
import { userState } from "../atoms/user";

export default function Simulator() {
  const isCalculatorOpen = useRecoilValue(isCalulatorOpenedState);
  const module = useRecoilValue(moduleState);
  const setAnswer = useSetRecoilState(answerState);
  if (!module) throw new Error("no module state");
  const totalQuestionCount = module.questions.length;
  const { title, questions } = module;
  const questionIndex = useRecoilValue(questionIndexState);

  const user = useRecoilValue(userState);
  if (!user) throw new Error("no user state");
  const userName = user.name;

  useEffect(() => {
    setAnswer(Array(questions.length).fill(null));
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
      <Header title={title} />
      <hr className="border-dashed border-t-2 border-gray mb-2" />
      {questionIndex < questions.length ? (
        <Question
          passage={questions[questionIndex].passage}
          question={questions[questionIndex].question}
          choices={questions[questionIndex].choices}
        />
      ) : (
        <Review />
      )}
      <Footer userName={userName} totalQuestionCount={totalQuestionCount} />
    </>
  );
}
