import { useSetRecoilState } from "recoil";
import { redirect, useLoaderData } from "react-router-dom";
import { Urls } from "./router";
import { userState } from "../atoms/user";
import { storage } from "../utils/storage";
import Lobby from "../components/Lobby";
import { fetchGetExam, fetchGetUser } from "../service/apis";
import isAuthentificated from "../utils/authentificate";
import { toastError } from "../utils/toastError";
import { examState } from "../atoms/exam";
import { ExamResponse, UserResponse } from "../service/types";

export const loaderLobby = async () => {
  try {
    if (!isAuthentificated()) return redirect(Urls.login);
    const responseUser = await fetchGetUser({
      id: storage.get("USER_ID") as string,
    });
    const responseExam = await fetchGetExam({
      examId: responseUser.data.data.exam_id,
    });
    return { user: responseUser.data.data, exam: responseExam.data.data };
  } catch (err) {
    toastError(err);
    throw err;
  }
};

export default function lobbyPage() {
  const setUser = useSetRecoilState(userState);
  const setExam = useSetRecoilState(examState);
  const { user, exam } = useLoaderData() as {
    user: UserResponse["data"];
    exam: ExamResponse["data"];
  };

  setUser({
    id: storage.get("USER_ID") as string,
    name: user.name,
    isTeacher: user.is_teacher,
    examId: user.exam_id,
  });

  if (exam) {
    setExam({
      id: exam.id,
      title: exam.name,
      sections: exam.sections.map((section) => ({
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
  }

  return (
    <>
      <Lobby />
    </>
  );
}
