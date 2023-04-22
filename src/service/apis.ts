import axios, { InternalAxiosRequestConfig } from "axios";
import { storage } from "../utils/storage";
import {
  AuthLoginRequest,
  AuthLoginResponse,
  ExamResponse,
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

export const fetchGetExam = ({ examId }: { examId: number }) => {
  return instanceWithAuth.get<ExamResponse>(`/exams/${examId}`);
};
