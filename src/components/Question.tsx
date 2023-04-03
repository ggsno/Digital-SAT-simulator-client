import { useRecoilState, useRecoilValue } from "recoil";
import {
  isMarkedReviewSelector,
  markReviewListState,
  optionEliminatorState,
} from "./Question.atoms";

export default function Question({
  id,
  passage,
  question,
}: {
  id: string;
  passage: string;
  question: string;
}) {
  const isMarkReview = useRecoilValue(isMarkedReviewSelector(id));
  const [markReviewList, setMarkReviewList] =
    useRecoilState(markReviewListState);
  const [optionEliminator, setOptionEliminator] = useRecoilState(
    optionEliminatorState
  );

  const handleMarkWrongClick = () => {
    setOptionEliminator({
      ...optionEliminator,
      isActive: !optionEliminator.isActive,
    });
  };

  const handleMarkReviewClick = () => {
    if (isMarkReview)
      setMarkReviewList({ ids: markReviewList.ids.filter((e) => e !== id) });
    else setMarkReviewList({ ids: [...markReviewList.ids, id] });
  };

  return (
    <>
      <div className={`grid grid-cols-2 h-[calc(100vh_-_173px)]`}>
        <p
          className="font-question p-9 max-w-2xl justify-self-center overflow-auto"
          dangerouslySetInnerHTML={{ __html: passage }}
        />
        <div className="border-l-4 border-gray p-9 w-full overflow-auto">
          <div className="my-0 mx-auto max-w-2xl">
            <div className="flex justify-between bg-gray-light pb-0.5 border-b-2 border-dashed border-gray h-8 mb-2">
              <div className="flex">
                <div className="bg-black text-white w-7 flex justify-center items-center text-xl">
                  {id}
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
                  optionEliminator.isActive
                    ? "bg-optionEliminatorClicked"
                    : "bg-optionEliminator"
                } bg-contain w-7 h-7 bg-no-repeat text-transparent mr-2`}
              >
                option eliminator
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
