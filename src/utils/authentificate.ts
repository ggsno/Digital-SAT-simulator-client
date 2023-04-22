import { storage } from "./storage";

export default function isAuthentificated() {
  return storage.get("ACCESS_TOKEN") && storage.get("USER_ID") ? true : false;
}
