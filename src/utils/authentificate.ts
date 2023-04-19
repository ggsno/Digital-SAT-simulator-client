import { storage } from "./storage";

export default function isAuthentificated() {
  return storage.get("ACCESS_TOKEN") ? true : false;
}
