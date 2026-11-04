import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost/api',
  headers: { Accept: 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('aluna_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const saveSession = (token: string) => localStorage.setItem('aluna_token', token);
export const clearSession = () => localStorage.removeItem('aluna_token');
