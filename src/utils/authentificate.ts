import { fetchGetAllUsers } from "../service/user";
import { storage } from "./storage";

export default async function isAuthentificated() {
  try {
    const res = await fetchGetAllUsers();
    return (
      res.data.data.findIndex((e) => e.id === storage.get("USER_ID")) !== -1
    );
  } catch (err) {
    return false;
  }
}
