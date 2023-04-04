import { useState } from "react";
import { useRecoilState } from "recoil";
import { optionEliminatorState } from "./Simulator.atoms";
import Toolbox from "./Simulator.Question.Toolbox";

type Props = {
  id: string;
  passage: string;
  question: string;
  choices: string[];
};

export default function Question(props: Props) {
  const { id, passage, question, choices } = props;

  const [markAnswerIndex, setMarkAnswerIndex] = useState<number | null>(null);

  const [optionEliminator, setOptionEliminator] = useRecoilState(
    optionEliminatorState
  );

  const handleOptionEliminator = (action: "ADD" | "REMOVE", index: number) => {
    const { list } = optionEliminator;
    switch (action) {
      case "ADD":
        if (list?.[id]) {
          setOptionEliminator({
            ...optionEliminator,
            list: { ...list, [id]: [...list[id], index] },
          });
        } else {
          setOptionEliminator({
            ...optionEliminator,
            list: { ...list, [id]: [index] },
          });
        }
        break;
      case "REMOVE":
        if (list?.[id].includes(index)) {
          setOptionEliminator({
            ...optionEliminator,
            list: {
              ...list,
              [id]: list[id].filter((e) => e !== index),
            },
          });
        } else {
          throw new Error("cannot remove option eliminator");
        }
        break;
      default:
        throw new Error("undefined action: handleOptionEliminator");
    }
  };

  return (
    <>
      <div className={`grid grid-cols-2 h-[calc(100vh_-_173px)]`}>
        <p
          className="font-question p-9 max-w-2xl justify-self-center overflow-auto"
          dangerouslySetInnerHTML={{ __html: passage }}
        />
        <div className="border-l-4 border-gray p-9 w-full overflow-auto">
          <div className="my-0 mx-auto max-w-2xl">
            <Toolbox id={id} />
            <hr className="border-t-2 border-dashed border-gray mb-2" />

            <fieldset className="font-question">
              <legend dangerouslySetInnerHTML={{ __html: question }} />
              {choices.map((choice, index) => (
                <li
                  key={`choice${index}`}
                  className="list-none flex mt-4 items-center"
                >
                  <input
                    type="radio"
                    name="choice"
                    id={`choice${index}`}
                    className={`peer sr-only`}
                    onChange={() => {
                      setMarkAnswerIndex(index);
                      if (optionEliminator.list?.[id].includes(index))
                        handleOptionEliminator("REMOVE", index);
                    }}
                    checked={index === markAnswerIndex}
                  />
                  <label
                    className={`grow flex px-2 h-[2.75rem] items-center hover:cursor-pointer rounded-md border \
                    border-black peer-checked:border-blue peer-checked:border-2 \
                      peer-checked:[&>div]:bg-blue peer-checked:[&>div]:text-white\
                      ${
                        optionEliminator.isActive &&
                        optionEliminator.list?.[id].includes(index)
                          ? "text-gray"
                          : null
                      }`}
                    htmlFor={`choice${index}`}
                  >
                    <div
                      className={`font-main mr-4 border-2 ${
                        optionEliminator.isActive &&
                        optionEliminator.list?.[id].includes(index)
                          ? "border-gray"
                          : "border-gray-dark"
                      } rounded-full \
                    w-6 h-6 text-center leading-6`}
                    >
                      {["A", "B", "C", "D"][index]}
                    </div>
                    {choice}
                  </label>

                  {optionEliminator.isActive ? (
                    <div className="w-12 text-center">
                      {optionEliminator.list?.[id].includes(index) ? (
                        <button
                          onClick={() => {
                            handleOptionEliminator("REMOVE", index);
                          }}
                          className="font-main underline"
                        >
                          Undo
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (index === markAnswerIndex)
                              setMarkAnswerIndex(null);
                            handleOptionEliminator("ADD", index);
                          }}
                          className={`font-main border border-gray-dark rounded-full \
                      w-5 h-5 text-center leading-5 line-through`}
                        >
                          {["A", "B", "C", "D"][index]}
                        </button>
                      )}
                    </div>
                  ) : null}
                </li>
              ))}
            </fieldset>
          </div>
        </div>
      </div>
    </>
  );
}
