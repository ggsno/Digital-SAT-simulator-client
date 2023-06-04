import authApi from "./api/auth";
import examApi from "./api/exam";
import userApi from "./api/user";
import examResultsApi from "./api/exam-results";

export const handlers = [...examApi, ...authApi, ...userApi, ...examResultsApi];
