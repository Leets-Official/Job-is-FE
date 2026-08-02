import { client, postWithCsrf } from '@/api/client';
import { ENV } from '@/api/env';
import type { ApiEnvelope } from '@/api/types';

export type OAuthProvider = 'google' | 'kakao';

export interface OAuthExchangeResponse {
  accessToken: string;
  userId: number;
  isNewUser: boolean;
  onboardingCompleted: boolean;
}

export interface CurrentSessionResponse {
  userId: number;
  email: string;
  socialType: 'GOOGLE' | 'KAKAO';
  status: 'ACTIVE' | 'DORMANT' | 'WITHDRAWN';
  onboardingCompleted: boolean;
  restorableUntil: string | null;
}

export interface ConsentRequest {
  termsAgreed: boolean;
  privacyAgreed: boolean;
  ageOver14Agreed: boolean;
  marketingAgreed?: boolean;
}

export type WithdrawalReasonCode =
  | 'RECOMMENDATION_MISMATCH'
  | 'EMAIL_TOO_FREQUENT'
  | 'NOT_JOB_SEEKING'
  | 'SERVICE_NOT_USED'
  | 'OTHER';

export interface WithdrawalRequest {
  reasonCode?: WithdrawalReasonCode;
  reasonDetail?: string;
}

export interface WithdrawalResponse {
  restorableUntil: string;
}

interface RestoreRequest {
  restoreCode: string;
}

export function getOAuthAuthorizeUrl(provider: OAuthProvider) {
  return `${ENV.API_BASE_URL}/api/auth/oauth/${provider}`;
}

export async function exchangeOAuthCode(loginCode: string) {
  const { data } = await client.post<ApiEnvelope<OAuthExchangeResponse>>(
    '/api/auth/oauth/exchange',
    {
      loginCode,
    },
  );
  return data.data;
}

export async function getCurrentSession() {
  const { data } = await client.get<ApiEnvelope<CurrentSessionResponse>>('/api/auth/me');
  return data.data;
}

export async function logout() {
  return postWithCsrf<string>('/api/auth/logout', true);
}

export async function restoreAccount(request: RestoreRequest) {
  const { data } = await client.post<ApiEnvelope<OAuthExchangeResponse>>(
    '/api/auth/restore',
    request,
  );
  return data.data;
}

export async function withdrawAccount(request: WithdrawalRequest) {
  const { data } = await client.delete<ApiEnvelope<WithdrawalResponse>>('/api/auth/withdraw', {
    data: request,
  });
  return data.data;
}

export async function postConsent(consent: ConsentRequest) {
  await client.post('/api/auth/consent', consent);
}
