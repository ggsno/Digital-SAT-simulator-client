import Timer from "./Simulator.Header.Timer";
import Toolbox from "./Simulator.Header.Toolbox";

export default function Header({ title }: { title: string }) {
  return (
    <>
      <header className="grid grid-cols-5 w-100vw px-10 py-5">
        <h1 className="col-span-2 text-xl truncate hover:text-clip font-medium">
          {title}
        </h1>
        <Timer />
        <Toolbox />
      </header>
    </>
  );
}
