import { useState } from "react";
import { GraphingCalculator } from "desmos-react";
import Question from "./Question";

export default function Simulator() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

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
  };

  const {
    title,
    questionIndex,
    totalQuestionCount,
    passage,
    question,
    userName,
  } = TEMP;

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
          type="button"
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
      <hr className="border-dashed border-t-2 border-gray mt-2" />
      <footer className="fixed bottom-0 left-0 w-full grid grid-cols-3 py-5 px-8">
        <div className="self-center text-xl">{userName}</div>
        <button
          type="button"
          className="justify-self-center self-center flex bg-black text-white py-1 pl-4 rounded-md"
        >
          Question {questionIndex} of {totalQuestionCount}
          <img
            src="/image/arrowUp.png"
            alt="arrow up"
            className=" w-3 h-full my-auto mx-2"
          />
        </button>
        <div className="justify-self-end self-center">
          <button
            type="button"
            className="bg-blue text-white rounded-full py-2 px-6 mr-3"
          >
            Back
          </button>
          <button
            type="button"
            className="bg-blue text-white rounded-full py-2 px-6"
          >
            Next
          </button>
        </div>
      </footer>
    </>
  );
}
