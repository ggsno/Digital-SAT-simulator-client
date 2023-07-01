import { useEffect, useState } from "react";
import { ReviewProps } from "../pages/review";
import ReviewTablePopup from "./ReviewTable.Popup";
import { SECTION_TITLES } from "../utils/constants";

type SortType = "Question" | "Section" | "Correct Answer" | "Your Answer";

export default function ReviewTable({ reviews }: { reviews: ReviewProps[] }) {
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [isOpenReview, setIsOpenReview] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [sectionFilter, setSectionFilter] = useState<
    "ALL" | (typeof SECTION_TITLES)[number]
  >("ALL");
  const [sortType, setSortType] = useState<SortType>("Question");
  const [isSortAscending, setIsSortAscending] = useState(true);

  const getSortImage = (current: SortType) => {
    return sortType !== current
      ? "/image/arrow-updown.png"
      : isSortAscending
      ? "/image/arrow-up-blue.png"
      : "/image/arrow-down-blue.png";
  };

  const openReview = (index: number) => {
    setReviewIndex(index);
    setIsOpenReview(true);
  };

  useEffect(() => {
    if (sectionFilter === "ALL") setFilteredReviews(reviews);
    else
      setFilteredReviews(
        reviews.filter(
          ({ section }) => section.toLowerCase() === sectionFilter.toLowerCase()
        )
      );
  }, [sectionFilter]);

  useEffect(() => {
    if (sortType === "Question") {
      if (isSortAscending) {
        setFilteredReviews(
          filteredReviews.sort((a, b) => a.number - b.number).slice()
        );
      } else {
        setFilteredReviews(
          filteredReviews.sort((a, b) => b.number - a.number).slice()
        );
      }
    } else if (sortType === "Section") {
      if (isSortAscending) {
        setFilteredReviews(
          filteredReviews
            .sort((a, b) => (a.section < b.section ? 1 : -1))
            .slice()
        );
      } else {
        setFilteredReviews(
          filteredReviews
            .sort((a, b) => (a.section > b.section ? 1 : -1))
            .slice()
        );
      }
    } else if (sortType === "Correct Answer") {
      if (isSortAscending) {
        setFilteredReviews(
          filteredReviews
            .sort((a, b) => (a.correctAnswer < b.correctAnswer ? 1 : -1))
            .slice()
        );
      } else {
        setFilteredReviews(
          filteredReviews
            .sort((a, b) => (a.correctAnswer > b.correctAnswer ? 1 : -1))
            .slice()
        );
      }
    } else if (sortType === "Your Answer") {
      if (isSortAscending) {
        setFilteredReviews(
          filteredReviews
            .sort((a, b) =>
              a.yourAnswer === a.correctAnswer &&
              b.yourAnswer === b.correctAnswer &&
              a.number < b.number
                ? -1
                : a.yourAnswer === a.correctAnswer &&
                  b.yourAnswer === b.correctAnswer &&
                  a.number > b.number
                ? 1
                : a.yourAnswer === a.correctAnswer &&
                  b.yourAnswer !== b.correctAnswer
                ? -1
                : 1
            )
            .slice()
        );
      } else {
        setFilteredReviews(
          filteredReviews
            .sort((a, b) =>
              a.yourAnswer !== a.correctAnswer &&
              b.yourAnswer !== b.correctAnswer &&
              a.number < b.number
                ? -1
                : a.yourAnswer !== a.correctAnswer &&
                  b.yourAnswer !== b.correctAnswer &&
                  a.number > b.number
                ? 1
                : a.yourAnswer !== a.correctAnswer &&
                  b.yourAnswer === b.correctAnswer
                ? -1
                : 1
            )
            .slice()
        );
      }
    }
  }, [sortType, isSortAscending]);

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
      <div className="w-full max-w-7xl flex font-bold text-lg text-blue">
        <button
          onClick={() => setSectionFilter("ALL")}
          className={`h-16 leading-[5rem] transition-colors basis-1/3 border-black hover:bg-gray-light hover:border-b-2 ${
            sectionFilter === "ALL" ? "border-b-2 " : null
          }`}
        >
          All Questions
        </button>
        <button
          onClick={() => setSectionFilter(SECTION_TITLES[0])}
          className={`h-16 leading-[5rem] transition-colors basis-1/3 border-black hover:bg-gray-light hover:border-b-2 ${
            sectionFilter === SECTION_TITLES[0] ? "border-b-2 " : null
          }`}
        >
          {SECTION_TITLES[0]}
        </button>
        <button
          onClick={() => setSectionFilter(SECTION_TITLES[1])}
          className={`h-16 leading-[5rem] transition-colors basis-1/3 border-black hover:bg-gray-light hover:border-b-2 ${
            sectionFilter === SECTION_TITLES[1] ? "border-b-2 " : null
          }`}
        >
          {SECTION_TITLES[1]}
        </button>
      </div>
      <div className="w-full max-w-7xl my-7">
        <h2 className="mb-5">Questions Overview</h2>
        <div className="flex text-gray-dark bg-[#e3f3fa] p-5">
          <div className="basis-1/3 text-center border-r">
            <div className="font-bold text-4xl">{filteredReviews.length}</div>
            Total Questions
          </div>
          <div className="basis-1/3 text-center border-r">
            <div className="font-bold text-4xl">
              {
                filteredReviews.filter(
                  ({ correctAnswer, yourAnswer }) =>
                    correctAnswer === yourAnswer
                ).length
              }
            </div>
            Correct Answers
          </div>
          <div className="basis-1/3 text-center">
            <div className="font-bold text-4xl">
              {
                filteredReviews.filter(
                  ({ correctAnswer, yourAnswer }) =>
                    correctAnswer !== yourAnswer
                ).length
              }
            </div>
            Incorrect Answers
          </div>
        </div>
      </div>
      <table className="w-full max-w-7xl select-none ">
        <thead className="bg-gray-dark text-white h-10 [&_th]:border border-white">
          <tr>
            <th>Question</th>
            <th>Section</th>
            <th>Correct Answer</th>
            <th>Your Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center ">
          <tr className="[&_td]:h-8">
            <td
              onClick={() => {
                setSortType("Question");
                setIsSortAscending(!isSortAscending);
              }}
              className="border-l border-gray hover:cursor-pointer hover:bg-[#e6edf8]"
            >
              <img
                src={getSortImage("Question")}
                alt="arrow"
                className="h-8 w-8 my-0 mx-auto"
              />
            </td>
            <td
              onClick={() => {
                setSortType("Section");
                setIsSortAscending(!isSortAscending);
              }}
              className="hover:cursor-pointer hover:bg-[#e6edf8]"
            >
              <img
                src={getSortImage("Section")}
                alt="arrow"
                className="h-8 w-8 my-0 mx-auto"
              />
            </td>
            <td
              onClick={() => {
                setSortType("Correct Answer");
                setIsSortAscending(!isSortAscending);
              }}
              className="hover:cursor-pointer hover:bg-[#e6edf8]"
            >
              <img
                src={getSortImage("Correct Answer")}
                alt="arrow"
                className="h-8 w-8 my-0 mx-auto"
              />
            </td>
            <td
              onClick={() => {
                setSortType("Your Answer");
                setIsSortAscending(!isSortAscending);
              }}
              className="hover:cursor-pointer hover:bg-[#e6edf8]"
            >
              <img
                src={getSortImage("Your Answer")}
                alt="arrow"
                className="h-8 w-8 my-0 mx-auto"
              />
            </td>
            <td className="border-r border-gray "></td>
          </tr>
          {filteredReviews.map(
            ({ number, section, correctAnswer, yourAnswer }, index) => (
              <tr
                key={"review table row" + number}
                className="[&_td]:border [&_td]:border-gray [&_td]:h-16"
              >
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
                  {"; "}
                  {yourAnswer === "" && correctAnswer !== ""
                    ? "Omitted"
                    : yourAnswer === correctAnswer
                    ? "Correct"
                    : "Incorrect"}
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
