import { rest } from "msw";
import { users } from "../mockDB/users";
import { BACKEND_URL, response } from "./common";
import { UserProps } from "../../src/service/apis/user.type";
import { exams } from "../mockDB/exams";
import { f } from "msw/lib/glossary-de6278a9";

const uesrApi = [
  rest.post(`${BACKEND_URL}/users`, async (req, res, ctx) => {
    const user = (await req.json()) as UserProps;
    users.push({ ...user, exams: null });
    return res(ctx.status(204));
  }),
  rest.get(`${BACKEND_URL}/users`, async (_, res, ctx) => {
    return res(ctx.json({ ...response(users), count: users.length }));
  }),
  rest.get(`${BACKEND_URL}/users/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const user = users.find((e) => e.id === id);
    return res(ctx.json(response(user)));
  }),
  rest.patch(`${BACKEND_URL}/users/allocate`, async (req, res, ctx) => {
    const { user_id, exam_id } = await req.json();

    const userIndex = users.findIndex((user) => user.id === user_id);
    const name = exams.find((e) => e.id === exam_id)?.name as string;

    if (users[userIndex].exams === null)
      users[userIndex].exams = [{ id: exam_id, name }];
    else if (!users[userIndex].exams?.some((e) => e.id === exam_id))
      users[userIndex].exams?.push({ id: exam_id, name });
    return res(ctx.status(204));
  }),
  rest.delete(`${BACKEND_URL}/users/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const index = users.findIndex((e) => e.id === id);
    users.splice(index, 1);
    return res(ctx.status(301));
  }),
];

export default uesrApi;
