import axios, { InternalAxiosRequestConfig } from "axios";
import { storage } from "../utils/storage";
import {
  AllExamResponse,
  AllReviewResponse,
  AllUsersResponse,
  AuthLoginRequest,
  AuthLoginResponse,
  ExamResponse,
  ReviewResponse,
  UserResponse,
} from "./types";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

export const fetchLogin = (props: AuthLoginRequest) => {
  return instance.post<AuthLoginResponse>("/auth/login", props);
};

const instanceWithAuth = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

instanceWithAuth.interceptors.request.use((config) => {
  const token = storage.get("ACCESS_TOKEN");
  if (!token) throw new Error("no access token");
  return {
    ...config,
    headers: { Authorization: `Bearer ${token}` },
  } as InternalAxiosRequestConfig;
});

export const fetchGetUser = ({ id }: { id: string }) => {
  return instanceWithAuth.get<UserResponse>(`/users/${id}`);
};

export const fetchGetAllUsers = () => {
  return instanceWithAuth.get<AllUsersResponse>(`/users`);
};

export const fetchGetExam = ({ examId }: { examId: number }) => {
  return instanceWithAuth.get<ExamResponse>(`/exams/${examId}`);
};

export const fetchGetAllExams = () => {
  return instanceWithAuth.get<AllExamResponse>(`/exams`);
};

export const fetchPostExam = (props: { name: string }) => {
  return instanceWithAuth.post(`/exams`, props);
};

export const fetchGetReview = ({ examId }: { examId: string }) => {
  return instanceWithAuth.get<ReviewResponse>(`/question-results/${examId}`);
};

export const fetchGetAllReviews = () => {
  return instanceWithAuth.get<AllReviewResponse>(`/question-results`);
};
