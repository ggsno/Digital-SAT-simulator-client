import { rest } from "msw";

const reviewApi = [
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/question-results/:examId`,
    async (req, res, ctx) => {
      const { examId } = req.params;
      const exam = dummy.reviews.find((e) => e.exam_id === Number(examId));
      return res(ctx.json(response(exam)));
    }
  ),
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/question-results`,
    async (_, res, ctx) => {
      const reviews = dummy.reviews.map((exam) => exam);
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

const response = (data: any) => ({
  result: true,
  message: "OK",
  data: data,
});

const dummy = {
  reviews: [
    {
      exam_id: 1,
      name: "exam01",
      answers: ["B", "A", "B", "", "D", "A", "A", "", "A", "12.3", "99999"],
    },
    {
      exam_id: 2,
      title: "exam02",
      answers: ["B", "A", "B", "12"],
    },
  ],
};
