import { useRecoilValue } from "recoil";
import { Navigate, redirect } from "react-router-dom";
import Simulator from "../components/Simulator";
import { examState } from "../atoms/exam";
import { Urls } from "./router";
import isAuthentificated from "../utils/authentificate";

export const loaderExam = async () => {
  if (!isAuthentificated()) return redirect(Urls.login);
  return null;
};

export default function ExamPage() {
  const exam = useRecoilValue(examState);

  return <>{!exam ? <Navigate to={Urls.lobby} /> : <Simulator />}</>;
}
