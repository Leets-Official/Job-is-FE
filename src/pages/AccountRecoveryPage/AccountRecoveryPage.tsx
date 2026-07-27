import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { recoverAccount } from '@/api/accountRecovery';
import Button from '@/components/common/Button';
import ResultIcon from '@/components/feedback/ResultIcon';
import {
  type AccountRecoveryLocationState,
  formatRecoveryDeadline,
  getRemainingRecoveryDays,
  RECOVERY_TOKEN_STORAGE_KEY,
} from '@/features/login/accountRecovery';

const MOCK_RECOVERY_DAYS = 12;

function createMockRecoveryDeadline() {
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + MOCK_RECOVERY_DAYS);

  return deadline.toISOString();
}

export default function AccountRecoveryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state as AccountRecoveryLocationState | null;
  const recoveryDeadline = locationState?.recoveryDeadline ?? createMockRecoveryDeadline();
  const storedRecoveryToken = sessionStorage.getItem(RECOVERY_TOKEN_STORAGE_KEY);
  const recoveryToken = storedRecoveryToken ?? 'mock-recovery-token';
  const remainingDays = getRemainingRecoveryDays(recoveryDeadline);
  const formattedDeadline = formatRecoveryDeadline(recoveryDeadline);
  const [isRecovering, setIsRecovering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const restoreAccount = async () => {
    setIsRecovering(true);
    setErrorMessage('');

    try {
      await recoverAccount(recoveryToken);
      sessionStorage.removeItem(RECOVERY_TOKEN_STORAGE_KEY);
      navigate('/profile', { replace: true });
    } catch {
      setErrorMessage('계정을 복구하지 못했어요. 잠시 후 다시 시도해 주세요.');
      setIsRecovering(false);
    }
  };

  const leaveWithoutRecovery = () => {
    sessionStorage.removeItem(RECOVERY_TOKEN_STORAGE_KEY);
    navigate('/', { replace: true });
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50 px-5 py-12">
      <section className="flex min-h-74 w-full max-w-190 flex-col items-center gap-5 overflow-hidden rounded-md border border-gray-200 bg-white p-6">
        <ResultIcon variant="loading" />

        <h1 className="text-heading-medium font-semibold text-text-primary">다시 오셨네요.</h1>

        <p className="text-center text-label-medium font-medium whitespace-pre-line text-text-secondary">
          {
            '탈퇴를 신청한 계정이에요.\n지금 복구하면 프로필과 저장 목록을 그대로 이어서 쓸 수 있어요.'
          }
        </p>

        <div className="flex min-h-17.5 w-full max-w-103.75 items-center justify-center rounded-xs border border-dashed border-gray-400 bg-gray-200 p-6 text-label-medium font-medium text-text-tertiary">
          남은 복구 기간 · {remainingDays}일({formattedDeadline}까지)
        </div>

        {errorMessage && (
          <p role="alert" className="text-center text-label-medium font-medium text-danger-500">
            {errorMessage}
          </p>
        )}

        <Button
          className="w-full max-w-103.75"
          disabled={isRecovering || remainingDays === 0}
          onClick={restoreAccount}
        >
          {isRecovering ? '복구하고 있어요...' : '계정 복구하기'}
        </Button>
        <Button
          variant="outline"
          className="w-full max-w-103.75"
          disabled={isRecovering}
          onClick={leaveWithoutRecovery}
        >
          복구하지 않고 나가기
        </Button>
      </section>
    </div>
  );
}
