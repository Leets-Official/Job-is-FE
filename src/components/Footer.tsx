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
          <p className="mt-2 text-body-medium leading-7 text-gray-600">
            Job.is 매일 아침 3분, 맞춤 취업 뉴스레터
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
          <Link to="/about" className="hover:text-primary-500">
            서비스소개
          </Link>
          <Link to="/terms" className="hover:text-primary-500">
            이용약관
          </Link>
          <Link to="/privacy" className="hover:text-primary-500">
            개인정보처리방침
          </Link>
          <Link to="/contact" className="hover:text-primary-500">
            문의하기
          </Link>
          <span className="text-gray-500">© 2026 Job.is All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
