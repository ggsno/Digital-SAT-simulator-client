import { rest } from "msw";
import { BACKEND_URL, response } from "./common";
import { examResults } from "../mockDB/exam-results";

/** TODO 백엔드 API 수정 완료시 마저 만들기 */
const examResultsApi = [
  rest.get(`${BACKEND_URL}/exam-results/:userId`, async (req, res, ctx) => {
    const { userId } = req.params;

    return;
  }),
];

export default examResultsApi;
