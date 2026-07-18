import { useState } from 'react';
import { Link } from 'react-router';
import Button from '@/components/common/Button';
import { cn } from '@/utils/cn';

type HeaderProps = {
  className?: string;
};

export default function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { to: '/', label: '홈' },
    { to: '/playground', label: '플레이그라운드' },
    { to: '/jobs', label: '채용공고' },
  ];

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
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-nav-medium text-gray-700 hover:text-primary-500"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-11 px-4 text-sm md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? '닫기' : '메뉴'}
          </Button>
          <Button variant="outline" className="hidden h-11 px-4 text-sm md:inline-flex">
            로그인
          </Button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={cn('mx-auto max-w-7xl px-6 pb-4 md:hidden', isMenuOpen ? 'block' : 'hidden')}
      >
        <nav className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
          <ul className="flex flex-col gap-1">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="block rounded-xl px-3 py-2 text-nav-medium text-gray-700 transition hover:bg-gray-50 hover:text-primary-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
