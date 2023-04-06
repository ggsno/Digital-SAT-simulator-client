import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { GraphingCalculator } from "desmos-react";
import Question from "./Simulator.Question";
import Footer from "./Simulator.Footer";
import Header from "./Simulator.Header";
import {
  isCalulatorOpenedState,
  questionIndexState,
  examState,
  answerState,
} from "./Simulator.atoms";

export default function Simulator() {
  const isCalculatorOpen = useRecoilValue(isCalulatorOpenedState);
  const exam = useRecoilValue(examState);
  const setAnswer = useSetRecoilState(answerState);
  if (!exam) throw new Error("no exam state");
  const totalQuestionCount = exam?.module.length;
  const { title, module } = exam;
  const questionIndex = useRecoilValue(questionIndexState);

  const userName = "Gangsan O";

  useEffect(() => {
    setAnswer(Array(module.length).fill(null));
  }, [exam]);

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
      <Question
        passage={module[questionIndex].passage}
        question={module[questionIndex].question}
        choices={module[questionIndex].choices}
      />
      <hr className="border-dashed border-t-2 border-gray mt-2" />
      <Footer userName={userName} totalQuestionCount={totalQuestionCount} />
    </>
  );
}
