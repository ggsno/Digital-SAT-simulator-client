import { useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilState } from "recoil";
import { questionIndexState } from "./Simulator.atoms";

type Props = {
  userName: string;
  totalQuestionCount: number;
};

export default function Footer(props: Props) {
  const { userName, totalQuestionCount } = props;
  const [isNavigatorOpened, setIsNavigatorOpened] = useState(false);
  const [questionIndex, setQuestionIndex] = useRecoilState(questionIndexState);

  return (
    <>
      {isNavigatorOpened &&
        createPortal(
          <div className=" absolute bottom-20 left-[calc(50%_-_2rem)] bg-white w-20 border">
            TEMP
            <button
              onClick={() => {
                setIsNavigatorOpened(false);
              }}
            >
              close
            </button>
          </div>,
          document.body
        )}
      <footer className="fixed bottom-0 left-0 w-full grid grid-cols-3 py-5 px-8">
        <div className="self-center text-xl">{userName}</div>
        <button
          type="button"
          onClick={() => {
            setIsNavigatorOpened(!isNavigatorOpened);
          }}
          className="justify-self-center self-center flex bg-black text-white py-1 pl-4 rounded-md"
        >
          Question {questionIndex + 1} of {totalQuestionCount}
          <img
            src="/image/arrowUp.png"
            alt="arrow up"
            className=" w-3 h-full my-auto mx-2"
          />
        </button>
        <div className="justify-self-end self-center">
          {questionIndex > 0 && (
            <button
              type="button"
              onClick={() => {
                setQuestionIndex(questionIndex - 1);
              }}
              className="bg-blue text-white rounded-full py-2 px-6 mr-3"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              if (questionIndex + 1 >= totalQuestionCount) {
                // 결과 페이지
              } else setQuestionIndex(questionIndex + 1);
            }}
            className="bg-blue text-white rounded-full py-2 px-6"
          >
            Next
          </button>
        </div>
      </footer>
    </>
  );
}
