import { type ComponentPropsWithRef } from 'react';
import SunIcon from '@/assets/icons/icon-sun.svg?react';
import Button from '@/components/common/Button';
import { cn } from '@/utils/cn';

interface RecommendationGreetingProps extends ComponentPropsWithRef<'section'> {
  reviewedCount: number;
  matchedCount: number;
  focusDescription: string;
  onStart?: () => void;
}

export default function RecommendationGreeting({
  className,
  ref,
  reviewedCount,
  matchedCount,
  focusDescription,
  onStart,
  ...props
}: RecommendationGreetingProps) {
  return (
    <section
      ref={ref}
      className={cn('flex flex-col items-center gap-6 text-center', className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-3">
        <p className="flex items-center gap-1 text-heading-medium font-semibold text-text-secondary">
          <SunIcon className="size-5" />
          좋은 아침 입니다
        </p>
        <p className="text-heading-medium font-semibold text-text-secondary">
          오늘 들어온 공고 {reviewedCount}건을 검토했습니다.
        </p>
        <h1 className="text-display-medium font-bold leading-[1.2] text-text-primary">
          당신에게 맞는 단{' '}
          <span className="underline [text-underline-position:from-font]">{matchedCount}건</span>만
          추렸습니다.
        </h1>
        <p className="text-heading-medium font-semibold text-text-secondary">{focusDescription}</p>
      </div>
      <Button className="w-45" onClick={onStart}>
        바로 보기
      </Button>
    </section>
  );
}
