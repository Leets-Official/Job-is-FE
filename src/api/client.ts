import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { ENV } from '@/api/env';
import type { ApiEnvelope } from '@/api/types';
import { clearAuth, getAccessToken, setAccessToken } from '@/features/login/store/useAuthStore';

export const client: AxiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 10000,
});

const tokenClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 10000,
});

interface CsrfTokenResponse {
  token: string;
  headerName: string;
}

interface TokenReissueResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

async function getCsrfHeaders() {
  const { data: csrfData } =
    await tokenClient.get<ApiEnvelope<CsrfTokenResponse>>('/api/auth/csrf');
  const { token, headerName } = csrfData.data;

  return { [headerName]: token };
}

export async function postWithCsrf<T>(url: string, withAuthorization = false) {
  const accessToken = withAuthorization ? getAccessToken() : null;
  const { data } = await tokenClient.post<ApiEnvelope<T>>(url, undefined, {
    headers: {
      ...(await getCsrfHeaders()),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  return data.data;
}

async function reissueAccessToken() {
  const reissueData = await postWithCsrf<TokenReissueResponse>('/api/auth/token/reissue');

  return reissueData.accessToken;
}

client.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`);
  }
  return config;
});

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  hasRetriedAfterReissue?: boolean;
}

let isRefreshing = false;
let pendingRequests: Array<(accessToken: string | null) => void> = [];

function resolvePendingRequests(accessToken: string | null) {
  pendingRequests.forEach((resolve) => resolve(accessToken));
  pendingRequests = [];
}

client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetriableRequestConfig | undefined;
    const isReissueRequest = config?.url?.includes('/api/auth/token/reissue');

    if (
      error.response?.status !== 401 ||
      !config ||
      config.hasRetriedAfterReissue ||
      isReissueRequest
    ) {
      return Promise.reject(error);
    }

    config.hasRetriedAfterReissue = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push((accessToken) => {
          if (!accessToken) {
            reject(error);
            return;
          }
          config.headers.set('Authorization', `Bearer ${accessToken}`);
          resolve(client(config));
        });
      });
    }

    isRefreshing = true;

    try {
      const accessToken = await reissueAccessToken();
      setAccessToken(accessToken);
      resolvePendingRequests(accessToken);
      config.headers.set('Authorization', `Bearer ${accessToken}`);
      return await client(config);
    } catch (reissueError) {
      resolvePendingRequests(null);
      clearAuth();
      return Promise.reject(reissueError);
    } finally {
      isRefreshing = false;
    }
  },
);
