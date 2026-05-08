import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://keny-backend.onrender.com";

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = Cookies.get("keny_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        Cookies.remove("keny_token");
        // Only redirect if we're not already on the login page
        if (!window.location.pathname.startsWith("/auth/login")) {
          window.location.href = "/auth/login";
        }
      }
    }
    return Promise.reject(error);
  },
);
