import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import Modal from '@/components/common/Modal';

export default function WithdrawalConfirmModal({
  onClose,
  onConfirm,
  isSubmitting,
  errorMessage,
}: {
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  isSubmitting: boolean;
  errorMessage?: string;
}) {
  const agreementId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const modalElement = modalRef.current;

    const getFocusableElements = () => {
      if (!modalElement) return [];

      return Array.from(
        modalElement.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      );
    };

    getFocusableElements()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (!isSubmitting) onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements.at(-1);

      if (!firstFocusableElement || !lastFocusableElement) {
        event.preventDefault();
        return;
      }

      const isFocusOutsideModal = !modalElement?.contains(document.activeElement);

      if (
        event.shiftKey &&
        (document.activeElement === firstFocusableElement || isFocusOutsideModal)
      ) {
        event.preventDefault();
        lastFocusableElement.focus();
        return;
      }

      if (
        !event.shiftKey &&
        (document.activeElement === lastFocusableElement || isFocusOutsideModal)
      ) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [isSubmitting, onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-5 py-12"
      onMouseDown={(event) => {
        if (!isSubmitting && event.target === event.currentTarget) onClose();
      }}
    >
      <Modal
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="회원 탈퇴 확인"
        title="정말 탈퇴할까요?"
        onClose={isSubmitting ? undefined : onClose}
        className="max-w-190"
        footer={
          <>
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              취소
            </Button>
            <Button disabled={!isAgreed || isSubmitting} onClick={() => void onConfirm()}>
              {isSubmitting ? '탈퇴 중…' : '탈퇴하기'}
            </Button>
          </>
        }
      >
        <p className="text-body-medium font-medium whitespace-pre-line text-text-secondary">
          {
            '탈퇴하면 프로필 · 저장 목록 · 업로드 파일에 더는 접근할 수 없어요.\n30일 안에 다시 로그인하면 복구할 수 있고, 30일이 지나면 완전히 삭제돼요.'
          }
        </p>
        <Checkbox
          id={agreementId}
          checked={isAgreed}
          onChange={(event) => setIsAgreed(event.target.checked)}
          label="위 내용을 확인했고, 탈퇴에 동의해요."
        />
        {errorMessage && (
          <p className="text-label-small font-medium text-danger-500" role="alert">
            {errorMessage}
          </p>
        )}
      </Modal>
    </div>,
    document.body,
  );
}
