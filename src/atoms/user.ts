import { atom } from "recoil";

type UserProps = {
  id: string;
  name: string;
  isTeacher: boolean;
};

export const userState = atom<UserProps | null>({
  key: "User",
  default: null,
});
