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

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => (!isAuthentificated() ? redirect("/login") : null),
    element: <App />,
  },
  {
    path: "/login",
    loader: () => (isAuthentificated() ? redirect("/") : null),
    element: <Login />,
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
