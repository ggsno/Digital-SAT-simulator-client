import { useState } from "react";
import { GraphingCalculator } from "desmos-react";
import AnnotateCommentPopup from "./Simulator.AnnotateCommentPopup";
import { useAnnotateToolbox } from "./Simulator.Annotate.hooks";

export default function Toolbox() {
  const { annotate, annotateButtonRef, isDescendantOfSelection } =
    useAnnotateToolbox();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const onClickCalculator = () => {
    setIsCalculatorOpen(!isCalculatorOpen);
  };

  return (
    <>
      <div
        className={`col-span-2 self-center justify-self-end [&>button]:mr-4`}
      >
        <button
          type="button"
          ref={annotateButtonRef}
          onTouchStart={(event) => {
            if (isDescendantOfSelection(event.target)) {
              event.preventDefault();
            }
          }}
          onMouseDown={(event) => {
            event.preventDefault();

            if (isDescendantOfSelection(event.target)) {
              document.getSelection()?.removeAllRanges();
            }
          }}
          className={`text-sm`}
        >
          <img
            src="/image/annotate.png"
            alt="annotate"
            className="my-0 mx-auto pb-1 h-5 w-4"
          />
          Annotate
        </button>
        <button
          type="button"
          onClick={onClickCalculator}
          className={`text-sm ${
            isCalculatorOpen ? "border-b-2" : "border-transparent"
          }`}
        >
          <img
            src="/image/calculator.png"
            alt="calculator"
            className="my-0 mx-auto pb-1 h-5 w-4"
          />
          Calculator
        </button>
      </div>
      {isCalculatorOpen && (
        <GraphingCalculator
          attributes={{
            className: `calculator fixed top-20 left-0 h-[80vh] w-full z-20 ${
              isCalculatorOpen ? "block" : "hidden"
            }
  `,
          }}
        />
      )}
      {annotate.current && <AnnotateCommentPopup />}
    </>
  );
}
