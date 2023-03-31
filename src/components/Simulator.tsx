import { useState } from "react";
import { GraphingCalculator } from "desmos-react";

export default function Simulator() {
  const [isMarkWrong, setIsMarkWrong] = useState(false);
  const [isMarkReview, setIsMarkReview] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const title = "Section 1, Module 1: Reading and Writing";
  const passage = `In recommending Bao Phi's collection <i>Song I Sing</i> , a librarian
  noted that <ins>pieces by the spoken-word poet</ins> don't lose their
  ____ nature when printed: the language has the <b>same pleasant</b> 
  musical qualiry on the page as it does when performed by Phi.`;
  const question = `Which choice <b>completes</b> the text with the most logical and precise
  word or phrase?`;

  const handleCalculatorClick = () => {
    setIsCalculatorOpen(!isCalculatorOpen);
  };

  const handleMarkWrongClick = () => {
    setIsMarkWrong(!isMarkWrong);
  };

  const handleMarkReviewClick = () => {
    setIsMarkReview(!isMarkReview);
  };

  return (
    <>
      <GraphingCalculator
        attributes={{
          className: `calculator fixed top-20 left-0 h-[90vh] w-full ${
            isCalculatorOpen ? "block" : "hidden"
          }
      `,
        }}
      />
      <header className="grid grid-cols-5 w-100vw px-10 py-5 border-dashed border-b-2 border-gray mb-2">
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
      <div className="grid grid-cols-2 h-[80vh]">
        <p
          className="font-question p-9 max-w-2xl justify-self-center overflow-auto"
          dangerouslySetInnerHTML={{ __html: passage }}
        />
        <div className="border-l-4 border-gray p-9 w-full overflow-auto">
          <div className="my-0 mx-auto max-w-2xl">
            <div className="flex justify-between bg-gray-light pb-0.5 border-b-2 border-dashed border-gray h-8 mb-2">
              <div className="flex">
                <div className="bg-black text-white w-7 flex justify-center items-center text-xl">
                  1
                </div>
                <button
                  type="button"
                  onClick={handleMarkReviewClick}
                  className={`${
                    isMarkReview
                      ? "bg-markReviewClicked font-bold"
                      : "bg-markReview"
                  } bg-contain bg-no-repeat w-40 ml-4 my-1 `}
                >
                  Mark for Review
                </button>
              </div>
              <button
                type="button"
                onClick={handleMarkWrongClick}
                className={`${
                  isMarkWrong ? "bg-markWrongClicked" : "bg-markWrong"
                } bg-contain w-7 h-7 bg-no-repeat text-transparent mr-2`}
              >
                mark wrong
              </button>
            </div>
            <div
              className="font-question"
              dangerouslySetInnerHTML={{ __html: question }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
