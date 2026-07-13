import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
      <p className="text-gray-500">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <Link to="/" className="text-blue-600 underline">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
