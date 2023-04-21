import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Simulator from "../components/Simulator";
import { examState } from "../atoms/exam";
import { moduleState } from "../components/Simulator.atoms";
import { useNavigate } from "react-router-dom";
import { Urls } from "./router";

export default function ExamPage() {
  const exam = useRecoilValue(examState);
  const setModule = useSetRecoilState(moduleState);
  const navigator = useNavigate();

  useEffect(() => {
    if (!exam) {
      navigator(Urls.lobby);
      return;
    }
    setModule(exam.sections[0].modules[0]);
  }, []);

  return <>{!exam ? "loading ..." : <Simulator />}</>;
}
