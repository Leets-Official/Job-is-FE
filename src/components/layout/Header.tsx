import { Link } from 'react-router';
import Button from '@/components/common/Button';
import { cn } from '@/utils/cn';

type HeaderProps = {
  className?: string;
};

export default function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        'border-b border-gray-200 bg-white/90 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-white/80',
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary-100 text-lg font-semibold text-primary-700">
            J
          </div>
          <div>
            <p className="text-heading-small text-gray-900">Job.is</p>
            <p className="text-label-small text-gray-500">Recruitment experience</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-nav-medium text-gray-700 hover:text-primary-500">
            홈
          </Link>
          <Link to="/playground" className="text-nav-medium text-gray-700 hover:text-primary-500">
            플레이그라운드
          </Link>
          <Link to="/" className="text-nav-medium text-gray-700 hover:text-primary-500">
            채용공고
          </Link>
        </nav>

        <Button variant="outline" className="h-11 px-4 text-sm">
          로그인
        </Button>
      </div>
    </header>
  );
}
