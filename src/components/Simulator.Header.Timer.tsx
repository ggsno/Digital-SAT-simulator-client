import { useTimer } from "./Simulator.hooks";

export default function Timer() {
  // const { isTimeHidden, toggleTimeHidden, getTime } = useTimer();

  return (
    <>
      {/* <div className="self-center justify-self-center">
          {isTimeHidden ? (
            <img
              src="/image/clock.png"
              alt="blind time"
              className="h-5 w-5 my-0 mx-auto mb-2 mt-1"
            />
          ) : (
            <div className="text-2xl text-center">{getTime()}</div>
          )}
          <button
            onClick={toggleTimeHidden}
            className="w-12 border rounded-full text-xs font-bold hover:bg-gray-light duration-300 mx-8"
          >
            {isTimeHidden ? "Show" : "Hide"}
          </button>
        </div> */}
    </>
  );
}
