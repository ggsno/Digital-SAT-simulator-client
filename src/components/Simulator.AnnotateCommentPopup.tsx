import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  annotateCurrentState,
  annotateListState,
  examState,
  questionIndexState,
} from "./Simulator.atoms";

export default function AnnotateCommentPopup({
  closePopup,
}: {
  closePopup: VoidFunction;
}) {
  const [annotateCurrent, setAnnotateCurrent] =
    useRecoilState(annotateCurrentState);
  if (!annotateCurrent) throw new Error("no annotate current state");
  const [annotateList, setAnnotateList] = useRecoilState(annotateListState);
  const [exam, setExam] = useRecoilState(examState);
  const questionIndex = useRecoilValue(questionIndexState);
  if (!exam) throw new Error("no exam state");
  const { id, selectedText, comment } = annotateCurrent;
  const [newComment, setNewComment] = useState(comment);

  const handleSave = () => {
    setAnnotateCurrent(null);
    setAnnotateList(
      annotateList.map((annotate) =>
        annotate.id !== annotateCurrent.id
          ? annotate
          : {
              ...annotate,
              comment: newComment,
            }
      )
    );
    closePopup();
  };

  const handleDelete = () => {
    setAnnotateCurrent(null);
    setAnnotateList(annotateList.filter((annotate) => annotate.id !== id));

    const reg = new RegExp(
      `<span\\s+id\\s*=\\s*["']\\s*${id}\\s*["']\\s+class\\s*=\\s*["'].*?\\bcustom_highlight\\b.*?["']\\s*>(.*?)<\/span>`
    );

    setExam({
      ...exam,
      modules: exam.modules.map((module, i) =>
        i !== questionIndex
          ? module
          : {
              ...module,
              passage: module.passage?.replace(reg, "$1"),
            }
      ),
    });

    closePopup();
  };

  useEffect(() => {
    setNewComment(annotateList.find((e) => e.id === id)?.comment ?? "");
  }, [selectedText]);

  return (
    <>
      <div className="absolute bottom-0 left-0 z-10 w-full bg-[#f6f6f6]">
        <div className="flex justify-center bg-[#231d24] text-white">
          <div className="max-w-[102rem] flex justify-between py-2 px-10 grow">
            <div>
              <span className="font-bold">View/Edit:</span>"{selectedText}"
            </div>
            <button onClick={closePopup} className="font-bold">
              CLOSE{" "}
              <img src="image/exit-white.png" className="inline-block w-5" />
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="max-w-[102rem] py-5 px-10 font-bold grow ">
            <div className="flex">
              <div className="mr-2">Highlight Color:</div>
              <div className="border-2 rounded-full bg-yellow inline-block w-6 h-6 mr-8" />
              <div className="mr-2">Underline style: </div>
              <div className="border-2 bg-white inline-block w-6 h-6 mr-8 underline decoration-dotted text-center underline-offset-2">
                U
              </div>
            </div>
            <textarea
              onChange={(e) => setNewComment(e.currentTarget.value)}
              value={newComment}
              className="border w-full max-w-3xl h-32 mt-2 resize-none p-3"
            />
            <div className="flex">
              <button
                type="button"
                onClick={handleSave}
                className="text-white bg-blue py-2 px-6 rounded-full mr-12"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className=" text-red-700 hover:underline"
              >
                <img src="image/delete.png" className="inline-block w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
