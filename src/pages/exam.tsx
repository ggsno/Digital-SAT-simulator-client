import { redirect, useLoaderData } from "react-router-dom";
import Simulator from "../components/Simulator";
import { Urls } from "./Urls";
import isAuthentificated from "../utils/authentificate";
import { fetchGetExam } from "../service/apis/exam";
import { toastError } from "../utils/toastError";
import { ExamProps, convertExam } from "../service/convertDataFunctions";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../atoms/loading";
import { useEffect } from "react";

export const loaderExam = async ({ request }: { request: Request }) => {
  try {
    if (!(await isAuthentificated())) return redirect(Urls.login);
    const url = new URL(request.url);
    const examId = url.searchParams.get("id");
    if (!examId) throw new Error("no exam id");
    const exam = (await fetchGetExam({ examId })).data.data;

    return convertExam(exam);
  } catch (err) {
    toastError(err);
    throw err;
  }
};

export default function ExamPage() {
  const exam = useLoaderData() as ExamProps;
  const setLoading = useSetRecoilState(loadingState);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Simulator exam={exam} />
    </>
  );
}
