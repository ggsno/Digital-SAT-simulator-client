import { rest } from "msw";
import { exams } from "../mockDB/exams";
import { response } from "./responseWrapper";

const examApi = [
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/exams/:id`,
    async (req, res, ctx) => {
      const { id } = req.params;
      const exam = exams.find((e) => e.id === Number(id));
      return res(ctx.json(response(exam)));
    }
  ),
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/exams`,
    async (_, res, ctx) => {
      const result = exams.map((exam) => ({
        id: exam.id,
        name: exam.name,
      }));
      return res(ctx.json({ ...response(result), count: result.length }));
    }
  ),
  rest.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/exams`,
    async (req, res, ctx) => {
      const { name } = await req.json();
      const newId = exams.length + 1;

      const initiateQuestion = (
        exam_id: number,
        length: number,
        section: string,
        module: number
      ) =>
        Array(length)
          .fill(0)
          .map((_, i) => ({
            id: i,
            section,
            module,
            number: i + 1,
            exam_id,
            passage: null,
            content: "",
            choice_A: null,
            choice_B: null,
            choice_C: null,
            choice_D: null,
            correct_answer: "",
          }));

      exams.push({
        id: newId,
        name,
        questions: [
          ...initiateQuestion(newId, 27, "Reading And Writing", 1),
          ...initiateQuestion(newId, 27, "Reading And Writing", 2),
          ...initiateQuestion(newId, 22, "Math", 1),
          ...initiateQuestion(newId, 22, "Math", 2),
        ],
      });
      return res(ctx.status(201));
    }
  ),
  rest.put(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/api/exams/:examId/:sectionTitle/:moduleNumber/:questionNumber`,
    async (req, res, ctx) => {
      const { examId, sectionTitle, moduleNumber, questionNumber } = req.params;
      const sectionNumber = sectionTitle === "Reading and Writing" ? 0 : 1;
      const { data } = await req.json();

      const examIndex = exams.findIndex(({ id }) => id === Number(examId));
      if (examIndex === -1) return res(ctx.status(404));

      const questionIndex = exams[Number(examId)].questions.findIndex(
        (e) =>
          e.module === Number(moduleNumber) &&
          e.section === sectionTitle &&
          e.number === Number(questionNumber)
      );
      if (questionIndex === -1) return res(ctx.status(404));

      const question = {
        ...data,
        id: Date.now(),
        section: sectionTitle,
        module: moduleNumber,
        exam_id: examId,
      };

      exams[examIndex].questions[questionIndex] = question;

      return res(ctx.status(201));
    }
  ),
];

export default examApi;
