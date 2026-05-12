import { create } from "zustand";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { authService, AuthResponse } from "../services/auth";
import { setAuthToken } from "../services/api";

interface AuthState {
  token: string | null;
  user: { id: string; email: string; displayName: string } | null;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  loadToken: () => Promise<void>;
}

const storeToken = async (token: string) => {
  if (Platform.OS === "web") {
    localStorage.setItem("auth_token", token);
  } else {
    await SecureStore.setItemAsync("auth_token", token);
  }
};

const getStoredToken = async (): Promise<string | null> => {
  if (Platform.OS === "web") {
    return localStorage.getItem("auth_token");
  }
  return await SecureStore.getItemAsync("auth_token");
};

const removeStoredToken = async () => {
  if (Platform.OS === "web") {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  } else {
    await SecureStore.deleteItemAsync("auth_token");
    await SecureStore.deleteItemAsync("auth_user");
  }
};

const storeUser = async (user: AuthState["user"]) => {
  if (Platform.OS === "web") {
    localStorage.setItem("auth_user", JSON.stringify(user));
  } else {
    await SecureStore.setItemAsync("auth_user", JSON.stringify(user));
  }
};

const getStoredUser = async (): Promise<AuthState["user"]> => {
  let raw: string | null = null;
  if (Platform.OS === "web") {
    raw = localStorage.getItem("auth_user");
  } else {
    raw = await SecureStore.getItemAsync("auth_user");
  }
  return raw ? JSON.parse(raw) : null;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoading: true,
  error: null,

  loadToken: async () => {
    try {
      const token = await getStoredToken();
      const user = await getStoredUser();
      if (token) {
        setAuthToken(token);
        set({ token, user, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res: AuthResponse = await authService.login(email, password);
      setAuthToken(res.token);
      await storeToken(res.token);
      await storeUser(res.user);
      set({ token: res.token, user: res.user, isLoading: false });
    } catch (err: any) {
      const msg =
        err.response?.data?.message || "Login failed. Please try again.";
      set({ error: msg, isLoading: false });
    }
  },

  register: async (email, password, displayName) => {
    set({ isLoading: true, error: null });
    try {
      const res: AuthResponse = await authService.register(
        email,
        password,
        displayName
      );
      setAuthToken(res.token);
      await storeToken(res.token);
      await storeUser(res.user);
      set({ token: res.token, user: res.user, isLoading: false });
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        "Registration failed. Please try again.";
      set({ error: msg, isLoading: false });
    }
  },

  logout: async () => {
    setAuthToken(null);
    await removeStoredToken();
    set({ token: null, user: null, error: null });
  },
}));
