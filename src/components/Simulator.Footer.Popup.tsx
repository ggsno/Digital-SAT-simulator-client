import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { examState, questionIndexState } from "./Simulator.atoms";
import Navigator from "./Simulator.Navigator";

export default function Popup({
  popupState,
  popupButtonRef,
}: {
  popupState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  popupButtonRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const [isPopupOpened, setIsPopupOpened] = popupState;
  const setQuestionIndex = useSetRecoilState(questionIndexState);
  const exam = useRecoilValue(examState);
  if (!exam) throw new Error("no exam value at Footer component");
  const { title } = exam;
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      if (
        isPopupOpened &&
        !popupRef.current?.contains(e.target) &&
        !popupButtonRef.current?.contains(e.target)
      ) {
        setIsPopupOpened(false);
      }
    };
    document.addEventListener("click", handleOutsideClose, { capture: true });
    return () =>
      document.removeEventListener("click", handleOutsideClose, {
        capture: true,
      });
  }, []);

  return (
    <>
      {createPortal(
        <div
          ref={popupRef}
          className="absolute bottom-20 left-1/2 translate-x-[-50%] bg-white shadow-[0_0_5px_1px_rgba(0,0,0,0.2)] rounded p-5 md:w-[496px] sm:w-[360px]"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-xl grow text-center">
              {title} Questions
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsPopupOpened(false);
              }}
              className="bg-cover w-4 h-4 shrink-0"
              style={{ backgroundImage: "url(image/exit.png)" }}
            />
          </div>
          <hr className="border-gray" />
          <div className="flex justify-center items-center py-2">
            <img
              src="image/current.png"
              alt="current"
              className="w-4 h-4 mr-1"
            />
            <div className="mr-4">Current</div>
            <img
              src="image/unanswered.png"
              alt="unanswered"
              className="w-4 h-4 mr-2"
            />
            <div className="mr-4">Unanswered</div>
            <img
              src="image/review_icon.png"
              alt="for review"
              className="w-4 h-4 mr-1"
            />
            <div>For Review</div>
          </div>
          <hr className="border-gray" />
          <Navigator navigateCallback={() => setIsPopupOpened(false)} />
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => {
                setIsPopupOpened(false);
                setQuestionIndex(exam.module.length);
              }}
              className="text-blue font-bold text-sm border border-blue rounded-full px-4 py-1"
            >
              Go to Review Page
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
