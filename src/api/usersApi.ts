import type { User, UserStatus } from '../types/user';
import api from './client';

export const getUsers = async () => {
  const { data } = await api.get<User[]>('/users');
  return data;
};

export const deleteUser = async (id: number) => {
  const { data } = await api.delete<{ message: string }>(`/users/${id}`);
  return data;
};

export const updateUserStatus = async (id: number, status: UserStatus) => {
  const { data } = await api.patch<{ message: string }>(
    `/users/${id}/status`,
    { status }
  );
  return data;
};

export const verifyUser = async (id: number) => {
  const { data } = await api.patch<{ message: string }>(`/users/${id}/verify`);
  return data;
};

export const deleteUnverified = async () => {
  const { data } = await api.delete<{ message: string }>('/users/unverified');
  return data;
};
