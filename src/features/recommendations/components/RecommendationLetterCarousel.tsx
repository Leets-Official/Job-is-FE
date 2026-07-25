import { type ReactNode, useEffect, useRef, useState } from 'react';
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
  contentKey?: string | number;
  enableStackTransition?: boolean;
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
  contentKey = current,
  enableStackTransition = false,
  className,
}: RecommendationLetterCarouselProps) {
  const [activeContent, setActiveContent] = useState({ key: contentKey, node: children });
  const activeContentRef = useRef(activeContent);
  const previousCurrentRef = useRef(current);
  const [leavingContent, setLeavingContent] = useState<ReactNode>();
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!enableStackTransition) return;
    if (activeContentRef.current.key === contentKey) return;

    const nextContent = { key: contentKey, node: children };
    const direction = current >= previousCurrentRef.current ? 'forward' : 'backward';
    previousCurrentRef.current = current;
    let transitionTimer: number | undefined;
    const animationFrame = window.requestAnimationFrame(() => {
      setTransitionDirection(direction);
      setLeavingContent(activeContentRef.current.node);
      activeContentRef.current = nextContent;
      setActiveContent(nextContent);
      transitionTimer = window.setTimeout(() => {
        setLeavingContent(undefined);
        setIsAnimating(false);
      }, 440);
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      if (transitionTimer) window.clearTimeout(transitionTimer);
    };
  }, [children, contentKey, current, enableStackTransition]);

  const handlePrev = () => {
    if (isAnimating || prevDisabled) return;

    if (enableStackTransition) setIsAnimating(true);
    onPrev?.();
  };

  const handleNext = () => {
    if (isAnimating || nextDisabled) return;

    if (enableStackTransition) setIsAnimating(true);
    onNext?.();
  };

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {filterSlot}
      <div className="flex items-center gap-16">
        <CarouselArrow
          direction="left"
          onClick={handlePrev}
          disabled={prevDisabled || isAnimating}
        />
        {enableStackTransition ? (
          <div className="relative flex min-h-[524px] w-196 items-center overflow-x-clip">
            {leavingContent && (
              <div className="pointer-events-none absolute top-1/2 left-0 z-10 w-full -translate-y-1/2">
                <div
                  className={cn(
                    transitionDirection === 'forward'
                      ? 'recommendation-card-exit-left'
                      : 'recommendation-card-exit-right',
                  )}
                >
                  {leavingContent}
                </div>
              </div>
            )}
            <div
              key={activeContent.key}
              className={cn(
                'relative z-20 w-full',
                leavingContent &&
                  (transitionDirection === 'forward'
                    ? 'recommendation-card-enter-from-right'
                    : 'recommendation-card-enter-from-left'),
              )}
            >
              {activeContent.node}
            </div>
          </div>
        ) : (
          children
        )}
        <CarouselArrow
          direction="right"
          onClick={handleNext}
          disabled={nextDisabled || isAnimating}
        />
      </div>
      <div className="flex items-center gap-2">
        <CarouselIndicator variant="number" current={current} total={total} />
        <CarouselIndicator variant="dot" total={total} activeIndex={current - 1} />
      </div>
      <p
        aria-hidden={!footNote}
        className="min-h-6 text-body-medium font-medium text-text-tertiary"
      >
        {footNote}
      </p>
    </div>
  );
}
