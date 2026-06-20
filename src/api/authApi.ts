import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from '../types/auth';
import api from './client';

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post<LoginResponse>('/auth/login', {
    email: payload.email,
    password: payload.password,
  });
  return data;
};

export const register = async (payload: RegisterPayload) => {
  const { data } = await api.post<{ message: string }>('/auth/register', payload);
  return data;
};

export const verifyEmail = async (token: string) => {
  const { data } = await api.get<{ message: string }>(`/auth/verify/${token}`);
  return data;
};
