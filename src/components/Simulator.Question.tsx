import { useRecoilState, useRecoilValue } from "recoil";
import {
  answerState,
  optionEliminatorState,
  questionIndexState,
} from "./Simulator.atoms";
import Toolbox from "./Simulator.Question.Toolbox";

type Props = {
  passage?: string;
  question: string;
  choices?: string[];
};

export default function Question(props: Props) {
  const { passage, question, choices } = props;
  const questionIndex = useRecoilValue(questionIndexState);
  const [answers, setAnswers] = useRecoilState(answerState);
  const [optionEliminator, setOptionEliminator] = useRecoilState(
    optionEliminatorState
  );

  const addAnswer = ({
    answer,
    isMultiple,
  }: {
    answer: number | string;
    isMultiple?: boolean;
  }) => {
    const newAnswers = answers.slice();
    newAnswers.splice(
      questionIndex,
      1,
      isMultiple
        ? convertToMultipleChoice(answer as number)
        : (answer as string)
    );
    setAnswers(newAnswers);
  };

  const resetAnswer = () => {
    const newAnswers = answers.slice();
    newAnswers.splice(questionIndex, 1, null);
    setAnswers(newAnswers);
  };

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
        if (eliminatedOptionsList[questionIndex]) {
          const newEliminatedOptionsList = eliminatedOptionsList.slice();
          const newEliminatedOptions =
            eliminatedOptionsList[questionIndex].concat(choiceIndex);
          newEliminatedOptionsList.splice(
            questionIndex,
            1,
            newEliminatedOptions
          );
          setEliminatedOptionsList(newEliminatedOptionsList);
        } else {
          const newEliminatedOptionsList = eliminatedOptionsList.slice();
          newEliminatedOptionsList[questionIndex] = [choiceIndex];
          setEliminatedOptionsList(newEliminatedOptionsList);
        }
        break;
      case "REMOVE":
        if (eliminatedOptionsList[questionIndex].includes(choiceIndex)) {
          const newEliminatedOptionsList = eliminatedOptionsList.slice();

          const newEliminatedOptions = eliminatedOptionsList[
            questionIndex
          ].filter((e) => e !== choiceIndex);

          newEliminatedOptionsList[questionIndex] = newEliminatedOptions;

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

  const convertFromObjectiveChoice = (choice: string | null) => {
    switch (choice) {
      case "A":
        return 0;
      case "B":
        return 1;
      case "C":
        return 2;
      case "D":
        return 3;
      case "E":
        return 4;
      default:
        return choice;
    }
  };

  const isEliminatorInclude = (choiceIndex: number) =>
    optionEliminator.eliminatedOptionsList[questionIndex]?.includes(
      choiceIndex
    );

  return (
    <>
      <div
        className={`${
          passage ? "grid grid-cols-2" : null
        } h-[calc(100vh_-_173px)]`}
      >
        {passage && (
          <p
            className="font-question p-9 max-w-2xl justify-self-center overflow-auto"
            dangerouslySetInnerHTML={{ __html: passage }}
          />
        )}
        <div className="border-l-4 border-gray p-9 w-full overflow-auto">
          <div className="my-0 mx-auto max-w-2xl">
            <Toolbox index={questionIndex} />
            <hr className="border-t-2 border-dashed border-gray mb-2" />

            <fieldset className="font-question">
              <legend dangerouslySetInnerHTML={{ __html: question }} />
              {!choices ? (
                <input
                  onChange={(e) => {
                    addAnswer({ answer: e.target.value });
                  }}
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
                        convertFromObjectiveChoice(answers[questionIndex]) ===
                        choiceIndex
                      }
                      onChange={() => {
                        addAnswer({ answer: choiceIndex, isMultiple: true });
                        if (isEliminatorInclude(choiceIndex))
                          handleOptionEliminator("REMOVE", choiceIndex);
                      }}
                      className={`peer sr-only`}
                    />
                    <label
                      className={`grow flex px-2 h-[2.75rem] items-center hover:cursor-pointer rounded-md border \
                    border-black peer-checked:border-blue peer-checked:border-2 \
                      peer-checked:[&>div]:bg-blue peer-checked:[&>div]:text-white\
                      ${
                        optionEliminator.isActive &&
                        isEliminatorInclude(choiceIndex)
                          ? "text-gray"
                          : null
                      }`}
                      htmlFor={`choice${choiceIndex}`}
                    >
                      <div
                        className={`font-main mr-4 border-2 ${
                          optionEliminator.isActive &&
                          isEliminatorInclude(choiceIndex)
                            ? "border-gray"
                            : "border-gray-dark"
                        } rounded-full \
                    w-6 h-6 text-center leading-6`}
                      >
                        {convertToMultipleChoice(choiceIndex)}
                      </div>
                      {choice}
                    </label>

                    {optionEliminator.isActive ? (
                      <div className="w-12 text-center">
                        {isEliminatorInclude(choiceIndex) ? (
                          <button
                            onClick={() => {
                              handleOptionEliminator("REMOVE", choiceIndex);
                            }}
                            className="font-main underline"
                          >
                            Undo
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              if (
                                choiceIndex ===
                                convertFromObjectiveChoice(
                                  answers[questionIndex]
                                )
                              )
                                resetAnswer();
                              handleOptionEliminator("ADD", choiceIndex);
                            }}
                            className={`font-main border border-gray-dark rounded-full \
                      w-5 h-5 text-center leading-5 line-through`}
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
