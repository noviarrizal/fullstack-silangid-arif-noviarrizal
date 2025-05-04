import { AxiosError } from "axios";
import { api } from "./utils";

export const responseInterceptors = async () => {
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // Optionally unwrap error response too
      return Promise.reject(
        error.response?.data || { message: error.message || "Unknown error" }
      );
    }
  );
};

export const requestInterceptors = () => {
  api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};
