import { atom, selectorFamily } from "recoil";

export const markReviewListState = atom<{ ids: string[] }>({
  key: "MarkReviewList",
  default: {
    ids: [],
  },
});

export const isMarkedReviewSelector = selectorFamily({
  key: "IsMarkedReviewSelector",
  get:
    (id: string) =>
    ({ get }) => {
      return get(markReviewListState).ids.includes(id);
    },
});

export const optionEliminatorState = atom<{
  isActive: boolean;
  list: { [questionId: string]: number[] } | null;
}>({
  key: "OptionEliminator",
  default: {
    isActive: false,
    list: null,
  },
});

export const isCalulatorOpenedState = atom({
  key: "IsCalculatorOpened",
  default: false,
});
