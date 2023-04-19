import { atom } from "recoil";

type User = {
  id: string;
  name: string;
  isTeacher: boolean;
  examId: number;
};

export const userState = atom<User | null>({
  key: "User",
  default: null,
});
