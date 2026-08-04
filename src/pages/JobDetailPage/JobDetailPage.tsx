import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { dismissCard, submitDismissReason } from '@/api/decks';
import { recordJobApply, recordJobView, saveJob, toggleApplyIntent } from '@/api/jobs';
import { Button, NoticePanel } from '@/components/common';
import { Spinner } from '@/components/feedback';
import JobDetailApplyInterstitialModal from '@/features/jobs/components/JobDetailApplyInterstitialModal';
import JobDetailMain from '@/features/jobs/components/JobDetailMain';
import JobDetailSidebar from '@/features/jobs/components/JobDetailSidebar';
import JobDetailSkipFeedbackModal from '@/features/jobs/components/JobDetailSkipFeedbackModal';
import { useJobDetail } from '@/features/jobs/hooks/useJobDetail';
import { mapJobDetail } from '@/features/jobs/utils/mapJobDetail';

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
  const navigate = useNavigate();
  const { deckId, cardId } = (location.state as JobDetailLocationState | null) ?? {};
  const parsedJobId = Number(id);
  const jobId = Number.isInteger(parsedJobId) && parsedJobId > 0 ? parsedJobId : null;
  const canSubmitDismissReason = deckId !== undefined && cardId !== undefined;
  const [isSkipModalOpen, setIsSkipModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [intendedToApply, setIntendedToApply] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const jobDetailQuery = useJobDetail(jobId);

  useEffect(() => {
    if (jobId === null) return;
    recordJobView(jobId).catch(console.error);
  }, [jobId]);

  function handleConfirmApply(intendToApply: boolean, sourceUrl: string) {
    if (jobId === null) return;
    setIntendedToApply(intendToApply);
    window.open(sourceUrl, '_blank', 'noopener,noreferrer');
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

  if (jobId === null) {
    return (
      <div className="flex min-h-0 w-full flex-1 items-center justify-center bg-gray-50 px-3 py-8">
        <NoticePanel resultIconVariant="warning" title="존재하지 않는 공고예요">
          <Button onClick={() => navigate('/explore')}>탐색으로</Button>
        </NoticePanel>
      </div>
    );
  }

  if (jobDetailQuery.isLoading) {
    return (
      <div className="flex min-h-0 w-full flex-1 items-center justify-center bg-gray-50 px-3 py-8">
        <Spinner />
      </div>
    );
  }

  if (jobDetailQuery.isError || !jobDetailQuery.data) {
    return (
      <div className="flex min-h-0 w-full flex-1 items-center justify-center bg-gray-50 px-3 py-8">
        <NoticePanel resultIconVariant="danger" title="공고 정보를 불러오지 못했어요">
          <Button onClick={() => jobDetailQuery.refetch()}>다시 시도</Button>
        </NoticePanel>
      </div>
    );
  }

  const job = mapJobDetail(jobDetailQuery.data);

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
          onConfirm={(intendToApply) => handleConfirmApply(intendToApply, job.source.originalUrl)}
        />
      )}
    </div>
  );
}
