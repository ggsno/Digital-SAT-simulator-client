import { atom, selectorFamily } from "recoil";

export const forReviewState = atom<{ indexList: number[] }>({
  key: "ForReviewList",
  default: {
    indexList: [],
  },
});

export const isMarkedReviewSelector = selectorFamily({
  key: "IsMarkedReviewSelector",
  get:
    (index: number) =>
    ({ get }) => {
      return get(forReviewState).indexList.includes(index);
    },
});

export const optionEliminatorState = atom<{
  isActive: boolean;
  eliminatedOptionsList: number[][];
}>({
  key: "OptionEliminator",
  default: {
    isActive: false,
    eliminatedOptionsList: [],
  },
});

export const isCalulatorOpenedState = atom({
  key: "IsCalculatorOpened",
  default: false,
});

export const examState = atom<{
  id: string;
  title: string;
  module: {
    passage?: string;
    question: string;
    choices?: string[];
  }[];
} | null>({
  key: "Exam",
  default: null,
});

export const questionIndexState = atom({
  key: "QuestionIndex",
  default: 0,
});

export const answerState = atom<(string | null)[]>({
  key: "Answer",
  default: [],
});
