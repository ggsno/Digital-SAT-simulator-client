import { useRecoilState, useRecoilValue } from "recoil";
import {
  isMarkedReviewSelector,
  markReviewListState,
  optionEliminatorState,
} from "./Simulator.atoms";

type Props = {
  id: string;
};

export default function Toolbox(props: Props) {
  const { id } = props;

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
      <div className="flex justify-between bg-gray-light pb-0.5 h-8">
        <div className="flex">
          <div className="bg-black text-white w-7 flex justify-center items-center text-xl">
            {id}
          </div>
          <button
            type="button"
            onClick={handleMarkReviewClick}
            className={`${
              isMarkReview ? "bg-markReviewClicked font-bold" : "bg-markReview"
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
    </>
  );
}
