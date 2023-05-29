import { redirect, useLoaderData } from "react-router-dom";
import Simulator from "../components/Simulator";
import { Urls } from "./router";
import isAuthentificated from "../utils/authentificate";
import { fetchGetUser } from "../service/apis/user";
import { storage } from "../utils/storage";
import { fetchGetExam } from "../service/apis/exam";
import { toastError } from "../utils/toastError";
import { ExamProps, convertExam } from "../service/convertDataFunctions";

export const loaderExam = async () => {
  try {
    if (!isAuthentificated()) return redirect(Urls.login);
    const user = (
      await fetchGetUser({
        id: storage.get("USER_ID") as string,
      })
    ).data.data;
    if (!user.exam_id) throw new Error("no exam id");
    const exam = (await fetchGetExam({ examId: user.exam_id.toString() })).data
      .data;

    return convertExam(exam);
  } catch (err) {
    toastError(err);
    throw err;
  }
};

export default function ExamPage() {
  const exam = useLoaderData() as ExamProps;

  return (
    <>
      <Simulator exam={exam} />
    </>
  );
}
