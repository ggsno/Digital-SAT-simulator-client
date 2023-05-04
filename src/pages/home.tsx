import { useSetRecoilState } from "recoil";
import { redirect, useLoaderData } from "react-router-dom";
import { Urls } from "./router";
import { userState } from "../atoms/user";
import { storage } from "../utils/storage";
import isAuthentificated from "../utils/authentificate";
import { toastError } from "../utils/toastError";
import { examState } from "../atoms/exam";
import Layout from "../components/Layout";
import TeacherHome from "../components/Home.Teacher";
import StudentHome from "../components/Home.Student";
import { GetUserResponse, fetchGetUser } from "../service/user";
import { GetExamResponse, fetchGetExam } from "../service/exam";
import {
  QUESTION_COUNT_PER_MATH,
  QUESTION_COUNT_PER_READING_AND_WRITING,
  SECTION_TITLES,
} from "../utils/constants";
import { useEffect } from "react";

export const loaderHome = async () => {
  try {
    if (!isAuthentificated()) return redirect(Urls.login);
    const user = (
      await fetchGetUser({
        id: storage.get("USER_ID") as string,
      })
    ).data.data;

    return {
      user,
      exam: user.exam_id
        ? (await fetchGetExam({ examId: user.exam_id.toString() })).data.data
        : null,
    };
  } catch (err) {
    toastError(err);
    throw err;
  }
};

export default function homePage() {
  const setUser = useSetRecoilState(userState);
  const setExam = useSetRecoilState(examState);
  const { user, exam } = useLoaderData() as {
    user: GetUserResponse["data"];
    exam: GetExamResponse["data"];
  };

  useEffect(() => {
    setUser({
      id: storage.get("USER_ID") as string,
      name: user.name,
      isTeacher: user.is_teacher,
      examId: user.exam_id,
    });

    if (exam) {
      const boundary = [
        [
          [0, QUESTION_COUNT_PER_READING_AND_WRITING / 2],
          [
            QUESTION_COUNT_PER_READING_AND_WRITING / 2,
            QUESTION_COUNT_PER_READING_AND_WRITING,
          ],
        ],
        [
          [
            QUESTION_COUNT_PER_READING_AND_WRITING,
            QUESTION_COUNT_PER_READING_AND_WRITING +
              QUESTION_COUNT_PER_MATH / 2,
          ],
          [
            QUESTION_COUNT_PER_READING_AND_WRITING +
              QUESTION_COUNT_PER_MATH / 2,
            QUESTION_COUNT_PER_READING_AND_WRITING + QUESTION_COUNT_PER_MATH,
          ],
        ],
      ];

      setExam({
        id: exam.id,
        title: exam.name,
        sections: SECTION_TITLES.map((title, i) => ({
          title,
          modules: [1, 2].map((_, j) => ({
            questions: exam.questions
              .slice(boundary[i][j][0], boundary[i][j][1])
              .map((e) => ({
                passage: e.passage,
                choices: e.choice_A
                  ? [e.choice_A, e.choice_B!, e.choice_C!, e.choice_D!]
                  : null,
                question: e.content,
              })),
          })),
        })),
      });
    }
  }, []);

  return (
    <Layout name={user.name}>
      {user.is_teacher ? <TeacherHome /> : <StudentHome />}
    </Layout>
  );
}
