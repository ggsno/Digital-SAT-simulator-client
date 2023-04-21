import { createBrowserRouter, redirect } from "react-router-dom";
import isAuthentificated from "../utils/authentificate";
import ExamPage from "./exam";
import LobbyPage from "./lobby";
import Login from "../components/Login";

export const Urls = {
  root: "/",
  login: "/login",
  lobby: "/lobby",
  exam: "/exam",
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
    loader: () => (!isAuthentificated() ? redirect(Urls.login) : null),
    element: <LobbyPage />,
  },
  {
    path: Urls.exam,
    loader: () => (!isAuthentificated() ? redirect(Urls.login) : null),
    element: <ExamPage />,
  },
]);
