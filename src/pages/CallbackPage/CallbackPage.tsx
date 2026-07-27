import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { RECOVERY_TOKEN_STORAGE_KEY } from '@/features/login/accountRecovery';
import LoginCallbackContent from '@/features/login/components/LoginCallbackContent';

export default function CallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('status') !== 'withdrawal_pending') return;

    const recoveryDeadline = searchParams.get('recoveryDeadline');
    const recoveryToken = searchParams.get('recoveryToken');

    if (!recoveryDeadline || !recoveryToken) {
      navigate('/login/fail?message=계정 복구 정보를 확인할 수 없어요.', { replace: true });
      return;
    }

    sessionStorage.setItem(RECOVERY_TOKEN_STORAGE_KEY, recoveryToken);
    navigate('/account/recovery', {
      replace: true,
      state: { recoveryDeadline },
    });
  }, [navigate, searchParams]);

  return (
    <div className="flex w-full flex-1 items-center justify-center bg-gray-50 px-3 py-8">
      <div className="flex w-full max-w-190 flex-col items-center gap-5 rounded-md border border-gray-200 bg-white p-6">
        <h1 className="text-heading-xlarge font-bold text-text-primary">Job.is</h1>
        <LoginCallbackContent />
      </div>
    </div>
  );
}
