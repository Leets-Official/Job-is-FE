import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { dismissCard, submitDismissReason } from '@/api/decks';
import { recordJobApply, recordJobView, saveJob, toggleApplyIntent } from '@/api/jobs';
import JobDetailApplyInterstitialModal from '@/features/jobs/components/JobDetailApplyInterstitialModal';
import JobDetailMain from '@/features/jobs/components/JobDetailMain';
import JobDetailSidebar from '@/features/jobs/components/JobDetailSidebar';
import JobDetailSkipFeedbackModal from '@/features/jobs/components/JobDetailSkipFeedbackModal';
import { mockJobDetail } from '@/features/jobs/mocks/jobDetailMock';

interface JobDetailLocationState {
  deckId?: number;
  cardId?: number;
}

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { deckId, cardId } = (location.state as JobDetailLocationState | null) ?? {};
  const job = { ...mockJobDetail, id: id ?? mockJobDetail.id };
  const jobId = Number(job.id);
  const [isSkipModalOpen, setIsSkipModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [intendedToApply, setIntendedToApply] = useState(false);

  useEffect(() => {
    recordJobView(jobId).catch(console.error);
  }, [jobId]);

  function handleConfirmApply(intendToApply: boolean) {
    setIntendedToApply(intendToApply);
    window.open(job.source.originalUrl, '_blank', 'noopener,noreferrer');
    setIsApplyModalOpen(false);
    recordJobApply(jobId, intendToApply).catch(console.error);
  }

  function handleIntendToApply() {
    setIntendedToApply((prev) => !prev);
    toggleApplyIntent(jobId).catch(console.error);
  }

  function handleSave() {
    saveJob(jobId).catch(console.error);
  }

  // 오늘의 브리핑 카드에서 들어온 경우에만 deckId/cardId가 있음(navigate state로 전달됨).
  // 탐색 등 다른 경로로 들어온 경우엔 소속된 덱이 없어 서버에 반영할 수 없음
  function handleSkipSubmit(reasons: string[], note: string) {
    setIsSkipModalOpen(false);
    if (!deckId || !cardId) return;

    dismissCard(deckId, cardId)
      .then(() =>
        submitDismissReason(deckId, cardId, {
          reason: reasons.join(',').slice(0, 30) || undefined,
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
                onNotInterested={() => setIsSkipModalOpen(true)}
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
