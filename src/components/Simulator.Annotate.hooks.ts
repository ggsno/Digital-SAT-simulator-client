import { atom, useRecoilState, useRecoilValue } from "recoil";
import { indexState } from "./Simulator.atoms";
import { useEffect, useRef } from "react";
import { moduleState } from "./Simulator.hooks";

type AnnotateProps = {
  id: string;
  selectedText: string;
  comment: string;
};

export const annotateState = atom<{
  list: AnnotateProps[];
  current: AnnotateProps | null;
  boundary: HTMLDivElement | null;
}>({
  key: "Annotate",
  default: {
    list: [],
    current: null,
    boundary: null,
  },
});

export const useAnnotateToolbox = () => {
  const [module, setModule] = useRecoilState(moduleState);
  const [annotate, setAnnotate] = useRecoilState(annotateState);
  const { question: questionIndex } = useRecoilValue(indexState);
  const annotateButtonRef = useRef<HTMLButtonElement | null>(null);

  const isDescendantOfSelection = (target: any) => {
    const range = document.getSelection()?.getRangeAt(0);
    const container = range?.commonAncestorContainer;
    return container?.contains(target);
  };

  useEffect(() => {
    const onClickAnnotate = () => {
      const NO_SELECT = "no select";
      try {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount <= 0 || selection.isCollapsed)
          throw NO_SELECT;
        const range = selection.getRangeAt(selection.rangeCount - 1);
        const container = range.commonAncestorContainer as HTMLElement;
        if (
          // !annotateButtonRef.current ||
          !annotate.boundary?.contains(container)
        )
          throw NO_SELECT;

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
        range.surroundContents(newSpan);

        const newAnnotate = {
          id: newId,
          selectedText: selection.toString(),
          comment: "",
        };
        setAnnotate({
          ...annotate,
          current: newAnnotate,
          list: [...annotate.list, newAnnotate],
        });

        // setModule([
        //   ...module,
        //   ...module.map((question, i) =>
        //     i !== questionIndex
        //       ? question
        //       : {
        //           ...question,
        //           passage: annotate.boundary!.innerHTML.replace(
        //             /^<div.*?>|<\/div>$/g,
        //             ""
        //           ),
        //         }
        //   ),
        // ]);
      } catch (err) {
        if (err === NO_SELECT) {
          alert("MAKE A SELECTION FIRST");
          return;
        }
        alert(err);
        throw err;
      }
    };
    if (annotateButtonRef.current && annotate.boundary)
      annotateButtonRef.current.addEventListener("click", onClickAnnotate);

    return () =>
      annotateButtonRef.current?.removeEventListener("click", onClickAnnotate);
  }, [annotateButtonRef, annotate.boundary]);
  return {
    annotate,
    annotateButtonRef,
    isDescendantOfSelection,
  };
};

export const useAnnotate = () => {
  const [module, setModule] = useRecoilState(moduleState);
  const [annotate, setAnnotate] = useRecoilState(annotateState);
  const { question: questionIndex } = useRecoilValue(indexState);

  const saveAnnotate = (newComment: string) => {
    setAnnotate({
      ...annotate,
      current: null,
      list: annotate.list.map((element) =>
        element.id !== annotate.current?.id
          ? element
          : {
              ...element,
              comment: newComment,
            }
      ),
    });
  };

  const deleteAnnotate = () => {
    const currentId = annotate.current?.id;
    if (!currentId) throw new Error("no current annotate id");
    setAnnotate({
      ...annotate,
      list: annotate.list.filter((e) => e.id !== currentId),
      current: null,
    });

    const reg = new RegExp(
      `<span\\s+id\\s*=\\s*["']\\s*${currentId}\\s*["']\\s+class\\s*=\\s*["'].*?\\bcustom_highlight\\b.*?["']\\s*>(.*?)<\/span>`
    );

    setModule(
      module.map((question, i) =>
        i !== questionIndex
          ? question
          : {
              ...question,
              passage: question.passage!.replace(reg, "$1"),
            }
      )
    );
  };

  const closeAnnotate = () => {
    setAnnotate({ ...annotate, current: null });
  };

  return {
    annotate,
    saveAnnotate,
    deleteAnnotate,
    closeAnnotate,
  };
};

export const useAnnotateBoundary = () => {
  const [annotate, setAnnotate] = useRecoilState(annotateState);
  const annotateBoundary = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAnnotate({ ...annotate, boundary: annotateBoundary.current });
  }, [annotateBoundary.current]);

  return { annotateBoundary };
};

export const useEffectAnnotateInit = () => {
  const { question: questionIndex } = useRecoilValue(indexState);
  const [annotate, setAnnotate] = useRecoilState(annotateState);

  useEffect(() => {
    const highlightElements = document.querySelectorAll(".custom_highlight");

    const annotateEventListenerRemovers = [...highlightElements].map(
      (element) => {
        const setCurrentAnnotate = () => {
          setAnnotate({
            ...annotate,
            current: {
              id: element.id,
              selectedText: element.textContent ?? "",
              comment: "",
            },
          });
        };
        element.addEventListener("click", setCurrentAnnotate);
        return () => element.removeEventListener("click", setCurrentAnnotate);
      }
    );

    return () => annotateEventListenerRemovers.forEach((remove) => remove());
  }, [annotate.list, questionIndex]);
};
