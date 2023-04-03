import { useRecoilState } from "recoil";
import { isCalulatorOpenedState } from "./Simulator.atoms";

export default function Header({ title }: { title: string }) {
  const [isCalculatorOpen, setIsCalculatorOpen] = useRecoilState(
    isCalulatorOpenedState
  );

  const handleCalculatorClick = () => {
    setIsCalculatorOpen(!isCalculatorOpen);
  };

  return (
    <>
      <header className="grid grid-cols-5 w-100vw px-10 py-5">
        <h1 className="col-span-2 text-xl truncate hover:text-clip">{title}</h1>
        <div className="text-2xl self-center justify-self-center">0:00</div>
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
