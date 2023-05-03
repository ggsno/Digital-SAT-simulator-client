import { atom } from "recoil";

export const loadingState = atom<boolean>({
  key: "Loading",
  default: false,
});
