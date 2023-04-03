import { useState } from "react";
import { GraphingCalculator } from "desmos-react";
import Question from "./Question";

export default function Simulator() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const TEMP = {
    title: "Section 1, Module 1: Reading and Writing",
    questionIndex: "1",
    passage: `In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
    noted that <ins>pieces by the spoken-word poet</ins> don't lose their
    ____ nature when printed: the language has the <b>same pleasant</b> 
    musical qualiry on the page as it does when performed by Phi.`,
    question: `Which choice <b>completes</b> the text with the most logical and precise
    word or phrase?`,
  };

  const { title, questionIndex, passage, question } = TEMP;

  const handleCalculatorClick = () => {
    setIsCalculatorOpen(!isCalculatorOpen);
  };

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
      <header className="grid grid-cols-5 w-100vw px-10 py-5">
        <h1 className="col-span-2 text-xl truncate hover:text-clip">{title}</h1>
        <div className="text-2xl self-center justify-self-center">0:00</div>
        <button
          onClick={handleCalculatorClick}
          className={`col-span-2 self-center justify-self-end text-sm border-b-2 ${
            isCalculatorOpen ? "border-black" : "border-transparent"
          }`}
        >
          <img
            src="/image/calculator.png"
            alt="calculator icon"
            className="my-0 mx-auto pb-1.5"
          />
          Calculator
        </button>
      </header>
      <hr className="border-dashed border-t-2 border-gray mb-2" />
      <Question id={questionIndex} passage={passage} question={question} />
    </>
  );
}
