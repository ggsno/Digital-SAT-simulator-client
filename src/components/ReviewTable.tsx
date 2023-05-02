import { useState } from "react";
import { ReviewProps } from "../pages/review";
import ReviewTablePopup from "./ReviewTable.Popup";

export default function ReviewTable({ reviews }: { reviews: ReviewProps[] }) {
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [isOpenReview, setIsOpenReview] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  const openReview = (index: number) => {
    setReviewIndex(index);
    setIsOpenReview(true);
  };

  return (
    <>
      {!isOpenReview ? null : (
        <ReviewTablePopup
          filteredReviews={filteredReviews}
          reviewIndex={reviewIndex}
          setReviewIndex={setReviewIndex}
          setIsOpenReview={setIsOpenReview}
        />
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
                    onClick={() => openReview(index)}
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
