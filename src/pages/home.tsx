import { useSetRecoilState } from "recoil";
import { redirect, useLoaderData } from "react-router-dom";
import { Urls } from "./Urls";
import { userState } from "../atoms/user";
import { storage } from "../utils/storage";
import isAuthentificated from "../utils/authentificate";
import { toastError } from "../utils/toastError";
import Layout from "../components/Layout";
import TeacherHome from "../components/Home.Teacher";
import StudentHome from "../components/Home.Student";
import { fetchGetUser } from "../service/apis/user";
import { fetchGetAllExamResults } from "../service/apis/exam";
import { useEffect } from "react";
import { GetUserResponse } from "../service/apis/user.type";
import { GetAllExamResultsResponse } from "../service/apis/exam.type";

export const loaderHome = async () => {
  try {
    if (!(await isAuthentificated())) return redirect(Urls.login);
    const userId = storage.get("USER_ID") as string;
    const user = (
      await fetchGetUser({
        id: userId,
      })
    ).data.data;

    const examResults = (await fetchGetAllExamResults({ userId })).data.data;

    return {
      user,
      examResults,
    };
  } catch (err) {
    toastError(err);
    throw err;
  }
};

export default function homePage() {
  const setUser = useSetRecoilState(userState);
  const { user, examResults } = useLoaderData() as {
    user: GetUserResponse["data"];
    examResults: GetAllExamResultsResponse["data"];
  };

  useEffect(() => {
    setUser({
      id: storage.get("USER_ID") as string,
      name: user.name,
      isTeacher: user.is_teacher,
    });
  }, []);

  return (
    <Layout name={user.name}>
      {user.is_teacher ? (
        <TeacherHome />
      ) : (
        <StudentHome exams={user.exams} examResults={examResults} />
      )}
    </Layout>
  );
}
