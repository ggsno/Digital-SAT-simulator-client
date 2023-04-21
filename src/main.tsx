import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { worker } from "../mocks/browser";
import { router } from "./pages/router";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <Toaster />
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
