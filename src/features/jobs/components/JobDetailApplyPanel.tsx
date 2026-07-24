import ArrowRightIcon from '@/assets/icons/icon-arrow-right.svg?react';
import { Button } from '@/components/common';

interface JobDetailApplyPanelProps {
  onApply?: () => void;
  onIntendToApply?: () => void;
  onSave?: () => void;
}

export default function JobDetailApplyPanel({
  onApply,
  onIntendToApply,
  onSave,
}: JobDetailApplyPanelProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Button className="w-full" onClick={onApply}>
        지원하기
        <ArrowRightIcon className="size-5" />
      </Button>
      <div className="flex w-full gap-2">
        <Button variant="outline" className="flex-1 px-2" onClick={onIntendToApply}>
          지원 의향
        </Button>
        <Button variant="outline" className="flex-1 px-2" onClick={onSave}>
          저장
        </Button>
        <Button variant="outline" className="flex-1 px-2" disabled>
          관심없음
        </Button>
      </div>
    </div>
  );
}
