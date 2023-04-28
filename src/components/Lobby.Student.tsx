import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { examState } from "../atoms/exam";
import { moduleState } from "./Simulator.atoms";

export default function StudentLobby() {
  const exam = useRecoilValue(examState);
  const setModule = useSetRecoilState(moduleState);
  const navigator = useNavigate();
  const startExam = () => {
    if (confirm("시험을 시작하시겠습니까?")) {
      setModule(exam!.sections[0].modules[0]);
      navigator("/exam");
    }
  };

  const TEMPgoReview = () => {
    navigator("/review?exam-id=1");
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
        <h2 className="mb-2">Results</h2>
        {/* {!exam ? (
          <div className="text-xl">no results</div>
        ) : ( */}
        <button
          onClick={TEMPgoReview}
          className="bg-white rounded-md shadow-md"
        >
          <h3 className="bg-[#f5f7fc] font-bold w-40 p-3 text-left">temp</h3>
          <div>View My Responses</div>
        </button>
        {/* )} */}
      </div>
    </>
  );
}
