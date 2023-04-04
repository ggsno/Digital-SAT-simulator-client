import { GraphingCalculator } from "desmos-react";
import Question from "./Simulator.Question";
import Footer from "./Simulator.Footer";
import Header from "./Simulator.Header";
import { useRecoilValue } from "recoil";
import { isCalulatorOpenedState } from "./Simulator.atoms";

export default function Simulator() {
  const isCalculatorOpen = useRecoilValue(isCalulatorOpenedState);

  const TEMP = {
    title: "Section 1, Module 1: Reading and Writing",
    questionIndex: "1",
    totalQuestionCount: 8,
    passage: `In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.`,
    question: `Which choice <b>completes</b> the text with the most logical and precise
    word or phrase?`,
    userName: "Gangsan O",
    choices: ["scholary", "melodic", "jarring", "personal"],
  };

  const {
    title,
    questionIndex,
    totalQuestionCount,
    passage,
    question,
    userName,
    choices,
  } = TEMP;

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
        id={questionIndex}
        passage={passage}
        question={question}
        choices={choices}
      />
      <hr className="border-dashed border-t-2 border-gray mt-2" />
      <Footer
        userName={userName}
        questionIndex={questionIndex}
        totalQuestionCount={totalQuestionCount}
      />
    </>
  );
}
