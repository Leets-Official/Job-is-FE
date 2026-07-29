import { useNavigate } from 'react-router';
import Button from '@/components/common/Button';
import ResultIcon from '@/components/feedback/ResultIcon';

const MOCK_REMAINING_DAYS = 12;

function getMockRecoveryDeadline() {
  const recoveryDeadline = new Date();
  recoveryDeadline.setDate(recoveryDeadline.getDate() + MOCK_REMAINING_DAYS);

  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
  }).format(recoveryDeadline);
}

export default function AccountRecoveryPage() {
  const navigate = useNavigate();
  const recoveryDeadline = getMockRecoveryDeadline();

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
          남은 복구 기간 · {MOCK_REMAINING_DAYS}일({recoveryDeadline}까지)
        </div>

        <Button className="w-full max-w-103.75" onClick={() => navigate('/profile')}>
          계정 복구하기
        </Button>
        <Button variant="outline" className="w-full max-w-103.75" onClick={() => navigate('/')}>
          복구하지 않고 나가기
        </Button>
      </section>
    </div>
  );
}
