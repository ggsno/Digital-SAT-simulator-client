import { rest } from "msw";
import { users } from "../mockDB/users";
import { response } from "./responseWrapper";

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
];

export default uesrApi;
