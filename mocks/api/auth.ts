import { rest } from "msw";
import { users } from "../mockDB/users";
import { response } from "./common";

const authApi = [
  rest.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
    async (req, res, ctx) => {
      const { id, password } = await req.json();
      if (users.some((user) => user.id === id && user.password === password)) {
        return res(ctx.json(response({ access_token: "temp" })));
      } else return res(ctx.status(401));
    }
  ),
];

export default authApi;
