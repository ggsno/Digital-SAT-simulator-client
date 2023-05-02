import { useSetRecoilState } from "recoil";
import { moduleIndexState } from "./Simulator.atoms";
import { useEffect, useState } from "react";

export default function Breaktime({
  setIsBreaktime,
}: {
  setIsBreaktime: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const setModuleIndex = useSetRecoilState(moduleIndexState);
  const [time, setTime] = useState(60 * 10);

  const resumeTesting = () => {
    setModuleIndex(0);
    setIsBreaktime(false);
  };

  useEffect(() => {
    const startTime = Date.now();
    const endTime = 60 * 10;

    const callback = () => {
      if (startTime) {
        setTime(Math.ceil((startTime + endTime * 1000 - Date.now()) / 1000));
      }
      if (startTime !== null && startTime + endTime * 1000 - Date.now() < 0) {
        clearInterval(timer);
        resumeTesting();
      }
    };
    const timer = setInterval(callback, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="bg-black h-screen w-screen flex justify-center items-center text-white gap-8">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center border border-white rounded-md px-8 py-2">
            <div className="text-lg font-bold">Remaining Break Time:</div>
            <div className="text-6xl">
              {Math.floor(time / 60 >= 0 ? time / 60 : 0)
                .toString()
                .padStart(2, "0")}
              :{(time % 60).toString().padStart(2, "0")}
            </div>
          </div>
          <button
            onClick={resumeTesting}
            className="bg-yellow-dark text-black rounded-full py-2 px-4 font-bold mt-7"
          >
            Resume Testing
          </button>
        </div>
        <div>
          <h2 className="text-4xl font-bold">Practice Test Break</h2>
          <p>
            You can resume this practice test as soon as you're ready to move
            on.
          </p>
          <hr className="border-white my-7" />
          <h2 className="text-4xl font-bold">Take a Break</h2>
          <p>Do not exit the app or close your device.</p>
        </div>
      </div>
    </>
  );
}
