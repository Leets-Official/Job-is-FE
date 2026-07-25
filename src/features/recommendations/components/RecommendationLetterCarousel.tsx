import { type ReactNode } from 'react';
import CarouselArrow from '@/components/common/CarouselArrow';
import CarouselIndicator from '@/components/common/CarouselIndicator';
import { cn } from '@/utils/cn';

interface RecommendationLetterCarouselProps {
  current: number;
  total: number;
  onPrev?: () => void;
  onNext?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  footNote?: string;
  filterSlot?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function RecommendationLetterCarousel({
  current,
  total,
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
  footNote = '오늘도 좋은 결과 있길 바랍니다. - Job.is 드림',
  filterSlot,
  children,
  className,
}: RecommendationLetterCarouselProps) {
  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {filterSlot}
      <div className="flex items-center gap-16">
        <CarouselArrow direction="left" onClick={onPrev} disabled={prevDisabled} />
        {children}
        <CarouselArrow direction="right" onClick={onNext} disabled={nextDisabled} />
      </div>
      <div className="flex items-center gap-2">
        <CarouselIndicator variant="number" current={current} total={total} />
        <CarouselIndicator variant="dot" total={total} activeIndex={current - 1} />
      </div>
      {footNote && <p className="text-body-medium font-medium text-text-tertiary">{footNote}</p>}
    </div>
  );
}
