import { useRecoilState, useRecoilValue } from "recoil";
import { isCalulatorOpenedState, timerState } from "./Simulator.atoms";
import { useEffect, useState } from "react";

const END_TIME_SECONDS = 50 * 60;

export default function Header({ title }: { title: string }) {
  const [isCalculatorOpen, setIsCalculatorOpen] = useRecoilState(
    isCalulatorOpenedState
  );
  const [time, setTime] = useState(END_TIME_SECONDS);

  const startTime = useRecoilValue(timerState);

  const handleCalculatorClick = () => {
    setIsCalculatorOpen(!isCalculatorOpen);
  };

  useEffect(() => {
    const callback = () => {
      if (startTime) {
        setTime(
          Math.ceil((startTime + END_TIME_SECONDS * 1000 - Date.now()) / 1000)
        );
      }
      if (
        startTime !== null &&
        startTime + END_TIME_SECONDS * 1000 - Date.now() < 0
      ) {
        clearInterval(timer);
      }
    };
    const timer = setInterval(callback, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <header className="grid grid-cols-5 w-100vw px-10 py-5">
        <h1 className="col-span-2 text-xl truncate hover:text-clip font-medium">
          {title}
        </h1>
        <div className="text-2xl self-center justify-self-center">
          {Math.floor(time / 60 >= 0 ? time / 60 : 0)
            .toString()
            .padStart(2, "0")}
          :{(time % 60).toString().padStart(2, "0")}
        </div>
        <button
          type="button"
          onClick={handleCalculatorClick}
          className={`col-span-2 self-center justify-self-end text-sm border-b-2 ${
            isCalculatorOpen ? "border-black" : "border-transparent"
          }`}
        >
          <img
            src="/image/calculator.png"
            alt="calculator icon"
            className="my-0 mx-auto pb-1.5"
          />
          Calculator
        </button>
      </header>
    </>
  );
}
