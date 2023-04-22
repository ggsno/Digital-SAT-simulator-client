import authApi from "./api/auth";
import examApi from "./api/exam";
import userApi from "./api/user";

export const handlers = [...examApi, ...authApi, ...userApi];
