import { ReactNode } from "react";
import Header from "./Layout.Header";

export default function Layout({
  children,
  isWhiteBg,
  name,
}: {
  children: ReactNode;
  isWhiteBg?: boolean;
  name?: string;
}) {
  return (
    <>
      <div
        className={`${isWhiteBg ? "bg-white" : "bg-gray-light"} min-h-screen`}
      >
        <Header />
        {!name ? null : (
          <header className="flex justify-center bg-[#e6edf8] text-violet-blue py-5 px-10">
            <div className="max-w-[60rem] grow text-5xl font-thin">
              Welcome, {name}! Take a practice test and get ready for test day.
            </div>
          </header>
        )}
        <div className="[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-black [&_h2]:mb-3 p-10">
          <div className="flex justify-center">
            <div className="max-w-[60rem] grow">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
