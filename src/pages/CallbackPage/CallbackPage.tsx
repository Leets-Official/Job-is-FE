import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { exchangeOAuthCode } from '@/api/auth';
import LoginCallbackContent from '@/features/login/components/LoginCallbackContent';
import {
  setAccessToken,
  setOnboardingCompleted,
  setUserId,
} from '@/features/login/store/useAuthStore';

const DEFAULT_FAILURE_MESSAGE = '로그인이 취소됐거나 실패했어요. 다시 시도해 주세요.';

function readCallbackParams() {
  const query = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  return {
    code: query.get('code') ?? hash.get('code'),
    error: query.get('error') ?? hash.get('error'),
    restoreCode: query.get('restoreCode') ?? hash.get('restoreCode'),
    restorableUntil: query.get('restorableUntil') ?? hash.get('restorableUntil'),
  };
}

export default function CallbackPage() {
  const navigate = useNavigate();
  const hasRequested = useRef(false);

  useEffect(() => {
    if (hasRequested.current) return;
    hasRequested.current = true;

    const { code, error: errorParam, restoreCode, restorableUntil } = readCallbackParams();

    if (restoreCode && restorableUntil) {
      const searchParams = new URLSearchParams({ restoreCode, restorableUntil });
      navigate(`/account/recovery?${searchParams}`, { replace: true });
      return;
    }

    if (errorParam || !code) {
      navigate(`/login/fail?message=${encodeURIComponent(DEFAULT_FAILURE_MESSAGE)}`, {
        replace: true,
      });
      return;
    }

    exchangeOAuthCode(code)
      .then((result) => {
        setAccessToken(result.accessToken);
        setUserId(result.userId);
        setOnboardingCompleted(result.onboardingCompleted);

        const destination = result.isNewUser
          ? '/policy'
          : result.onboardingCompleted
            ? '/recommendations'
            : '/onboarding';
        navigate(destination, { replace: true });
      })
      .catch(() => {
        navigate(`/login/fail?message=${encodeURIComponent(DEFAULT_FAILURE_MESSAGE)}`, {
          replace: true,
        });
      });
  }, [navigate]);

  return (
    <div className="flex w-full flex-1 items-center justify-center bg-gray-50 px-3 py-8">
      <div className="flex w-full max-w-190 flex-col items-center gap-5 rounded-md border border-gray-200 bg-white p-6">
        <h1 className="text-heading-xlarge font-bold text-text-primary">Job.is</h1>
        <LoginCallbackContent />
      </div>
    </div>
  );
}
