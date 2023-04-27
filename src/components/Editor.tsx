import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import suneditor from "suneditor";
import "suneditor/dist/css/suneditor.min.css";
import plugins from "suneditor/src/plugins";
import katex from "katex";
import "katex/dist/katex.min.css";
import { useNavigate } from "react-router-dom";
import { Urls } from "../pages/router";
import { fetchGetAllExams, fetchGetExam, fetchPostExam } from "../service/apis";
import SunEditor from "suneditor/src/lib/core";

export default function Editor() {
  const navigator = useNavigate();

  const [newExamTitle, setNewExamTitle] = useState("");

  const [curExamTitle, setCurExamTitle] = useState<string | null>(null);
  const [curSectionTitle, setCurSectionTitle] = useState<string | null>(null);
  const [curModuleNumber, setCurModuleNumber] = useState<string | null>(null);
  const [curQuestionNumber, setCurQuestionNumber] = useState<string | null>(
    null
  );

  const [hasPassage, setHasPassage] = useState(true);
  const [hasChoices, setHasChoices] = useState(true);

  const editorsRef = useRef<{
    passage: SunEditor;
    question: SunEditor;
    choiceA: SunEditor;
    choiceB: SunEditor;
    choiceC: SunEditor;
    choiceD: SunEditor;
  } | null>(null);

  const [correctAnswer, setCorrectAnswer] = useState("");

  const queryClient = useQueryClient();
  const { data: exams } = useQuery(["exams"], fetchGetAllExams, {
    select: ({ data }) => data.data,
  });
  const mutateExam = useMutation(fetchPostExam, {
    onSuccess: () => queryClient.invalidateQueries("exams"),
  }).mutate;
  const getExamId = () => {
    const id = exams?.find((e) => e.name === curExamTitle)?.id;
    if (!id)
      throw new Error(`cannot find exam id.\ngiven title:${curExamTitle}`);
    return id;
  };

  const { data: exam } = useQuery(
    ["exam", curExamTitle],
    () => fetchGetExam({ examId: getExamId() }),
    {
      select: ({ data }) => data.data,
      enabled: !!exams && !!curExamTitle,
    }
  );

  const handlePostNewExam = () => {
    mutateExam({ name: newExamTitle });
  };

  const handleSave = () => {
    const TEMP_SAVE_API = () => {
      if (!editorsRef.current) throw new Error("no editor ref");
      const TEMP = {
        passage: hasPassage
          ? editorsRef.current.passage.getContents(true)
          : null,
        content: editorsRef.current.question.getContents(true),
        choice_A: hasChoices
          ? editorsRef.current.choiceA.getContents(true)
          : null,
        choice_B: hasChoices
          ? editorsRef.current.choiceB.getContents(true)
          : null,
        choice_C: hasChoices
          ? editorsRef.current.choiceC.getContents(true)
          : null,
        choice_D: hasChoices
          ? editorsRef.current.choiceD.getContents(true)
          : null,
        correct_answer: correctAnswer,
      };
      console.log(TEMP);
    };

    TEMP_SAVE_API();
  };

  const getSectionIndex = () => {
    return curSectionTitle === "Reading and Writing" ? 0 : 1;
  };

  const getModuleIndex = () => {
    return Number(curModuleNumber) - 1;
  };

  const getQuestionIndex = () => {
    return Number(curQuestionNumber) - 1;
  };

  useEffect(() => {
    setCurQuestionNumber(null);
  }, [curExamTitle, curSectionTitle, curModuleNumber]);

  useEffect(() => {
    if (
      exam &&
      curExamTitle &&
      curSectionTitle &&
      curModuleNumber &&
      curQuestionNumber
    ) {
      if (!editorsRef.current) throw new Error("no editor ref");
      const question =
        exam.sections[getSectionIndex()].modulars[getModuleIndex()].questions[
          getQuestionIndex()
        ];
      if (question.passage) {
        setHasPassage(true);
        editorsRef.current.passage.setContents(question.passage);
      } else setHasPassage(false);
      if (question.choice_A) {
        setHasChoices(true);
        editorsRef.current.choiceA.setContents(question.choice_A);
        editorsRef.current.choiceB.setContents(question.choice_B);
        editorsRef.current.choiceC.setContents(question.choice_C);
        editorsRef.current.choiceD.setContents(question.choice_D);
      } else setHasChoices(false);
      editorsRef.current.question.setContents(question.content);
      setCorrectAnswer(question.correct_answer);
    }
  }, [exam, curSectionTitle, curModuleNumber, curQuestionNumber]);

  useEffect(() => {
    const makeEditor = (id: string, height: string) => {
      const editor = suneditor.create(id, {
        plugins: plugins,
        height,
        katex: katex,
        buttonList: [
          ["formatBlock"],
          ["bold", "underline", "subscript", "superscript"],
          ["image"],
          ["math"],
        ],
      });
      return editor;
    };
    editorsRef.current = {
      passage: makeEditor("passage", "80vh"),
      question: makeEditor("question", "20vh"),
      choiceA: makeEditor("choiceA", "10vh"),
      choiceB: makeEditor("choiceB", "10vh"),
      choiceC: makeEditor("choiceC", "10vh"),
      choiceD: makeEditor("choiceD", "10vh"),
    };
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
      <div className="border">
        <h2>시험 생성</h2>
        <label>
          시험 제목
          <input
            type="text"
            onChange={(e) => setNewExamTitle(e.target.value)}
            className="border-b"
          />
        </label>
        <button onClick={handlePostNewExam} className="border">
          시험 추가
        </button>
      </div>
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th>Exam</th>
            <th>Section</th>
            <th>Module</th>
            <th>Question Number</th>
          </tr>
        </thead>
        <tbody>
          <tr className="[&_select]:w-full">
            <td>
              <select onChange={(e) => setCurExamTitle(e.target.value)}>
                <option disabled selected>
                  선택
                </option>
                {exams?.map((exam) => (
                  <option key={"examOption" + exam.id}>{exam.name}</option>
                ))}
              </select>
            </td>
            <td>
              <select onChange={(e) => setCurSectionTitle(e.target.value)}>
                <option disabled selected>
                  선택
                </option>
                <option>Reading and Writing</option>
                <option>Math</option>
              </select>
            </td>
            <td>
              <select onChange={(e) => setCurModuleNumber(e.target.value)}>
                <option disabled selected>
                  선택
                </option>
                <option>1</option>
                <option>2</option>
              </select>
            </td>
            <td>
              <select
                onChange={(e) => setCurQuestionNumber(e.target.value)}
                value={curQuestionNumber ?? "선택"}
              >
                <option disabled selected>
                  선택
                </option>
                {exam &&
                  curExamTitle &&
                  curSectionTitle &&
                  curModuleNumber &&
                  exam.sections[getSectionIndex()].modulars[
                    getModuleIndex()
                  ].questions.map((question, i) => (
                    <option key={"questionOption" + i}>
                      {question.number}
                    </option>
                  ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        className={`flex flex-col items-center ${
          curExamTitle &&
          curSectionTitle &&
          curModuleNumber &&
          curQuestionNumber
            ? "block"
            : "hidden"
        }`}
      >
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
          <div
            className={`${hasPassage ? null : "hidden"} w-screen sm:w-[47vw]`}
          >
            <h2>Passage</h2>
            <textarea id="passage" />
          </div>
          <div>
            <div className={`w-screen ${hasPassage ? "sm:w-[47vw]" : null}`}>
              <h2>Question</h2>
              <textarea id="question" />
            </div>
            {["choiceA", "choiceB", "choiceC", "choiceD"].map((choice) => (
              <div
                key={"editor" + choice}
                className={`${
                  hasChoices ? null : "hidden"
                } w-screen sm:w-[47vw]`}
              >
                <h2>{choice}</h2>
                <textarea id={choice} />
              </div>
            ))}
            <h2>Correct Answer</h2>
            <input
              type="text"
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="border"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="border rounded-md py-2 px-3 m-4"
        >
          저장하기
        </button>
      </div>
    </>
  );
}
