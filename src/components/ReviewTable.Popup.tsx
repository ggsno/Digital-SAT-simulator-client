import { useState } from "react";
import { ReviewProps } from "../pages/review";

export default function ReviewTablePopup({
  filteredReviews,
  reviewIndex,
  setReviewIndex,
  setIsOpenReview,
}: {
  filteredReviews: ReviewProps[];
  reviewIndex: number;
  setReviewIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsOpenReview: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isHideCorrectAnswer, setIsHideCorrectAnswer] = useState(false);

  const currentReview = filteredReviews[reviewIndex];
  const isCorrect = () => {
    return currentReview.yourAnswer === currentReview.correctAnswer;
  };

  const canGoNext = reviewIndex < filteredReviews.length - 1;
  const canGoPrev = reviewIndex > 0;
  const goNext = () => {
    if (canGoNext) setReviewIndex(reviewIndex + 1);
  };
  const goPrev = () => {
    if (canGoPrev) setReviewIndex(reviewIndex - 1);
  };
  return (
    <>
      <div
        onClick={() => {
          setIsOpenReview(false);
        }}
        className=" bg-[#00000099] fixed top-0 left-0 w-screen h-screen"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-white rounded-md m-8 p-8 w-[80w] h-[90vh] relative"
        >
          <div className="w-full flex justify-between mb-4">
            <h2>
              {currentReview.section}: Question {currentReview.number}
            </h2>
            <button onClick={() => setIsOpenReview(false)}>
              <img src="/image/exit.png" className="w-5 h-5" />
            </button>
          </div>
          <div className={`flex overflow-auto h-[65vh] gap-10`}>
            {currentReview.passage === null ? null : (
              <div
                dangerouslySetInnerHTML={{
                  __html: currentReview.passage!,
                }}
                className="basis-1/2"
              />
            )}
            <div className={`${currentReview.passage ? "basis-1/2" : null} `}>
              <div className="bg-[#656463] h-8 w-8 leading-9 text-center text-white ">
                {currentReview.number}
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: currentReview.question,
                }}
                className="mb-5 ml-9 mt-3"
              />
              <div className="ml-7">
                {currentReview.choiceA === null ? null : (
                  <div>
                    <div className="flex gap-1">
                      A.
                      <div
                        className="inline-block"
                        dangerouslySetInnerHTML={{
                          __html: currentReview.choiceA!,
                        }}
                      />
                    </div>
                    <div className="flex gap-1">
                      B.
                      <div
                        className="inline-block"
                        dangerouslySetInnerHTML={{
                          __html: currentReview.choiceB!,
                        }}
                      />
                    </div>
                    <div className="flex gap-1">
                      C.
                      <div
                        className="inline-block"
                        dangerouslySetInnerHTML={{
                          __html: currentReview.choiceC!,
                        }}
                      />
                    </div>
                    <div className="flex gap-1">
                      D.
                      <div
                        className="inline-block"
                        dangerouslySetInnerHTML={{
                          __html: currentReview.choiceD!,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              {isHideCorrectAnswer ? null : (
                <div
                  className={` text-white rounded-md inline-block
      ${isCorrect() ? "bg-green-700" : "bg-red-700"} py-3 px-2 mt-5`}
                >
                  {currentReview.yourAnswer === ""
                    ? "You omitted this qustion."
                    : isCorrect()
                    ? "You selected the correct answer."
                    : `You selected answer ${currentReview.yourAnswer}. `}
                  The correct answer is {currentReview.correctAnswer}.
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex justify-between bg-white pt-5">
            <div>
              <label className="flex items-center select-none hover:cursor-pointer">
                <input
                  type="checkbox"
                  checked={isHideCorrectAnswer}
                  onChange={() => setIsHideCorrectAnswer(!isHideCorrectAnswer)}
                  className="ml-2 w-5 h-5 accent-violet-blue"
                />
                <span className="ml-2 h-5">Hide correct answer</span>
              </label>
            </div>
            <div>
              <button
                onClick={goPrev}
                disabled={!canGoPrev}
                className={` bg-violet-blue text-white font-bold px-6 py-3 rounded-full ml-4 disabled:bg-gray-light disabled:text-gray`}
              >
                Previous
              </button>
              <button
                onClick={goNext}
                disabled={!canGoNext}
                className={` bg-violet-blue text-white font-bold px-6 py-3 rounded-full ml-4 disabled:bg-gray-light disabled:text-gray`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
