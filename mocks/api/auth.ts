import { rest } from "msw";

const authApi = [
  rest.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
    async (req, res, ctx) => {
      const { id, password } = await req.json();
      if (
        dummy.users.some((user) => user.id === id && user.password === password)
      ) {
        return res(ctx.json(dummy.loginResponse));
      } else return res(ctx.status(401));
    }
  ),
];

export default authApi;

const dummy = {
  users: [
    {
      id: "admin",
      password: "admin",
    },
    {
      id: "student01",
      password: "student01",
    },
  ],
  loginResponse: {
    result: true,
    message: "success",
    data: {
      access_token: "temp token access",
      refresh_token: "temp token refresh",
    },
  },
};
