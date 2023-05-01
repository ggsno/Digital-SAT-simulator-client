import { atom } from "recoil";

export const examState = atom<{
  id: number;
  title: string;
  sections: {
    title: string;
    modules: {
      questions: {
        passage: string | null;
        question: string;
        choices: string[] | null;
      }[];
    }[];
  }[];
} | null>({
  key: "Exam",
  default: null,
});
