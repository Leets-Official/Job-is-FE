import { useNavigate, useSearchParams } from 'react-router';
import AlertTriangleIcon from '@/assets/icons/icon-alert-triangle.svg?react';
import Button from '@/components/common/Button';

const DEFAULT_MESSAGE = '로그인에 실패했어요. 다시 시도해 주세요.';

export default function LoginFailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const message = searchParams.get('message') ?? DEFAULT_MESSAGE;

  return (
    <div className="flex w-full flex-1 items-center justify-center bg-gray-50 px-3 py-8">
      <div className="flex w-full max-w-190 flex-col items-center gap-5 rounded-md border border-gray-200 bg-white p-6">
        <h1 className="text-heading-xlarge font-bold text-text-primary">Job.is</h1>

        <div className="flex items-center gap-2.5 p-2.5">
          <AlertTriangleIcon className="size-6 shrink-0 text-warning-500" />
          <p className="text-heading-medium font-semibold text-text-primary">
            로그인을 완료하지 못했어요.
          </p>
        </div>

        <p className="text-label-medium font-medium text-text-tertiary">{message}</p>

        <Button className="w-full max-w-104" onClick={() => navigate('/login')}>
          다시 시도
        </Button>
      </div>
    </div>
  );
}
