import { type ComponentPropsWithoutRef } from 'react';
import ArrowLeftIcon from '@/assets/icons/icon-chevron-left-circle.svg?react';
import ArrowRightIcon from '@/assets/icons/icon-chevron-right-circle.svg?react';
import { cn } from '@/utils/cn';

type PaginationProps = ComponentPropsWithoutRef<'nav'> & {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  label?: string;
};

export default function Pagination({
  className,
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  label,
  ...props
}: PaginationProps) {
  return (
    <nav
      aria-label="페이지 네비게이션"
      className={cn('flex items-center justify-center gap-3 text-sm text-gray-700', className)}
      {...props}
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentPage <= 1}
        className="flex h-10 w-[110px] min-w-0 items-center justify-center gap-1 py-0 pr-2 pl-1 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowLeftIcon className="size-4" /> 이전
      </button>

      <span className="flex w-[110px] min-w-0 items-center justify-center gap-4 text-body-medium font-medium text-gray-900">
        {label ?? `오늘 도착 · ${currentPage}/${totalPages}`}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="flex h-10 w-[110px] min-w-0 items-center justify-center gap-1 py-0 pr-2 pl-1 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        다음 <ArrowRightIcon className="size-4" />
      </button>
    </nav>
  );
}
