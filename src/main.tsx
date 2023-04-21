import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { RecoilRoot } from "recoil";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Login from "./components/Login";
import isAuthentificated from "./utils/authentificate";
import { Toaster } from "react-hot-toast";
import Lobby from "./components/Lobby";
import Simulator from "./components/Simulator";

import { worker } from "../mocks/browser";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

const router = createBrowserRouter([
  {
    path: "/",
    loader: () =>
      !isAuthentificated() ? redirect("/login") : redirect("/lobby"),
  },
  {
    path: "/login",
    loader: () => (isAuthentificated() ? redirect("/") : null),
    element: <Login />,
  },
  {
    path: "/lobby",
    loader: () => (!isAuthentificated() ? redirect("/login") : null),
    element: <Lobby />,
  },
  {
    path: "/exam",
    loader: () => (!isAuthentificated() ? redirect("/login") : null),
    element: <Simulator />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <Toaster />
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
