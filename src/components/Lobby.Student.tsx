import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../atoms/user";
import { fetchGetExam } from "../service/apis";
import { examState } from "../atoms/exam";
import { moduleState } from "./Simulator.atoms";

export default function StudentLobby() {
  const user = useRecoilValue(userState);
  const [exam, setExam] = useRecoilState(examState);
  if (!user) throw new Error("no user state");
  const setModule = useSetRecoilState(moduleState);
  const navigator = useNavigate();

  useEffect(() => {
    (async () => {
      const {
        data: { data: res },
      } = await fetchGetExam({ examId: user.examId });
      setExam({
        id: res.id,
        title: res.name,
        sections: res.sections.map((section) => ({
          title: section.name,
          modules: section.modulars.map((module) => ({
            title: module.name,
            questions: module.questions.map((question) => ({
              passage: question.passage ?? null,
              question: question.content,
              choices: question.choice_A
                ? [
                    question.choice_A,
                    question.choice_B,
                    question.choice_C,
                    question.choice_D,
                  ]
                : null,
            })),
          })),
        })),
      });
    })();
  }, []);

  return (
    <>
      <div className="mb-4">
        <h2 className="mb-2">Your Tests</h2>
        {!exam ? (
          "no exam"
        ) : (
          <button
            onClick={() => {
              setModule(exam.sections[0].modules[0]);
              navigator("/exam");
            }}
            className="bg-white rounded-md shadow-md"
          >
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
