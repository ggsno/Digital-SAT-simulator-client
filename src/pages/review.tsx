import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Urls } from "./router";
import ReviewTable from "../components/ReviewTable";
import isAuthentificated from "../utils/authentificate";
import { toastError } from "../utils/toastError";
import Layout from "../components/Layout";
import { fetchGetExam, fetchGetExamResults } from "../service/apis/exam";
import { GetExamResponse } from "../service/apis/exam.type";

export const loaderReview = async ({ request }: { request: Request }) => {
  try {
    if (!isAuthentificated()) return redirect(Urls.login);

    const url = new URL(request.url);
    const resultId = url.searchParams.get("result-id");
    if (!resultId) throw new Error("no user id");
    const resExamResults = await fetchGetExamResults({
      resultId: Number(resultId),
    });
    if (!resExamResults.data.data) throw new Error("no exam result");
    const resExam = await fetchGetExam({
      examId: resExamResults.data.data.exam_id.toString(),
    });
    return {
      questions: resExam.data.data.questions,
      answers: resExamResults.data.data.question_results.map(
        (e) => e.your_answer
      ),
    };
  } catch (err) {
    toastError(err);
    throw err;
  }
};

export type ReviewProps = {
  number: number;
  section: string;
  yourAnswer: string;
  passage: string | null;
  question: string;
  choiceA: string | null;
  choiceB: string | null;
  choiceC: string | null;
  choiceD: string | null;
  correctAnswer: string;
};

export default function ReviewPage() {
  const { questions, answers } = useLoaderData() as {
    questions: GetExamResponse["data"]["questions"];
    answers: string[];
  };

  const reviews = questions.map((question, i) => ({
    number: i + 1,
    section: question.section,
    yourAnswer: answers[i],
    passage: question.passage,
    question: question.content,
    choiceA: question.choice_A,
    choiceB: question.choice_B,
    choiceC: question.choice_C,
    choiceD: question.choice_D,
    correctAnswer: question.correct_answer,
  }));

  return (
    <>
      <Layout isWhiteBg={true}>
        <ReviewTable reviews={reviews} />
      </Layout>
    </>
  );
}
