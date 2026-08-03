import ArrowRightIcon from '@/assets/icons/icon-arrow-right.svg?react';
import { Button } from '@/components/common';
import { cn } from '@/utils/cn';

interface JobDetailApplyPanelProps {
  onApply?: () => void;
  onIntendToApply?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
  onNotInterested?: () => void;
  isIntendedToApply?: boolean;
}

export default function JobDetailApplyPanel({
  onApply,
  onIntendToApply,
  onSave,
  isSaved,
  onNotInterested,
  isIntendedToApply,
}: JobDetailApplyPanelProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Button className="w-full" onClick={onApply} disabled={!onApply}>
        지원하기
        <ArrowRightIcon className="size-5" />
      </Button>
      <div className="flex w-full gap-2">
        <Button
          variant="outline"
          className={cn(
            'w-[110px] shrink-0',
            isIntendedToApply && 'border-transparent bg-primary-400 hover:bg-primary-400',
          )}
          onClick={onIntendToApply}
        >
          지원 의향
        </Button>
        <Button
          variant="outline"
          className={cn(
            'w-[110px] shrink-0',
            isSaved && 'border-transparent bg-primary-400 hover:bg-primary-400',
          )}
          onClick={onSave}
        >
          저장
        </Button>
        <Button
          className="w-[110px] shrink-0 bg-gray-400 hover:bg-gray-400 active:bg-gray-400"
          onClick={onNotInterested}
          disabled={!onNotInterested}
        >
          관심없음
        </Button>
      </div>
    </div>
  );
}
