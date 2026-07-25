import { Link } from 'react-router';
import { Spinner } from '@/components/feedback';

export default function CallbackPage() {
  return (
    <div className="flex w-full flex-1 items-center justify-center bg-gray-50 px-3 py-8">
      <div className="flex w-full max-w-190 flex-col items-center gap-5 rounded-md border border-gray-200 bg-white p-6">
        <h1 className="text-heading-xlarge font-bold text-text-primary">Job.is</h1>
        <Spinner />
        <p className="text-heading-medium font-semibold text-text-primary">로그인하고 있어요...</p>
        <p className="text-label-medium font-medium text-text-tertiary">잠시만요, 거의 다 됐어요</p>
        <Link
          to="/login"
          className="text-label-large font-medium text-text-tertiary underline decoration-solid decoration-from-font [text-underline-position:from-font]"
        >
          취소하고 돌아가기
        </Link>
      </div>
    </div>
  );
}
