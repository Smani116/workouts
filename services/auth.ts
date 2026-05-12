import api from "./api";

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    displayName: string;
  };
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    return data;
  },

  register: async (
    email: string,
    password: string,
    displayName: string
  ): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/register", {
      email,
      password,
      displayName,
    });
    return data;
  },
};
