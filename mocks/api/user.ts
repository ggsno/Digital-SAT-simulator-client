import { rest } from "msw";
import { users } from "../mockDB/users";
import { response } from "./common";
import { UserProps } from "../../src/service/apis/user.type";

const uesrApi = [
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/:id`,
    async (req, res, ctx) => {
      const { id } = req.params;
      const user = users.find((e) => e.id === id);
      return res(ctx.json(response(user)));
    }
  ),
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/users`,
    async (_, res, ctx) => {
      return res(ctx.json({ ...response(users), count: users.length }));
    }
  ),
  rest.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/users`,
    async (req, res, ctx) => {
      const user = (await req.json()) as UserProps;
      users.push({ ...user, exam_id: null });
      return res(ctx.status(204));
    }
  ),
  rest.patch(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/allocate`,
    async (req, res, ctx) => {
      const { user_id, exam_id } = await req.json();

      const userIndex = users.findIndex((user) => user.id === user_id);
      users[userIndex].exam_id = exam_id;

      return res(ctx.status(204));
    }
  ),
];

export default uesrApi;
