import authApi from "./api/auth";
import examApi from "./api/exam";

export const handlers = [...examApi, ...authApi];
