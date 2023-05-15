import { useRecoilValue } from "recoil";
import { forReviewState } from "./Simulator.atoms";
import { useIndexControl } from "./Simulator.hooks";

export default function Navigator({
  navigateCallback,
}: {
  navigateCallback?: VoidFunction;
}) {
  const forReview = useRecoilValue(forReviewState);
  if (!forReview) throw new Error("no state : navigator");

  const { index, getQuestionsLength, navigateQuestion, isAnswered } =
    useIndexControl();

  const navNumbers = Array(getQuestionsLength())
    .fill(0)
    .map((_, i) => i + 1);

  const isForReview = (index: number) => {
    return forReview.indexList.includes(index);
  };

  return (
    <>
      <div className="flex py-6 flex-wrap">
        {navNumbers.map((number, navIndex) => (
          <>
            <button
              type="button"
              onClick={() => {
                navigateQuestion(navIndex);
                navigateCallback && navigateCallback();
              }}
              key={`navitem${navIndex}`}
              className={`relative font-bold text-xl w-7 h-7 mr-4 mb-6 ${
                isForReview(navIndex)
                  ? "after:content-[''] after:bg-black"
                  : null
              } ${
                isAnswered(navIndex)
                  ? "bg-blue text-white"
                  : "text-blue border border-dashed border-black"
              }`}
            >
              {number}
              {isForReview(navIndex) && (
                <img
                  src="image/review_icon_bgwhite.png"
                  alt="review"
                  className="absolute w-4 h-4 right-[-0.5rem] top-[-0.5rem]"
                />
              )}
              {index.question === navIndex && (
                <img
                  src="image/current.png"
                  alt="review"
                  className="absolute w-4 h-4 left-1/2 translate-x-[-50%] top-[-1rem]"
                />
              )}
            </button>
          </>
        ))}
      </div>
    </>
  );
}
