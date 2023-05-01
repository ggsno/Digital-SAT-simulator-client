import axios, { InternalAxiosRequestConfig } from "axios";
import { storage } from "../utils/storage";

export const serverApiInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

export const serverApiInstanceWithAuth = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

serverApiInstanceWithAuth.interceptors.request.use((config) => {
  const token = storage.get("ACCESS_TOKEN");
  if (!token) throw new Error("no access token");
  return {
    ...config,
    headers: { Authorization: `Bearer ${token}` },
  } as InternalAxiosRequestConfig;
});
