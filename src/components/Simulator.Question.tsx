import { useRecoilState, useRecoilValue } from "recoil";
import {
  isMarkedReviewSelector,
  markReviewListState,
  optionEliminatorState,
} from "./Simulator.atoms";

type Props = {
  id: string;
  passage: string;
  question: string;
  choices: string[];
};

export default function Question(props: Props) {
  const { id, passage, question, choices } = props;

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
            <div className="flex justify-between bg-gray-light pb-0.5 h-8">
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
            <hr className="border-t-2 border-dashed border-gray mb-2" />

            <fieldset className="font-question">
              <legend dangerouslySetInnerHTML={{ __html: question }} />
              {choices.map((choice, index) => (
                <li key={`choice${index}`} className="list-none">
                  <input
                    type="radio"
                    name="choice"
                    id={`choice${index}`}
                    className={`peer sr-only`}
                  />
                  <label
                    className={`flex px-2 mt-4 h-[2.75rem] items-center hover:cursor-pointer rounded-md border \
                    border-black peer-checked:border-blue peer-checked:border-2 \
                      peer-checked:[&>div]:bg-blue peer-checked:[&>div]:text-white`}
                    htmlFor={`choice${index}`}
                  >
                    <div
                      className={`font-main mr-4 border-2 border-gray-dark rounded-full \
                    w-6 h-6 text-center leading-6`}
                    >
                      {["A", "B", "C", "D"][index]}
                    </div>
                    {choice}
                  </label>
                </li>
              ))}
            </fieldset>
          </div>
        </div>
      </div>
    </>
  );
}
