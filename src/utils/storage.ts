type StorageKey = "ACCESS_TOKEN";

const store = {
  ACCESS_TOKEN: "",
};

export const storage = {
  get: (key: StorageKey) => store[key],
  set: (key: StorageKey, value: string) => (store[key] = value),
  remove: (key: StorageKey) => (store[key] = ""),
};
