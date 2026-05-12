import axios from "axios";
import { Platform } from "react-native";

// In development, both web and native need the full backend URL.
// In production (Vercel), we'll use relative /api routes.
const DEV_URL = "http://localhost:5000/api";
const PROD_URL = "/api";

const BASE_URL = __DEV__ ? DEV_URL : PROD_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request
let token: string | null = null;

export const setAuthToken = (t: string | null) => {
  token = t;
};

api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — will handle in auth store
      setAuthToken(null);
    }
    return Promise.reject(error);
  }
);

export default api;
