import { useRecoilValue } from "recoil";
import { loadingState } from "../atoms/loading";

export default function Loading() {
  const isLoading = useRecoilValue(loadingState);
  return (
    <>
      <div
        className={`${
          isLoading ? "block" : "hidden"
        } fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-[#00000088] z-50`}
      >
        <img src="/image/loading.gif" alt="loading" className="w-32 h-32" />
      </div>
    </>
  );
}
