import { useState } from "react";
import { ReviewProps } from "../pages/review";

export default function ReviewTable({ reviews }: { reviews: ReviewProps[] }) {
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [isOpenReview, setIsOpenReview] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  const isCorrect = () => {
    return (
      filteredReviews[reviewIndex].yourAnswer ===
      filteredReviews[reviewIndex].correctAnswer
    );
  };

  const handleReview = (index: number) => {
    setReviewIndex(index);
    setIsOpenReview(true);
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
      {!isOpenReview ? null : (
        <div
          onClick={() => {
            setIsOpenReview(false);
          }}
          className=" bg-[#00000099] absolute top-0 left-0 w-screen h-screen"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-white rounded-md m-8 p-8 w-[80w] h-[90vh]"
          >
            <button onClick={() => setIsOpenReview(false)}>X</button>
            {filteredReviews[reviewIndex].passage === null ? null : (
              <div
                dangerouslySetInnerHTML={{
                  __html: filteredReviews[reviewIndex].passage!,
                }}
              />
            )}
            <div
              dangerouslySetInnerHTML={{
                __html: filteredReviews[reviewIndex].question,
              }}
            />
            {filteredReviews[reviewIndex].choiceA === null ? null : (
              <div>
                <div>
                  A.
                  <div
                    className="inline-block"
                    dangerouslySetInnerHTML={{
                      __html: filteredReviews[reviewIndex].choiceA!,
                    }}
                  />
                </div>
                <div>
                  B.
                  <div
                    className="inline-block"
                    dangerouslySetInnerHTML={{
                      __html: filteredReviews[reviewIndex].choiceB!,
                    }}
                  />
                </div>
                <div>
                  C.
                  <div
                    className="inline-block"
                    dangerouslySetInnerHTML={{
                      __html: filteredReviews[reviewIndex].choiceC!,
                    }}
                  />
                </div>
                <div>
                  D.
                  <div
                    className="inline-block"
                    dangerouslySetInnerHTML={{
                      __html: filteredReviews[reviewIndex].choiceD!,
                    }}
                  />
                </div>
              </div>
            )}
            <div
              className={` text-white rounded-md inline-block
              ${isCorrect() ? "bg-green-700" : "bg-red-700"} py-3 px-2`}
            >
              {filteredReviews[reviewIndex].yourAnswer === ""
                ? "You omitted this qustion."
                : isCorrect()
                ? "You selected the correct answer."
                : `You selected answer ${filteredReviews[reviewIndex].yourAnswer}`}
              The correct answer is {filteredReviews[reviewIndex].correctAnswer}
            </div>
            <div>
              <button onClick={goPrev} disabled={!canGoPrev}>
                Previous
              </button>
              <button onClick={goNext} disabled={!canGoNext}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      <table className="w-full max-w-7xl">
        <thead className="bg-gray-dark text-white h-10 [&_th]:border border-white">
          <tr>
            <th>Question</th>
            <th>Section</th>
            <th>Correct Answer</th>
            <th>Your Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center [&_td]:border [&_td]:border-gray [&_td]:h-16">
          {filteredReviews.map(
            ({ number, section, correctAnswer, yourAnswer }, index) => (
              <tr key={"review table row" + number}>
                <td>{number}</td>
                <td>{section}</td>
                <td>{correctAnswer}</td>
                <td
                  className={`${
                    yourAnswer === correctAnswer
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {yourAnswer}
                  {yourAnswer === ""
                    ? "Omitted"
                    : yourAnswer === correctAnswer
                    ? "; Correct"
                    : "; Incorrect"}
                </td>
                <td>
                  <button
                    onClick={() => handleReview(index)}
                    className="border rounded-full py-3 px-5 font-bold text-sm"
                  >
                    Review
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
}
