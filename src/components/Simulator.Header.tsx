import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  annotateRefState,
  annotateListState,
  isCalulatorOpenedState,
  timerState,
  questionIndexState,
  annotateCurrentState,
} from "./Simulator.atoms";
import { useEffect, useRef, useState } from "react";
import { moduleState } from "./Simulator.atoms";
import AnnotateCommentPopup from "./Simulator.AnnotateCommentPopup";

const END_TIME_SECONDS = 50 * 60;

export default function Header({ title }: { title: string }) {
  const [isCalculatorOpen, setIsCalculatorOpen] = useRecoilState(
    isCalulatorOpenedState
  );
  const [annotateList, setAnnotateList] = useRecoilState(annotateListState);
  const annotateRef = useRecoilValue(annotateRefState);
  const [module, setModule] = useRecoilState(moduleState);
  const setAnnotateCurrent = useSetRecoilState(annotateCurrentState);
  const questionIndex = useRecoilValue(questionIndexState);
  if (!module) throw new Error("no module state");

  const selectionRef = useRef<Selection | null>(null);
  const [time, setTime] = useState(END_TIME_SECONDS);
  const [isCommentPopupOpened, setIsCommentPopupOpened] = useState(false);

  const startTime = useRecoilValue(timerState);

  const handleCalculatorClick = () => {
    setIsCalculatorOpen(!isCalculatorOpen);
  };

  const handleAnotateClick = () => {
    try {
      const selection = selectionRef.current;
      const range = selection?.getRangeAt(selection.rangeCount - 1);
      let container = range?.commonAncestorContainer as HTMLElement;
      if (
        !selection ||
        !container ||
        !range ||
        !annotateRef?.contains(container) ||
        selection.isCollapsed
      ) {
        alert("MAKE A SELECTION FIRST");
        // MAKE A SELECTION FIRST
        // Select some text, then press annotate.
        return;
      }
      const newId = Date.now().toString();
      const newSpan = document.createElement("span");
      newSpan.id = newId;
      newSpan.classList.add(
        "custom_highlight",
        "bg-yellow",
        "border-b",
        "border-dashed",
        "hover:bg-yellow-dark"
      );
      const newAnnotate = {
        id: newId,
        selectedText: selection.toString(),
        comment: "",
        ref: newSpan,
      };
      setAnnotateCurrent(newAnnotate);
      setAnnotateList([...annotateList, newAnnotate]);
      range.surroundContents(newSpan);

      setModule({
        ...module,
        questions: module.questions.map((question, i) =>
          i !== questionIndex
            ? question
            : {
                ...question,
                passage: annotateRef.innerHTML.replace(
                  /^<div.*?>|<\/div>$/g,
                  ""
                ),
              }
        ),
      });
      setIsCommentPopupOpened(true);
    } catch (err) {
      alert(err);
      throw err;
    }
  };

  useEffect(() => {
    const callback = () => {
      if (startTime) {
        setTime(
          Math.ceil((startTime + END_TIME_SECONDS * 1000 - Date.now()) / 1000)
        );
      }
      if (
        startTime !== null &&
        startTime + END_TIME_SECONDS * 1000 - Date.now() < 0
      ) {
        clearInterval(timer);
      }
    };
    const timer = setInterval(callback, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const highlightElements = document.querySelectorAll(".custom_highlight");
    highlightElements.forEach((element) =>
      element.addEventListener("click", () => {
        setAnnotateCurrent({
          id: element.id,
          selectedText: element.textContent ?? "",
          comment: "",
        });
        setIsCommentPopupOpened(true);
      })
    );
  }, [annotateList, questionIndex]);

  useEffect(() => {
    document.addEventListener("selectionchange", () => {
      const selectionNow = window.getSelection();
      if (
        selectionNow &&
        selectionNow.rangeCount > 0 &&
        !selectionNow.isCollapsed
      ) {
        selectionRef.current = selectionNow;
      }
    });
  }, []);

  function isDescendantOfSelection(target: any) {
    const range = document.getSelection()?.getRangeAt(0);
    const container = range?.commonAncestorContainer;
    return container?.contains(target);
  }
  return (
    <>
      {isCommentPopupOpened && (
        <AnnotateCommentPopup
          closePopup={() => {
            setIsCommentPopupOpened(false);
          }}
        />
      )}
      <header className="grid grid-cols-5 w-100vw px-10 py-5">
        <h1 className="col-span-2 text-xl truncate hover:text-clip font-medium">
          {title}
        </h1>
        <div className="text-2xl self-center justify-self-center">
          {Math.floor(time / 60 >= 0 ? time / 60 : 0)
            .toString()
            .padStart(2, "0")}
          :{(time % 60).toString().padStart(2, "0")}
        </div>
        <div
          className={`col-span-2 self-center justify-self-end [&>button]:mr-4`}
        >
          <button
            type="button"
            onClick={handleAnotateClick}
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
            onClick={handleCalculatorClick}
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
      </header>
    </>
  );
}
