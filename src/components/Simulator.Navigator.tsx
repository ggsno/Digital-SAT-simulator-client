import { useRecoilState, useRecoilValue } from "recoil";
import {
  answerState,
  moduleState,
  forReviewState,
  questionIndexState,
} from "./Simulator.atoms";

export default function Navigator({
  navigateCallback,
}: {
  navigateCallback?: VoidFunction;
}) {
  const exam = useRecoilValue(moduleState);
  const forReview = useRecoilValue(forReviewState);
  const answers = useRecoilValue(answerState);
  const [questionIndex, setQuestionIndex] = useRecoilState(questionIndexState);
  if (!exam || !forReview || !answers) throw new Error("no state : navigator");

  const navNumbers = Array(exam.questions.length)
    .fill(0)
    .map((_, i) => i + 1);

  const isForReview = (index: number) => {
    return forReview.indexList.includes(index);
  };

  const isAnswered = (index: number) => {
    return answers[index] ? true : false;
  };

  return (
    <>
      <div className="flex py-6 flex-wrap">
        {navNumbers.map((number, index) => (
          <>
            <button
              type="button"
              onClick={() => {
                setQuestionIndex(index);
                navigateCallback && navigateCallback();
              }}
              key={`navitem${number}`}
              className={`relative font-bold text-xl w-7 h-7 mr-4 mb-6 ${
                isForReview(index) ? "after:content-[''] after:bg-black" : null
              } ${
                isAnswered(index)
                  ? "bg-blue text-white"
                  : "text-blue border border-dashed border-black"
              }`}
            >
              {number}
              {isForReview(index) && (
                <img
                  src="image/review_icon_bgwhite.png"
                  alt="review"
                  className="absolute w-4 h-4 right-[-0.5rem] top-[-0.5rem]"
                />
              )}
              {questionIndex === index && (
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
