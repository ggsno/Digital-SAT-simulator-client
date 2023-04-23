import { useEffect, useState } from "react";
import suneditor from "suneditor";
import "suneditor/dist/css/suneditor.min.css";
import plugins from "suneditor/src/plugins";
import katex from "katex";
import "katex/dist/katex.min.css";
import { useNavigate } from "react-router-dom";
import { Urls } from "../pages/router";

export default function Editor() {
  const navigator = useNavigate();
  const [hasPassage, setHasPassage] = useState(true);
  const [hasChoices, setHasChoices] = useState(true);
  const [passage, setPassage] = useState("");
  const [question, setQuestion] = useState("");
  const [choiceA, setChoiceA] = useState("");
  const [choiceB, setChoiceB] = useState("");
  const [choiceC, setChoiceC] = useState("");
  const [choiceD, setChoiceD] = useState("");
  const [correct, setCorrect] = useState("");

  const handleSave = () => {
    const TEMP_SAVE_API = () => {
      const TEMP = {
        passage: hasPassage ? passage : null,
        question,
        choiceA: hasChoices ? choiceA : null,
        choiceB: hasChoices ? choiceB : null,
        choiceC: hasChoices ? choiceC : null,
        choiceD: hasChoices ? choiceD : null,
        correct,
      };
      console.log(TEMP);
    };

    TEMP_SAVE_API();
  };

  useEffect(() => {
    const makeEditor = (
      id: string,
      setter: React.Dispatch<React.SetStateAction<string>>
    ) => {
      const editor = suneditor.create(id, {
        plugins: plugins,
        katex: katex,
        buttonList: [
          ["formatBlock"],
          ["bold", "underline", "subscript", "superscript"],
          ["image"],
          ["math"],
        ],
      });
      editor.onChange = (contents) => {
        editor.save();
        setter(contents);
      };
    };

    makeEditor("passage", setPassage);
    makeEditor("question", setQuestion);
    makeEditor("choiceA", setChoiceA);
    makeEditor("choiceB", setChoiceB);
    makeEditor("choiceC", setChoiceC);
    makeEditor("choiceD", setChoiceD);
  }, []);

  return (
    <>
      <button
        onClick={(e) => {
          if (confirm("저장하지 않고 홈으로 이동하시겠습니까?")) {
            navigator(Urls.lobby);
          } else {
            e.preventDefault();
          }
        }}
        className="border rounded-md py-2 px-4"
      >
        go home
      </button>
      <div className="flex flex-col items-center">
        <div>
          <label className="mr-5">
            <input
              type="checkbox"
              onChange={() => setHasPassage(!hasPassage)}
            />
            no passage
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => setHasChoices(!hasChoices)}
            />
            no choices
          </label>
        </div>

        <div className={`${hasPassage ? "sm:flex" : null}`}>
          <div className={`${hasPassage ? null : "hidden"}`}>
            <h2>Passage</h2>
            <textarea id="passage" className="w-screen sm:w-[47vw] h-[80vh]" />
          </div>
          <div>
            <div>
              <h2>Question</h2>
              <textarea
                id="question"
                className={`w-screen ${
                  hasPassage ? "sm:w-[47vw]" : null
                } h-[20vh]`}
              />
            </div>
            {["choiceA", "choiceB", "choiceC", "choiceD"].map((choice) => (
              <div
                key={"editor" + choice}
                className={`${hasChoices ? null : "hidden"}`}
              >
                <h2>{choice}</h2>
                <textarea
                  id={choice}
                  className="w-screen sm:w-[47vw] h-[10vh]"
                />
              </div>
            ))}
            <h2>Correct</h2>
            <input
              type="text"
              onChange={(e) => setCorrect(e.target.value)}
              className="border"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="border rounded-md py-2 px-3 m-4"
        >
          시험 추가하기
        </button>
      </div>
    </>
  );
}
