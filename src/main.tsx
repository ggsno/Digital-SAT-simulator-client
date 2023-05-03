import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { worker } from "../mocks/browser";
import { router } from "./pages/router";
import { QueryClient, QueryClientProvider } from "react-query";
import Loading from "./components/Loading";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Loading />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </RecoilRoot>
);
