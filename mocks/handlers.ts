import authApi from "./api/auth";
import examApi from "./api/exam";
import userApi from "./api/user";
import reviewApi from "./api/review";

export const handlers = [...examApi, ...authApi, ...userApi, ...reviewApi];
