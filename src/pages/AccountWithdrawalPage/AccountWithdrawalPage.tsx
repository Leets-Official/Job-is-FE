import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { withdrawAccount, type WithdrawalRequest } from '@/api/auth';
import { clearAuth } from '@/features/login/store/useAuthStore';
import WithdrawalCompleteContent from '@/features/settings/components/WithdrawalCompleteContent';
import WithdrawalReasonForm from '@/features/settings/components/WithdrawalReasonForm';

type WithdrawalStep = 'reason' | 'complete';

export default function AccountWithdrawalPage() {
  const navigate = useNavigate();
  const [withdrawalStep, setWithdrawalStep] = useState<WithdrawalStep>('reason');
  const withdrawalMutation = useMutation({
    mutationFn: withdrawAccount,
    onSuccess: () => {
      clearAuth();
      setWithdrawalStep('complete');
    },
  });

  async function handleWithdrawal(request: WithdrawalRequest) {
    await withdrawalMutation.mutateAsync(request);
  }

  return (
    <div
      className={
        withdrawalStep === 'complete'
          ? 'flex flex-1 items-center justify-center bg-gray-50 px-5 py-12'
          : 'flex flex-1 justify-center bg-gray-50 px-5 py-30'
      }
    >
      {withdrawalStep === 'reason' ? (
        <WithdrawalReasonForm
          onCancel={() => navigate('/settings/account')}
          onComplete={handleWithdrawal}
          isSubmitting={withdrawalMutation.isPending}
          errorMessage={
            withdrawalMutation.isError ? '회원 탈퇴에 실패했어요. 다시 시도해주세요.' : undefined
          }
        />
      ) : (
        <WithdrawalCompleteContent onHome={() => navigate('/')} />
      )}
    </div>
  );
}
