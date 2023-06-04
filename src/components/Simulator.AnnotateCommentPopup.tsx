import { useState, useEffect } from "react";
import { useAnnotate } from "./Simulator.hooks";

export default function AnnotateCommentPopup() {
  const { annotate, saveAnnotate, deleteAnnotate, closeAnnotate } =
    useAnnotate();

  const [newComment, setNewComment] = useState(annotate.current?.comment ?? "");

  useEffect(() => {
    setNewComment(
      annotate.list.find((e) => e.id === annotate.current?.id)?.comment ?? ""
    );
  }, [annotate.current?.selectedText]);

  return (
    <>
      <div className="absolute bottom-0 left-0 z-10 w-full bg-[#f6f6f6]">
        <div className="flex justify-center bg-[#231d24] text-white">
          <div className="max-w-[102rem] flex justify-between py-2 px-10 grow">
            <div>
              <span className="font-bold">View/Edit:</span>"
              {annotate.current?.selectedText}"
            </div>
            <button onClick={closeAnnotate} className="font-bold">
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
                onClick={() => saveAnnotate(newComment)}
                className="text-white bg-blue py-2 px-6 rounded-full mr-12"
              >
                Save
              </button>
              <button
                type="button"
                onClick={deleteAnnotate}
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
