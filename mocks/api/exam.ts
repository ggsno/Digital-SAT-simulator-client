import { rest } from "msw";
import { exams } from "../mockDB/exams";
import { BACKEND_URL, response } from "./common";

const examApi = [
  rest.post(`${BACKEND_URL}/exams`, async (req, res, ctx) => {
    const { name } = (await req.json()) as { name: string };
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
  }),
  rest.get(`${BACKEND_URL}/exams`, async (_, res, ctx) => {
    const result = exams.map((exam) => ({
      id: exam.id,
      name: exam.name,
    }));
    return res(ctx.json({ ...response(result), count: result.length }));
  }),
  rest.get(`${BACKEND_URL}/exams/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const exam = exams.find((e) => e.id === Number(id));
    return res(ctx.json(response(exam)));
  }),
  rest.delete(`${BACKEND_URL}/exams/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const index = exams.findIndex((e) => e.id === Number(id));
    exams.splice(index, 1);
    return res(ctx.status(301));
  }),
  rest.put(
    `${BACKEND_URL}/exam/:examId/:sectionTitle/:moduleNumber/:questionNumber`,
    async (req, res, ctx) => {
      const { examId, sectionTitle, moduleNumber, questionNumber } = req.params;
      const body = await req.json();

      const examIndex = exams.findIndex(({ id }) => id === Number(examId));
      if (examIndex === -1) return res(ctx.status(404));

      const questionIndex = exams[examIndex].questions.findIndex(
        (e) =>
          e.module === Number(moduleNumber) &&
          e.section.toLowerCase() === (sectionTitle as string).toLowerCase() &&
          e.number === Number(questionNumber)
      );
      if (questionIndex === -1) return res(ctx.status(404));

      const question = {
        ...body,
        id: Date.now(),
        section: sectionTitle,
        module: Number(moduleNumber),
        exam_id: Number(examId),
        number: Number(questionNumber),
      };

      exams[examIndex].questions[questionIndex] = question;

      return res(ctx.status(201));
    }
  ),
];

export default examApi;
