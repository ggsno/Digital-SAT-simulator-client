import { rest } from "msw";

const matchApi = [
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/match/pool`,
    (_req, res, ctx) => {
      return res(ctx.json(dummy.poolRes));
    }
  ),
  rest.post(
    `${import.meta.env.VITE_BACKEND_URL}/match/pool`,
    async (req, res, ctx) => {
      dummy.userRes.state = "ON_GOING";
      dummy.userRes = {
        ...dummy.userRes,
        ...(await req.json().then((data) => data)),
      };
      return res(ctx.status(200));
    }
  ),
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/match/user`,
    (_req, res, ctx) => {
      return res(ctx.json(dummy.userRes));
    }
  ),
  rest.post(
    `${import.meta.env.VITE_BACKEND_URL}/match/break`,
    (_req, res, ctx) => {
      dummy.userRes.state = "BLOCKED";
      return res(ctx.status(200));
    }
  ),
];

export default matchApi;

const dummy = {
  poolRes: { major: 0, college: 2, all: 99 },
  userRes: {
    state: "NOT_REGISTER",
    grade: "2",
    studentNumber: "18",
    gender: "MALE",
    purpose: "GET_JUNIOR",
    targetGender: "ALL",
    gradeLimit: 2,
    studentNumberLimit: 99,
    targetBoundary: "major",
    phoneNumber: "01012341234",
    kakaoId: "asdf1234",
    unblockTime: new Date(),
  },
};
