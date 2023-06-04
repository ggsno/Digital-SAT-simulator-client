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

export const timerState = atom<number | null>({
  key: "Timer",
  default: null,
});
