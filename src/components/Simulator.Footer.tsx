import { useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { moduleState, questionIndexState } from "./Simulator.atoms";
import Popup from "./Simulator.Footer.Popup";
import { useGoNextQuestion } from "./Simulator.hooks";

type Props = {
  userName: string;
  totalQuestionCount: number;
};

export default function Footer(props: Props) {
  const { userName, totalQuestionCount } = props;
  const popupState = useState(false);
  const [isPopupOpened, setIsPopupOpened] = popupState;
  const [questionIndex, setQuestionIndex] = useRecoilState(questionIndexState);
  const popupButtonRef = useRef(null);
  const module = useRecoilValue(moduleState);
  if (!module) throw new Error("no module state");
  const { goNextQuestion } = useGoNextQuestion();

  const handleGoPrev = () => {
    setQuestionIndex(questionIndex - 1);
  };

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
        {questionIndex < module.questions.length ? (
          <button
            type="button"
            ref={popupButtonRef}
            onClick={() => {
              setIsPopupOpened(!isPopupOpened);
            }}
            className="justify-self-center self-center flex bg-black text-white py-1 pl-4 rounded-md font-bold"
          >
            Question {questionIndex + 1} of {totalQuestionCount}
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
          {questionIndex > 0 && (
            <button
              type="button"
              onClick={handleGoPrev}
              className="bg-blue text-white rounded-full py-2 px-6 mr-3"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={() => goNextQuestion({ isTimeout: false })}
            className="bg-blue text-white rounded-full py-2 px-6"
          >
            Next
          </button>
        </div>
      </footer>
    </>
  );
}
