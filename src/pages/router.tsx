import { createBrowserRouter, redirect } from "react-router-dom";
import ExamPage, { loaderExam } from "./exam";
import LobbyPage, { loaderLobby } from "./lobby";
import isAuthentificated from "../utils/authentificate";
import Login from "../components/Login";
import Editor from "../components/Editor";

export const Urls = {
  root: "/",
  login: "/login",
  lobby: "/lobby",
  exam: "/exam",
  editor: "/editor",
};

export const router = createBrowserRouter([
  {
    path: Urls.root,
    loader: () =>
      !isAuthentificated() ? redirect(Urls.login) : redirect(Urls.lobby),
  },
  {
    path: Urls.login,
    loader: () => (isAuthentificated() ? redirect(Urls.root) : null),
    element: <Login />,
  },
  {
    path: Urls.lobby,
    loader: loaderLobby,
    element: <LobbyPage />,
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
]);
