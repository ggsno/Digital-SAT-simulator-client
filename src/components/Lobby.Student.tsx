import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { examState } from "../atoms/exam";
import { moduleState } from "./Simulator.atoms";

export default function StudentLobby() {
  const exam = useRecoilValue(examState);
  const setModule = useSetRecoilState(moduleState);
  const navigator = useNavigate();
  const startExam = () => {
    setModule(exam!.sections[0].modules[0]);
    navigator("/exam");
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="mb-2">Your Tests</h2>
        {!exam ? (
          "no exam"
        ) : (
          <button onClick={startExam} className="bg-white rounded-md shadow-md">
            <h3 className="bg-[#f5f7fc] font-bold w-40 p-3 text-left">
              {exam.title}
            </h3>
            <div>go to exam</div>
          </button>
        )}
      </div>
      <div className="mb-4">
        <h2 className="mb-2">Results</h2>
      </div>
    </>
  );
}
