import { useState } from 'react';
import { useParams } from 'react-router';
import JobDetailApplyInterstitialModal from '@/features/jobs/components/JobDetailApplyInterstitialModal';
import JobDetailMain from '@/features/jobs/components/JobDetailMain';
import JobDetailSidebar from '@/features/jobs/components/JobDetailSidebar';
import JobDetailSkipFeedbackModal from '@/features/jobs/components/JobDetailSkipFeedbackModal';
import { mockJobDetail } from '@/features/jobs/mocks/jobDetailMock';

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const job = { ...mockJobDetail, id: id ?? mockJobDetail.id };
  const [isSkipModalOpen, setIsSkipModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  function handleConfirmApply() {
    window.open(job.source.originalUrl, '_blank', 'noopener,noreferrer');
    setIsApplyModalOpen(false);
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
                onNotInterested={() => setIsSkipModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>
      {isSkipModalOpen && (
        <JobDetailSkipFeedbackModal
          onClose={() => setIsSkipModalOpen(false)}
          onSubmit={() => setIsSkipModalOpen(false)}
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
