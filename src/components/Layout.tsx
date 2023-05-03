import { ReactNode } from "react";
import Header from "./Layout.Header";

export default function Layout({
  children,
  isWhiteBg,
}: {
  children: ReactNode;
  isWhiteBg?: boolean;
}) {
  return (
    <>
      <div
        className={`${isWhiteBg ? "bg-white" : "bg-gray-light"} min-h-screen`}
      >
        <Header />
        <div className="[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-3 p-10">
          <div className="flex justify-center">
            <div className="max-w-[60rem] grow">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
