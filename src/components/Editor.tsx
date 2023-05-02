import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import suneditor from "suneditor";
import "suneditor/dist/css/suneditor.min.css";
import plugins from "suneditor/src/plugins";
import katex from "katex";
import "katex/dist/katex.min.css";
import SunEditor from "suneditor/src/lib/core";
import Layout from "./Layout";
import {
  fetchGetAllExams,
  fetchGetExam,
  fetchPostExam,
  fetchPutQuestion,
} from "../service/exam";
import {
  QUESTION_COUNT_PER_MATH,
  QUESTION_COUNT_PER_READING_AND_WRITING,
  SECTION_TITLES,
} from "../utils/constants";
import { toast } from "react-hot-toast";

export default function Editor() {
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
    onSuccess: () => queryClient.invalidateQueries(["exams"]),
  }).mutate;
  const getExamId = () => {
    const id = exams?.find((e) => e.name === curExamTitle)?.id;
    if (!id)
      throw new Error(`cannot find exam id.\ngiven title:${curExamTitle}`);
    return id;
  };

  const { data: exam } = useQuery(
    ["exam", curExamTitle],
    () => fetchGetExam({ examId: getExamId().toString() }),
    {
      select: ({ data }) => data.data,
      enabled: !!exams && !!curExamTitle,
    }
  );

  const handlePostNewExam = () => {
    mutateExam({ title: newExamTitle });
    toast("시험이 추가되었습니다.");
  };

  const handleSave = async () => {
    if (!editorsRef.current) throw new Error("no editor ref");
    await fetchPutQuestion({
      examId: exam!.id,
      sectionTitle: curSectionTitle!,
      moduleNumber: Number(curModuleNumber)!,
      questionNumber: Number(curQuestionNumber)!,
      body: {
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
      },
    });
    if (
      (correctAnswer === "" || correctAnswer === null) &&
      !confirm("정답을 입력하지 않았습니다. 저장하시겠습니까?")
    ) {
      return;
    } else toast.success("저장완료");
    queryClient.invalidateQueries(["exam"]);
  };

  const getQuestionIndex = () => {
    let index = Number(curQuestionNumber) - 1;
    if (curSectionTitle === SECTION_TITLES[0]) {
      if (curModuleNumber === "1") return index;
      if (curModuleNumber === "2")
        return index + QUESTION_COUNT_PER_READING_AND_WRITING / 2;
      throw new Error("invalid module number");
    }
    index += QUESTION_COUNT_PER_READING_AND_WRITING;
    if (curSectionTitle === SECTION_TITLES[1]) {
      if (curModuleNumber === "1") return index;
      if (curModuleNumber === "2") return index + QUESTION_COUNT_PER_MATH / 2;
      throw new Error("invalid module number");
    }
    throw new Error("invalid section title");
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
      const questions = exam.questions;
      if (Number(curQuestionNumber) > questions.length) return;

      const question = questions[getQuestionIndex()];
      if (question.passage !== null) {
        setHasPassage(true);
        editorsRef.current.passage.setContents(question.passage);
      } else {
        setHasPassage(false);
        editorsRef.current.passage.setContents("");
      }
      if (question.choice_A !== null) {
        setHasChoices(true);
        editorsRef.current.choiceA.setContents(question.choice_A);
        editorsRef.current.choiceB.setContents(question.choice_B!);
        editorsRef.current.choiceC.setContents(question.choice_C!);
        editorsRef.current.choiceD.setContents(question.choice_D!);
      } else {
        setHasChoices(false);
        editorsRef.current.choiceA.setContents("");
        editorsRef.current.choiceB.setContents("");
        editorsRef.current.choiceC.setContents("");
        editorsRef.current.choiceD.setContents("");
      }
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
    <Layout>
      <div>
        <h2>시험 생성</h2>
        <label>
          시험 제목
          <input
            type="text"
            onChange={(e) => setNewExamTitle(e.target.value)}
            className="border-b"
          />
        </label>
        <button onClick={handlePostNewExam} className="border rounded-md">
          시험 추가
        </button>
      </div>
      <hr className="my-3" />
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
              <select
                onChange={(e) => setCurExamTitle(e.target.value)}
                value={curExamTitle ?? "선택해주세요"}
              >
                <option disabled>선택해주세요</option>
                {exams?.map((exam) => (
                  <option key={"examOption" + exam.id}>{exam.name}</option>
                ))}
              </select>
            </td>
            <td>
              <select
                onChange={(e) => setCurSectionTitle(e.target.value)}
                value={curSectionTitle ?? "선택해주세요"}
              >
                <option disabled>선택해주세요</option>
                <option>Reading and Writing</option>
                <option>Math</option>
              </select>
            </td>
            <td>
              <select
                onChange={(e) => setCurModuleNumber(e.target.value)}
                value={curModuleNumber ?? "선택해주세요"}
              >
                <option disabled>선택해주세요</option>
                <option>1</option>
                <option>2</option>
              </select>
            </td>
            <td>
              <select
                onChange={(e) => {
                  console.log(e.target.value);
                  setCurQuestionNumber(e.target.value);
                }}
                value={curQuestionNumber ?? "선택해주세요"}
              >
                <option disabled>선택해주세요</option>
                {exam &&
                  curExamTitle &&
                  curSectionTitle &&
                  curModuleNumber &&
                  Array(
                    curSectionTitle === SECTION_TITLES[0]
                      ? QUESTION_COUNT_PER_READING_AND_WRITING / 2
                      : QUESTION_COUNT_PER_MATH / 2
                  )
                    .fill(0)
                    .map((_, i) => (
                      <option key={"questionOption" + i}>{i + 1}</option>
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
              checked={!hasPassage}
            />
            no passage
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => setHasChoices(!hasChoices)}
              checked={!hasChoices}
            />
            no choices
          </label>
        </div>

        <div className={`${hasPassage ? "sm:flex" : null}`}>
          <div
            className={`${hasPassage ? null : "hidden"} w-[90vw] sm:w-[47vw]`}
          >
            <h2>Passage</h2>
            <textarea id="passage" />
          </div>
          <div
            className={`w-[90vw] ${
              hasPassage ? "sm:w-[47vw]" : null
            } max-w-4xl`}
          >
            <div>
              <h2>Question</h2>
              <textarea id="question" />
            </div>
            {["choiceA", "choiceB", "choiceC", "choiceD"].map((choice) => (
              <div
                key={"editor" + choice}
                className={`${hasChoices ? null : "hidden"}`}
              >
                <h2>{choice}</h2>
                <textarea id={choice} />
              </div>
            ))}
            <h2>Correct Answer</h2>
            <input
              type="text"
              onChange={(e) => setCorrectAnswer(e.target.value)}
              value={correctAnswer}
              className="border px-2"
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
    </Layout>
  );
}
