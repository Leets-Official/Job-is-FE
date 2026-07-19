import { type ComponentPropsWithoutRef } from 'react';
import ArrowLeftIcon from '@/assets/icons/icon-chevron-left.svg?react';
import ArrowRightIcon from '@/assets/icons/icon-chevron-right.svg?react';
import { cn } from '@/utils/cn';

type PaginationProps = ComponentPropsWithoutRef<'nav'> & {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

export default function Pagination({
  className,
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  ...props
}: PaginationProps) {
  return (
    <nav
      aria-label="페이지 네비게이션"
      className={cn(
        'flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-700 sm:flex-row',
        className,
      )}
      {...props}
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentPage <= 1}
        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowLeftIcon className="size-4" /> 이전
      </button>

      <span className="text-body-medium font-medium text-gray-900">
        오늘 도착 · {currentPage}/{totalPages}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        다음 <ArrowRightIcon className="size-4" />
      </button>
    </nav>
  );
}
