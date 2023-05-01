import { createBrowserRouter, redirect } from "react-router-dom";
import ExamPage, { loaderExam } from "./exam";
import HomePage, { loaderHome } from "./home";
import isAuthentificated from "../utils/authentificate";
import Login from "../components/Login";
import Editor from "../components/Editor";
import ReviewPage, { loaderReview } from "./review";

export const Urls = {
  root: "/",
  login: "/login",
  home: "/home",
  exam: "/exam",
  editor: "/editor",
  review: "/review",
};

export const router = createBrowserRouter([
  {
    path: Urls.root,
    loader: () =>
      !isAuthentificated() ? redirect(Urls.login) : redirect(Urls.home),
  },
  {
    path: Urls.login,
    loader: () => (isAuthentificated() ? redirect(Urls.root) : null),
    element: <Login />,
  },
  {
    path: Urls.home,
    loader: loaderHome,
    element: <HomePage />,
  },
  {
    path: Urls.exam,
    loader: loaderExam,
    element: <ExamPage />,
  },
  {
    path: Urls.editor,
    loader: () => (!isAuthentificated() ? redirect(Urls.login) : null),
    element: <Editor />,
  },
  {
    path: Urls.review,
    loader: loaderReview,
    element: <ReviewPage />,
  },
]);
