type StorageKey = "ACCESS_TOKEN" | "USER_ID";

const store = localStorage;

export const storage = {
  get: (key: StorageKey) => store.getItem(key),
  set: (key: StorageKey, value: string) => store.setItem(key, value),
  remove: (key: StorageKey) => store.removeItem(key),
};
