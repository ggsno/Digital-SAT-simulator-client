import { useSetRecoilState } from "recoil";
import { redirect, useLoaderData } from "react-router-dom";
import { Urls } from "./router";
import { userState } from "../atoms/user";
import { storage } from "../utils/storage";
import isAuthentificated from "../utils/authentificate";
import { toastError } from "../utils/toastError";
import Layout from "../components/Layout";
import TeacherHome from "../components/Home.Teacher";
import StudentHome from "../components/Home.Student";
import { GetUserResponse, fetchGetUser } from "../service/user";
import { GetExamResponse, fetchGetExam } from "../service/exam";
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
  }, []);

  return (
    <Layout name={user.name}>
      {user.is_teacher ? (
        <TeacherHome />
      ) : (
        <StudentHome examTitle={exam ? exam.name : null} />
      )}
    </Layout>
  );
}
