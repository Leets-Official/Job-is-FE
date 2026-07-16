import { Link } from 'react-router';
import { cn } from '@/utils/cn';

type FooterProps = {
  className?: string;
};

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn('border-t border-gray-200 bg-gray-50 px-6 py-8 text-gray-600', className)}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-heading-xsmall text-gray-900">Job.is</p>
          <p className="mt-2 max-w-xl text-body-medium leading-7 text-gray-600">
            채용 과정과 사용자 경험을 더 자연스럽게 연결하는 서비스입니다.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <Link to="/" className="text-gray-700 hover:text-primary-500">
            회사소개
          </Link>
          <Link to="/" className="text-gray-700 hover:text-primary-500">
            이용약관
          </Link>
          <Link to="/" className="text-gray-700 hover:text-primary-500">
            개인정보처리방침
          </Link>
        </div>
      </div>
    </footer>
  );
}
