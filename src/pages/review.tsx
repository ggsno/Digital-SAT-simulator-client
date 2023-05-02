import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Urls } from "./router";
import ReviewTable from "../components/ReviewTable";
import isAuthentificated from "../utils/authentificate";
import { toastError } from "../utils/toastError";
import Layout from "../components/Layout";
import {
  GetExamResponse,
  fetchGetExam,
  fetchGetExamResults,
} from "../service/exam";
import { storage } from "../utils/storage";

export const loaderReview = async ({ request }: { request: Request }) => {
  try {
    if (!isAuthentificated()) return redirect(Urls.login);

    const url = new URL(request.url);
    const examId = url.searchParams.get("exam-id");
    if (!examId) throw new Error("no exam id");
    const resExam = await fetchGetExam({ examId });
    const resExamResults = await fetchGetExamResults({
      userId: storage.get("USER_ID")!,
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
