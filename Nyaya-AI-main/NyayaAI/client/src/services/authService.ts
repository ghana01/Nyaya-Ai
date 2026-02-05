import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'citizen' | 'lawyer' | 'admin';
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: 'citizen' | 'lawyer';
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Token management
export const getToken = (): string | null => {
  return localStorage.getItem('nyayaai_token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('nyayaai_token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('nyayaai_token');
  localStorage.removeItem('nyayaai_user');
};

export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem('nyayaai_user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

export const setStoredUser = (user: User): void => {
  localStorage.setItem('nyayaai_user', JSON.stringify(user));
};

// Axios instance with auth header
const authAxios = axios.create({
  baseURL: API_URL,
});

authAxios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API calls
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  if (response.data.success) {
    setToken(response.data.data.token);
    setStoredUser(response.data.data.user);
  }
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  if (response.data.success) {
    setToken(response.data.data.token);
    setStoredUser(response.data.data.user);
  }
  return response.data;
};

export const getMe = async (): Promise<{ success: boolean; data: { user: User } }> => {
  const response = await authAxios.get('/auth/me');
  if (response.data.success) {
    setStoredUser(response.data.data.user);
  }
  return response.data;
};

export const updateProfile = async (data: { name?: string; phone?: string }) => {
  const response = await authAxios.put('/auth/profile', data);
  if (response.data.success) {
    setStoredUser(response.data.data.user);
  }
  return response.data;
};

export const changePassword = async (data: { currentPassword: string; newPassword: string }) => {
  const response = await authAxios.put('/auth/password', data);
  if (response.data.success && response.data.data.token) {
    setToken(response.data.data.token);
  }
  return response.data;
};

export const logout = (): void => {
  removeToken();
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Role display names
export const roleDisplayNames: Record<string, string> = {
  citizen: 'Citizen',
  lawyer: 'Legal Professional',
  admin: 'Administrator',
};
