import { useRecoilState } from "recoil";
import { optionEliminatorState } from "./Simulator.atoms";
import Toolbox from "./Simulator.Question.Toolbox";
import { useEffect, useRef } from "react";
import { useAnnotate, useAnswer, useIndexControl } from "./Simulator.hooks";

type Props = {
  passage: string | null;
  question: string;
  choices: string[] | null;
};

export default function Question(props: Props) {
  const { passage, question, choices } = props;
  const { moduleAnswers, setModuleAnswer, removeModuleAnswer } = useAnswer();
  const [optionEliminator, setOptionEliminator] = useRecoilState(
    optionEliminatorState
  );

  const { index } = useIndexControl();
  const { setAnnotateBoundary } = useAnnotate();

  const handleOptionEliminator = (
    action: "ADD" | "REMOVE",
    choiceIndex: number
  ) => {
    const { eliminatedOptionsList } = optionEliminator;
    const setEliminatedOptionsList = (newEliminatedOptionsList: number[][]) => {
      setOptionEliminator({
        ...optionEliminator,
        eliminatedOptionsList: newEliminatedOptionsList,
      });
    };
    switch (action) {
      case "ADD":
        if (eliminatedOptionsList[index.question]) {
          const newEliminatedOptionsList = eliminatedOptionsList.slice();
          const newEliminatedOptions =
            eliminatedOptionsList[index.question].concat(choiceIndex);
          newEliminatedOptionsList.splice(
            index.question,
            1,
            newEliminatedOptions
          );
          setEliminatedOptionsList(newEliminatedOptionsList);
        } else {
          const newEliminatedOptionsList = eliminatedOptionsList.slice();
          newEliminatedOptionsList[index.question] = [choiceIndex];
          setEliminatedOptionsList(newEliminatedOptionsList);
        }
        break;
      case "REMOVE":
        if (eliminatedOptionsList[index.question].includes(choiceIndex)) {
          const newEliminatedOptionsList = eliminatedOptionsList.slice();

          const newEliminatedOptions = eliminatedOptionsList[
            index.question
          ].filter((e) => e !== choiceIndex);

          newEliminatedOptionsList[index.question] = newEliminatedOptions;

          setEliminatedOptionsList(newEliminatedOptionsList);
        } else {
          throw new Error("cannot remove option eliminator");
        }
        break;
      default:
        throw new Error("undefined action: handleOptionEliminator");
    }
  };

  const convertToMultipleChoice = (index: number) =>
    ["A", "B", "C", "D", "E"][index];

  const isEliminatorInclude = (choiceIndex: number) =>
    optionEliminator.eliminatedOptionsList[index.question]?.includes(
      choiceIndex
    );

  const passageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (passageRef.current) {
      setAnnotateBoundary(passageRef);
    }
  }, [passageRef.current]);

  return (
    <>
      <div
        className={`${
          passage ? "grid grid-cols-2" : null
        } h-[calc(100vh_-_173px)]`}
      >
        {passage && (
          <div
            ref={passageRef}
            className="overflow-auto w-full flex justify-center"
          >
            <div
              className="font-question p-9 max-w-2xl [&_p]:mb-2 [&_h2]:mb-2 [&_h2]:font-bold h-min"
              dangerouslySetInnerHTML={{ __html: passage }}
            />
          </div>
        )}
        <div className="border-l-4 border-gray p-9 w-full overflow-auto">
          <div className="my-0 mx-auto max-w-2xl">
            <Toolbox index={index.question} />
            <hr className="border-t-2 border-dashed border-gray mb-2" />

            <fieldset className="font-question">
              <legend dangerouslySetInnerHTML={{ __html: question }} />
              {!choices ? (
                <input
                  onChange={(e) =>
                    setModuleAnswer(index.question, e.target.value)
                  }
                  value={moduleAnswers[index.question] ?? ""}
                  className="border-b"
                />
              ) : (
                choices.map((choice, choiceIndex) => (
                  <li
                    key={`choice${choiceIndex}`}
                    className="list-none flex mt-4 items-center"
                  >
                    <input
                      type="radio"
                      name="choice"
                      id={`choice${choiceIndex}`}
                      checked={
                        moduleAnswers[index.question] ===
                        convertToMultipleChoice(choiceIndex)
                      }
                      onChange={() => {
                        setModuleAnswer(
                          index.question,
                          convertToMultipleChoice(choiceIndex)
                        );
                        if (isEliminatorInclude(choiceIndex))
                          handleOptionEliminator("REMOVE", choiceIndex);
                      }}
                      className={`peer sr-only`}
                    />
                    <label
                      className={`grow flex p-2 w-full break-all items-center hover:cursor-pointer rounded-md border
                    border-black peer-checked:border-blue peer-checked:border-2
                      peer-checked:[&>div]:bg-blue peer-checked:[&>div]:text-white
                      ${
                        optionEliminator.isActive &&
                        isEliminatorInclude(choiceIndex)
                          ? "text-gray relative after:absolute after:top-1/2 after:left-[-4px] after:content-[''] after:border-b-2 after:border-black after:w-[calc(100%_+_8px)]"
                          : null
                      }`}
                      htmlFor={`choice${choiceIndex}`}
                    >
                      <div
                        className={`font-main mr-4 border-2 shrink-0 rounded-full w-6 h-6 text-center leading-[1.4rem] font-bold  ${
                          optionEliminator.isActive &&
                          isEliminatorInclude(choiceIndex)
                            ? "border-gray text-gray"
                            : "border-gray-dark text-gray-dark"
                        }`}
                      >
                        {convertToMultipleChoice(choiceIndex)}
                      </div>
                      <p
                        dangerouslySetInnerHTML={{ __html: choice }}
                        className="break-keep"
                      />
                    </label>

                    {optionEliminator.isActive ? (
                      <div className="w-12 text-center">
                        {isEliminatorInclude(choiceIndex) ? (
                          <button
                            onClick={() => {
                              handleOptionEliminator("REMOVE", choiceIndex);
                            }}
                            className="font-main underline font-bold"
                          >
                            Undo
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              if (
                                convertToMultipleChoice(choiceIndex) ===
                                moduleAnswers[index.question]
                              )
                                removeModuleAnswer(index.question);
                              handleOptionEliminator("ADD", choiceIndex);
                            }}
                            className={`font-main border border-gray-dark rounded-full \
                      w-5 h-5 text-center leading-5 relative after:absolute after:top-2 after:left-[-3px] after:content-[''] after:border-b-2 after:border-black after:w-6`}
                          >
                            {convertToMultipleChoice(choiceIndex)}
                          </button>
                        )}
                      </div>
                    ) : null}
                  </li>
                ))
              )}
            </fieldset>
          </div>
        </div>
      </div>
    </>
  );
}
