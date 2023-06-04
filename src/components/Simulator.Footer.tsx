import { useState, useRef } from "react";
import Popup from "./Simulator.Footer.Popup";
import { useIndexControl } from "./Simulator.hooks";

export default function Footer(props: {
  userName: string;
  totalQuestionCount: number;
}) {
  const { userName, totalQuestionCount } = props;
  const { index, goNextQuestion, goPrevQuestion } = useIndexControl();
  const popupButtonRef = useRef(null);
  const popupState = useState(false);
  const [isPopupOpened, setIsPopupOpened] = popupState;

  return (
    <>
      {isPopupOpened && (
        <Popup popupState={popupState} popupButtonRef={popupButtonRef} />
      )}
      <footer
        className="fixed bottom-0 left-0 w-full grid grid-cols-3 py-4 px-8
       bg-white border-dashed border-t-2 border-gray mt-2"
      >
        <div className="self-center text-xl">{userName}</div>
        {index.question < totalQuestionCount ? (
          <button
            type="button"
            ref={popupButtonRef}
            onClick={() => {
              setIsPopupOpened(!isPopupOpened);
            }}
            className="justify-self-center self-center flex bg-black text-white py-1 pl-4 rounded-md font-bold"
          >
            Question {index.question + 1} of {totalQuestionCount}
            <img
              src={`/image/arrow${isPopupOpened ? "Down" : "Up"}.png`}
              alt="arrow up"
              className=" w-3 h-full my-auto mx-2"
            />
          </button>
        ) : (
          <div></div>
        )}
        <div className="justify-self-end self-center font-bold">
          {index.question > 0 && (
            <button
              type="button"
              onClick={goPrevQuestion}
              className="bg-blue text-white rounded-full py-2 px-6 mr-3"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={goNextQuestion}
            className="bg-blue text-white rounded-full py-2 px-6"
          >
            Next
          </button>
        </div>
      </footer>
    </>
  );
}
