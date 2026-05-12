import axios from "axios";
import { Platform } from "react-native";

// For web, we use relative URLs (same-origin proxy or direct)
// For native, we need the full URL
const BASE_URL =
  Platform.OS === "web" ? "/api" : "http://localhost:5000/api";

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
