import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Urls } from "./router";
import ReviewTable from "../components/ReviewTable";
import isAuthentificated from "../utils/authentificate";
import { fetchGetExam, fetchGetReview } from "../service/apis";
import { toastError } from "../utils/toastError";
import { Exam, ReviewResponse } from "../service/types";

export const loaderReview = async ({ request }: { request: Request }) => {
  try {
    if (!isAuthentificated()) return redirect(Urls.login);

    const url = new URL(request.url);
    const examId = url.searchParams.get("exam-id");
    if (!examId) throw new Error("no exam id");
    const resExam = await fetchGetExam({ examId: Number(examId) });
    const resReview = await fetchGetReview({ examId: examId });
    console.log(resReview.data);
    return { exam: resExam.data.data, answers: resReview.data.data.answers };
  } catch (err) {
    toastError(err);
    throw err;
  }
};

export type ReviewProps = {
  number: number;
  section: string;
  correctAnswer: string;
  yourAnswer: string;
  passage: string;
  question: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
};

export default function ReviewPage() {
  const { exam, answers } = useLoaderData() as {
    exam: Exam;
    answers: ReviewResponse["data"]["answers"];
  };

  console.log(exam, answers);
  const navigator = useNavigate();

  let questionIndex = 0;
  const reviews = exam.sections.reduce<ReviewProps[]>(
    (accSection, curSection) => {
      const moduleReviews = curSection.modulars.reduce<ReviewProps[]>(
        (accModule, curModule) => {
          const reviews = curModule.questions.map((question) => ({
            number: questionIndex + 1,
            section: curSection.name,
            correctAnswer: question.correct_answer,
            yourAnswer: answers[questionIndex++],
            passage: question.passage,
            question: question.content,
            choiceA: question.choice_A,
            choiceB: question.choice_B,
            choiceC: question.choice_C,
            choiceD: question.choice_D,
          }));

          return [...accModule, ...reviews] as ReviewProps[];
        },
        []
      );

      return [...accSection, ...moduleReviews];
    },
    []
  );

  const handleGoHome = () => {
    navigator(Urls.lobby);
  };

  return (
    <>
      <header>
        <button onClick={handleGoHome}>go home</button>
      </header>
      <ReviewTable reviews={reviews} />
    </>
  );
}
