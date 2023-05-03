import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { examState } from "../atoms/exam";
import { moduleState } from "./Simulator.atoms";
import { Urls } from "../pages/router";
import { storage } from "../utils/storage";
import { useQuery } from "react-query";
import { fetchGetExamResults } from "../service/exam";

export default function StudentHome() {
  const exam = useRecoilValue(examState);
  const setModule = useSetRecoilState(moduleState);
  const navigator = useNavigate();
  const startExam = () => {
    if (confirm("시험을 시작하시겠습니까?")) {
      setModule(exam!.sections[0].modules[0]);
      navigator("/exam");
    }
  };

  const { data: examResult } = useQuery(
    ["result"],
    () => fetchGetExamResults({ userId: storage.get("USER_ID")! }),
    {
      select: ({ data: { data } }) => data,
    }
  );

  const goReview = () => {
    navigator(
      Urls.review +
        `?exam-id=${exam?.id.toString()}&user-id=${storage.get("USER_ID")}`
    );
  };

  return (
    <>
      <div className="mb-10">
        <h2 className="mb-2">Your Tests</h2>
        {!exam ? (
          <div className="text-xl">no tests</div>
        ) : (
          <button onClick={startExam} className="bg-white rounded-md shadow-md">
            <h3 className="bg-[#f5f7fc] font-bold w-40 p-3 text-left">
              {exam.title}
            </h3>
            <div>click to take an exam</div>
          </button>
        )}
      </div>
      <div className="mb-4">
        <h2 className="mb-2">Test Results</h2>
        {!examResult ? (
          <div className="text-xl">no results</div>
        ) : (
          <button onClick={goReview} className="bg-white rounded-md shadow-md">
            <h3 className="bg-[#f5f7fc] font-bold w-40 p-3 text-left">
              {exam?.title}
            </h3>
            <div>View My Responses</div>
          </button>
        )}
      </div>
    </>
  );
}
