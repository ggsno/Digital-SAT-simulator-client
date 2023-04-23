import { rest } from "msw";

const examApi = [
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/:id`,
    async (req, res, ctx) => {
      const { id } = req.params;
      const user = dummy.users.find((e) => e.id === id);
      return res(ctx.json(response(user)));
    }
  ),
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/users`,
    async (_, res, ctx) => {
      return res(
        ctx.json({ ...response(dummy.users), count: dummy.users.length })
      );
    }
  ),
];

export default examApi;

const response = (data: any) => ({
  result: true,
  message: "OK",
  data: data,
});

const dummy = {
  users: [
    {
      id: "admin",
      password: "admin",
      name: "관리자",
      phone: "010-1234-5678",
      is_teacher: true,
      exam_id: null,
    },
    {
      id: "student01",
      password: "student01",
      name: "Gildong Hong",
      phone: "010-1234-5678",
      is_teacher: false,
      exam_id: 1,
    },
    {
      id: "student02",
      password: "student02",
      name: "김기덕",
      phone: "010-1234-5678",
      is_teacher: false,
      exam_id: 2,
    },
    {
      id: "student03",
      password: "student03",
      name: "이창동",
      phone: "010-1234-5678",
      is_teacher: false,
      exam_id: 1,
    },
  ],
};
