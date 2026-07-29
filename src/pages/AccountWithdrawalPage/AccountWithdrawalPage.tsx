import { useState } from 'react';
import { useNavigate } from 'react-router';
import WithdrawalCompleteContent from '@/features/settings/components/WithdrawalCompleteContent';
import WithdrawalReasonForm from '@/features/settings/components/WithdrawalReasonForm';

type WithdrawalStep = 'reason' | 'complete';

export default function AccountWithdrawalPage() {
  const navigate = useNavigate();
  const [withdrawalStep, setWithdrawalStep] = useState<WithdrawalStep>('reason');

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
          onComplete={() => setWithdrawalStep('complete')}
        />
      ) : (
        <WithdrawalCompleteContent onHome={() => navigate('/')} />
      )}
    </div>
  );
}
