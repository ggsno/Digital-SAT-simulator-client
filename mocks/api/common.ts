export const response = (data: any) => ({
  result: true,
  message: "OK",
  data,
});

export const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;
