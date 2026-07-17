import { type ComponentPropsWithRef } from 'react';
import ChevronLeftCircleIcon from '@/assets/icons/icon-chevron-left-circle.svg?react';
import ChevronRightCircleIcon from '@/assets/icons/icon-chevron-right-circle.svg?react';
import { cn } from '@/utils/cn';

interface CarouselArrowProps extends ComponentPropsWithRef<'button'> {
  direction: 'left' | 'right';
}

export default function CarouselArrow({
  className,
  ref,
  direction,
  type = 'button',
  'aria-label': ariaLabel,
  ...props
}: CarouselArrowProps) {
  const Icon = direction === 'left' ? ChevronLeftCircleIcon : ChevronRightCircleIcon;

  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel ?? (direction === 'left' ? '이전' : '다음')}
      className={cn('flex size-16 items-center justify-center text-text-primary', className)}
      {...props}
    >
      <Icon className="size-full" />
    </button>
  );
}
