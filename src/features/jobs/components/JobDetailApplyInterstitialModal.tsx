import { useState } from 'react';
import ArrowRightIcon from '@/assets/icons/icon-arrow-right.svg?react';
import { Button, ModalCheckbox } from '@/components/common';

interface JobDetailApplyInterstitialModalProps {
  sourceName: string;
  onClose: () => void;
  onConfirm: (dontShowAgain: boolean) => void;
}

export default function JobDetailApplyInterstitialModal({
  sourceName,
  onClose,
  onConfirm,
}: JobDetailApplyInterstitialModalProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black-alpha-40 px-4"
      onClick={onClose}
    >
      <div onClick={(event) => event.stopPropagation()}>
        <ModalCheckbox
          title={`원문(${sourceName})에서 지원해요`}
          description="Job.is 웹은 원문 페이지로 이동해요. 지원 진행 결과는 원문에서 확인하세요."
          checkboxLabel="다시 안 보기"
          checked={dontShowAgain}
          onChange={(event) => setDontShowAgain(event.target.checked)}
          onClose={onClose}
          className="w-full max-w-100"
          footer={
            <>
              <Button variant="outline" onClick={onClose}>
                취소
              </Button>
              <Button onClick={() => onConfirm(dontShowAgain)}>
                {sourceName}에서 보기
                <ArrowRightIcon className="size-5" />
              </Button>
            </>
          }
        />
      </div>
    </div>
  );
}
