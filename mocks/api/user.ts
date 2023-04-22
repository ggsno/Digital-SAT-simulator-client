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
  ],
};
