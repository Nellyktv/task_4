import type { AuthUser } from '../types/auth';

export function saveAuth(token: string, user: AuthUser, rememberMe: boolean) {
  const storage = rememberMe ? localStorage : sessionStorage;
  clearAuth();
  storage.setItem('token', token);
  storage.setItem('user', JSON.stringify(user));
}

export function getToken() {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem('user') || sessionStorage.getItem('user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
}
