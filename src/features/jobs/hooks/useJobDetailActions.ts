import { useState } from 'react';
import { recordJobApply, toggleApplyIntent } from '@/api/jobs';
import { dismissCard, submitDismissReason } from '@/api/recommendations';
import { useSaveJob } from '@/features/jobs/hooks/useSaveJob';

const DISMISS_REASON_MAX_LENGTH = 30;

function buildDismissReason(reasons: string[]): string | undefined {
  let combined = '';
  for (const reason of reasons) {
    const next = combined ? `${combined},${reason}` : reason;
    if (next.length > DISMISS_REASON_MAX_LENGTH) break;
    combined = next;
  }
  return combined || undefined;
}

interface UseJobDetailActionsOptions {
  jobId: number | null;
  deckId?: number;
  cardId?: number;
}

export default function useJobDetailActions({ jobId, deckId, cardId }: UseJobDetailActionsOptions) {
  const [isSkipModalOpen, setIsSkipModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [intendedToApply, setIntendedToApply] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { save } = useSaveJob();

  const canSubmitDismissReason = deckId !== undefined && cardId !== undefined;

  function handleConfirmApply(intendToApply: boolean, sourceUrl: string) {
    if (jobId === null) return;
    setIsApplyModalOpen(false);

    let isValidSourceUrl = false;
    try {
      isValidSourceUrl = new URL(sourceUrl).protocol === 'https:';
    } catch {
      isValidSourceUrl = false;
    }

    if (!isValidSourceUrl) {
      console.error(`유효하지 않은 원문 링크입니다: ${sourceUrl}`);
      return;
    }

    setIntendedToApply(intendToApply);
    window.open(sourceUrl, '_blank', 'noopener,noreferrer');
    recordJobApply(jobId, intendToApply).catch(console.error);
  }

  function handleIntendToApply() {
    if (jobId === null) return;
    const previous = intendedToApply;
    setIntendedToApply((prev) => !prev);
    toggleApplyIntent(jobId)
      .then((result) => setIntendedToApply(result.applyIntent))
      .catch((error) => {
        setIntendedToApply(previous);
        console.error(error);
      });
  }

  function handleSave() {
    if (jobId === null) return;
    save(jobId)
      .then(() => setIsSaved(true))
      .catch(console.error);
  }

  // 오늘의 브리핑 카드에서 들어온 경우에만 deckId/cardId가 있음(navigate state로 전달됨).
  // 탐색 등 다른 경로로 들어온 경우엔 소속된 덱이 없어 서버에 반영할 수 없음
  function handleSkipSubmit(reasons: string[], note: string) {
    setIsSkipModalOpen(false);
    if (!canSubmitDismissReason) return;

    dismissCard(deckId, cardId)
      .then(() =>
        submitDismissReason(deckId, cardId, {
          reason: buildDismissReason(reasons),
          comment: note || undefined,
        }),
      )
      .catch(console.error);
  }

  return {
    isSkipModalOpen,
    setIsSkipModalOpen,
    isApplyModalOpen,
    setIsApplyModalOpen,
    intendedToApply,
    isSaved,
    handleConfirmApply,
    handleIntendToApply,
    handleSave,
    handleSkipSubmit,
  };
}
