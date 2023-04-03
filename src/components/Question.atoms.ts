import { atom, selector, selectorFamily } from "recoil";

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
  list: { questionId: string; eliminatedIds: string[] }[];
}>({
  key: "OptionEliminator",
  default: {
    isActive: false,
    list: [],
  },
});
