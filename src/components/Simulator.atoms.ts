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

export const moduleState = atom<{
  title: string;
  questions: {
    passage: string | null;
    question: string;
    choices: string[] | null;
  }[];
} | null>({
  key: "Module",
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

export const timerState = atom<number | null>({
  key: "Timer",
  default: null,
});

export type Annotate = {
  id: string;
  selectedText: string;
  comment: string;
};

export const annotateListState = atom<Annotate[]>({
  key: "AnnotateList",
  default: [],
});

export const annotateRefState = atom<HTMLDivElement | null>({
  key: "AnnotateRef",
  default: null,
});

export const annotateCurrentState = atom<Annotate | null>({
  key: "annotateCurrent",
  default: null,
});
