import { useState } from 'react';
import { Button, Modal, TextInput } from '@/components/common';
import Chip from '@/components/common/Chip';

const SKIP_REASONS = ['직무 불일치', '지역', '이미 지원함'];

interface JobDetailSkipFeedbackModalProps {
  onClose: () => void;
  onSubmit: (reason: string | null, note: string) => void;
}

export default function JobDetailSkipFeedbackModal({
  onClose,
  onSubmit,
}: JobDetailSkipFeedbackModalProps) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [note, setNote] = useState('');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black-alpha-40 px-4"
      onClick={onClose}
    >
      <Modal
        title="왜 관심이 없으신가요?"
        onClose={onClose}
        className="w-full max-w-100"
        onClick={(event) => event.stopPropagation()}
        footer={
          <>
            <Button variant="outline" onClick={onClose}>
              닫기
            </Button>
            <Button onClick={() => onSubmit(selectedReason, note)}>사유보내기</Button>
          </>
        }
      >
        <div className="flex w-full flex-wrap gap-2">
          {SKIP_REASONS.map((reason) => (
            <Chip
              key={reason}
              label={reason}
              selected={selectedReason === reason}
              onClick={() => setSelectedReason(reason)}
            />
          ))}
        </div>
        <TextInput
          label="기타 (선택)"
          placeholder="내용을 입력해주세요"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          className="w-full"
        />
      </Modal>
    </div>
  );
}
