import { useState } from 'react';
import { useNavigate } from 'react-router';
import Tab from '@/components/common/Tab';
import SavedJobsHistoryContent from '@/features/savedJobs/SavedJobsHistoryContent';
import {
  SAVED_JOB_HISTORY,
  SAVED_JOBS,
  type SavedJobHistoryStatus,
} from '@/features/savedJobs/savedJobsMock';
import SavedJobsSavedContent from '@/features/savedJobs/SavedJobsSavedContent';

const LIST_TABS = [
  { label: '저장', value: 'saved' },
  { label: '열람 • 피드백 내역', value: 'history' },
] as const;

type SavedJobsTab = (typeof LIST_TABS)[number]['value'];

export default function SavedJobsList() {
  const [activeTab, setActiveTab] = useState<SavedJobsTab>('saved');
  const [activeFilter, setActiveFilter] = useState<SavedJobHistoryStatus | 'all'>('all');
  const navigate = useNavigate();
  const handleBrowseRecommendations = () => navigate('/recommendations');
  const handleExplore = () => navigate('/explore');

  return (
    <div className="flex min-h-225 w-full flex-1 justify-center bg-gray-50 px-3 py-12.5">
      <div className="flex w-full max-w-300 flex-col items-start gap-5">
        <p className="text-heading-medium font-bold text-text-primary">저장 목록</p>
        {SAVED_JOBS.length > 0 && (
          <p className="text-label-medium font-medium text-text-secondary">
            저장 12건 · 지원 의향 3건
          </p>
        )}

        <div className="flex items-center gap-2.5">
          {LIST_TABS.map((tab) => (
            <Tab
              key={tab.value}
              variant="underline"
              label={tab.label}
              active={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
            />
          ))}
        </div>

        <div key={activeTab} className="saved-jobs-tab-content-enter flex w-full flex-col gap-5">
          {activeTab === 'saved' ? (
            <SavedJobsSavedContent
              jobs={SAVED_JOBS}
              onBrowseRecommendations={handleBrowseRecommendations}
              onExplore={handleExplore}
            />
          ) : (
            <SavedJobsHistoryContent
              history={SAVED_JOB_HISTORY}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              onBrowseRecommendations={handleBrowseRecommendations}
              onExplore={handleExplore}
            />
          )}
        </div>
      </div>
    </div>
  );
}
