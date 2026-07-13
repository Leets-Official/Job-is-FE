import axios, { type AxiosInstance } from 'axios';
import { ENV } from '@/api/env';

export const client: AxiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 10000,
});
