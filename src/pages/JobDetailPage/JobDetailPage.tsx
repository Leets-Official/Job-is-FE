import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { dismissCard, submitDismissReason } from '@/api/decks';
import { recordJobApply, recordJobView, saveJob, toggleApplyIntent } from '@/api/jobs';
import JobDetailApplyInterstitialModal from '@/features/jobs/components/JobDetailApplyInterstitialModal';
import JobDetailMain from '@/features/jobs/components/JobDetailMain';
import JobDetailSidebar from '@/features/jobs/components/JobDetailSidebar';
import JobDetailSkipFeedbackModal from '@/features/jobs/components/JobDetailSkipFeedbackModal';
import { mockJobDetail } from '@/features/jobs/mocks/jobDetailMock';

const DISMISS_REASON_MAX_LENGTH = 30;

interface JobDetailLocationState {
  deckId?: number;
  cardId?: number;
}

function buildDismissReason(reasons: string[]): string | undefined {
  let combined = '';
  for (const reason of reasons) {
    const next = combined ? `${combined},${reason}` : reason;
    if (next.length > DISMISS_REASON_MAX_LENGTH) break;
    combined = next;
  }
  return combined || undefined;
}

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { deckId, cardId } = (location.state as JobDetailLocationState | null) ?? {};
  const job = { ...mockJobDetail, id: id ?? mockJobDetail.id };
  const parsedJobId = Number(job.id);
  const jobId = Number.isFinite(parsedJobId) ? parsedJobId : null;
  const canSubmitDismissReason = deckId !== undefined && cardId !== undefined;
  const [isSkipModalOpen, setIsSkipModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [intendedToApply, setIntendedToApply] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (jobId === null) return;
    recordJobView(jobId).catch(console.error);
  }, [jobId]);

  function handleConfirmApply(intendToApply: boolean) {
    if (jobId === null) return;
    setIntendedToApply(intendToApply);
    window.open(job.source.originalUrl, '_blank', 'noopener,noreferrer');
    setIsApplyModalOpen(false);
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
    saveJob(jobId)
      .then(() => setIsSaved(true))
      .catch(console.error);
  }

  // 오늘의 브리핑 카드에서 들어온 경우에만 deckId/cardId가 있음(navigate state로 전달됨).
  // 탐색 등 다른 경로로 들어온 경우엔 소속된 덱이 없어 서버에 반영할 수 없어 버튼 자체를 비활성화한다
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

  return (
    <div className="flex min-h-0 w-full flex-1 justify-center bg-gray-50 px-3 py-8">
      <div className="flex w-full max-w-300 flex-col gap-4">
        <div className="flex w-full flex-col items-start gap-6 lg:flex-row">
          <div className="min-w-0 w-full flex-1">
            <JobDetailMain job={job} backTo="/recommendations" backLabel="오늘의 추천으로" />
          </div>
          <div className="w-full lg:w-90 lg:shrink-0">
            <div className="lg:sticky lg:top-24">
              <JobDetailSidebar
                job={job}
                onApply={() => setIsApplyModalOpen(true)}
                onIntendToApply={handleIntendToApply}
                onSave={handleSave}
                isSaved={isSaved}
                onNotInterested={
                  canSubmitDismissReason ? () => setIsSkipModalOpen(true) : undefined
                }
                isIntendedToApply={intendedToApply}
              />
            </div>
          </div>
        </div>
      </div>
      {isSkipModalOpen && (
        <JobDetailSkipFeedbackModal
          onClose={() => setIsSkipModalOpen(false)}
          onSubmit={handleSkipSubmit}
        />
      )}
      {isApplyModalOpen && (
        <JobDetailApplyInterstitialModal
          sourceName={job.source.siteName}
          onClose={() => setIsApplyModalOpen(false)}
          onConfirm={handleConfirmApply}
        />
      )}
    </div>
  );
}
