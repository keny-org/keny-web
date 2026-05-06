import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://keny-backend.onrender.com";

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("keny_token="))
      ?.split("=")[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
