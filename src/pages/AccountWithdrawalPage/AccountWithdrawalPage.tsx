import { useNavigate } from 'react-router';
import WithdrawalReasonForm from '@/features/settings/components/WithdrawalReasonForm';

export default function AccountWithdrawalPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 justify-center bg-gray-50 px-5 py-30">
      <WithdrawalReasonForm
        onCancel={() => navigate('/settings/account')}
        onComplete={() => navigate('/settings/account/withdraw/complete')}
      />
    </div>
  );
}
