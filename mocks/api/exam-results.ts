import { rest } from "msw";
import { BACKEND_URL, response } from "./common";
import { examResults } from "../mockDB/exam-results";
import { storage } from "../../src/utils/storage";
import { exams } from "../mockDB/exams";

/** TODO 백엔드 API 수정 완료시 마저 만들기 */
const examResultsApi = [
  rest.get(
    `${BACKEND_URL}/exam-results/users/:userId`,
    async (req, res, ctx) => {
      const { userId } = req.params;

      const allResults = examResults
        .filter((e) => e.user_id === userId)
        .map((e) => ({
          id: e.id,
          user_id: e.user_id,
          exam_id: e.exam_id,
          exam_name: e.exam_name,
        }));

      return res(ctx.json({ ...response(allResults) }));
    }
  ),
  rest.get(`${BACKEND_URL}/exam-results/:resultId`, async (req, res, ctx) => {
    const { resultId } = req.params;

    const result = examResults.find((e) => e.id === Number(resultId));

    return res(ctx.json({ ...response(result) }));
  }),
  rest.post(`${BACKEND_URL}/exam-results`, async (req, res, ctx) => {
    const { answers, exam_id } = (await req.json()) as {
      answers: string[];
      exam_id: number;
    };

    const user_id = storage.get("USER_ID");
    if (!user_id) throw "cannot get user id from storage";

    const exam_result_id = Date.now();
    const exam_name = exams.find((e) => e.id === exam_id)?.name;
    if (!exam_name) throw "cannot find exam name";

    const newExamResults = {
      id: exam_result_id,
      user_id,
      exam_id,
      exam_name,
      question_results: answers.map((answer, i) => ({
        id: i,
        number: i + 1,
        your_answer: answer,
        exam_result_id,
      })),
    };
    examResults.push(newExamResults);
    return res(ctx.status(201));
  }),
];

export default examResultsApi;
