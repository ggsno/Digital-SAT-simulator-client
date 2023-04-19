import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

export const fetchLogin = (props: AuthLoginRequest) => {
  return instance.post<AuthLoginResponse>("/auth/login", props);
};
