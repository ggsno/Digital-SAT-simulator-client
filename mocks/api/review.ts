import { rest } from "msw";
import { reviews } from "../mockDB/reviews";
import { response } from "./responseWrapper";

const reviewApi = [
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/question-results/:examId`,
    async (req, res, ctx) => {
      const { examId } = req.params;
      const exam = reviews.find((e) => e.exam_id === Number(examId));
      return res(ctx.json(response(exam)));
    }
  ),
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/question-results`,
    async (_, res, ctx) => {
      return res(
        ctx.json({
          ...response(
            reviews.map(({ exam_id, name }) => ({
              exam_id,
              name,
            }))
          ),
          count: reviews.length,
        })
      );
    }
  ),
];

export default reviewApi;
