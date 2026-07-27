import ArrowRightIcon from '@/assets/icons/icon-arrow-right.svg?react';
import { Button } from '@/components/common';

interface JobDetailApplyPanelProps {
  onApply?: () => void;
  onIntendToApply?: () => void;
  onSave?: () => void;
  onNotInterested?: () => void;
}

export default function JobDetailApplyPanel({
  onApply,
  onIntendToApply,
  onSave,
  onNotInterested,
}: JobDetailApplyPanelProps) {
  const secondaryActions = [
    { label: '지원 의향', onClick: onIntendToApply },
    { label: '저장', onClick: onSave },
    { label: '관심없음', onClick: onNotInterested },
  ];

  return (
    <div className="flex w-full flex-col gap-2">
      <Button className="w-full" onClick={onApply} disabled={!onApply}>
        지원하기
        <ArrowRightIcon className="size-5" />
      </Button>
      <div className="flex w-full gap-2">
        {secondaryActions.map(({ label, onClick }) => (
          <Button
            key={label}
            variant="outline"
            className="flex-1 px-2"
            onClick={onClick}
            disabled={!onClick}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
