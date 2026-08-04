import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import type { HistoryFilter } from '@/api/history';
import { Button, NoticePanel } from '@/components/common';
import Tab from '@/components/common/Tab';
import { Spinner } from '@/components/feedback';
import SavedJobsHistoryContent from '@/features/savedJobs/components/SavedJobsHistoryContent';
import SavedJobsSavedContent from '@/features/savedJobs/components/SavedJobsSavedContent';
import { useJobHistory } from '@/features/savedJobs/hooks/useJobHistory';
import { useSavedJobs } from '@/features/savedJobs/hooks/useSavedJobs';
import type { SavedJobHistoryStatus } from '@/features/savedJobs/types/savedJob';
import { mapHistoryItem } from '@/features/savedJobs/utils/mapHistoryItem';
import { mapSavedJob } from '@/features/savedJobs/utils/mapSavedJob';

const LIST_TABS = [
  { label: '저장', value: 'saved' },
  { label: '열람 • 피드백 내역', value: 'history' },
] as const;

type SavedJobsTab = (typeof LIST_TABS)[number]['value'];

const HISTORY_FILTER_TO_API: Record<SavedJobHistoryStatus | 'all', HistoryFilter> = {
  all: 'ALL',
  viewed: 'VIEWED',
  skipped: 'SKIPPED',
  intended: 'APPLY_INTENT',
};

interface SavedJobsListProps {
  isEmptyPreview?: boolean;
}

export default function SavedJobsList({ isEmptyPreview = false }: SavedJobsListProps) {
  const [activeTab, setActiveTab] = useState<SavedJobsTab>('saved');
  const [activeFilter, setActiveFilter] = useState<SavedJobHistoryStatus | 'all'>('all');
  const navigate = useNavigate();

  const savedJobsQuery = useSavedJobs({ page: 1, sort: 'SAVED_DESC' });
  const historyQuery = useJobHistory(HISTORY_FILTER_TO_API[activeFilter]);

  const savedJobs = isEmptyPreview
    ? []
    : (savedJobsQuery.data?.saves.content ?? []).map(mapSavedJob);
  const totalSaved = isEmptyPreview ? 0 : (savedJobsQuery.data?.totalSaved ?? 0);
  const totalApplyIntent = isEmptyPreview ? 0 : (savedJobsQuery.data?.totalApplyIntent ?? 0);

  const historyItems = useMemo(() => {
    const items = historyQuery.data?.pages.flatMap((page) => page.content) ?? [];
    return items
      .map(mapHistoryItem)
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [historyQuery.data]);

  const handleBrowseRecommendations = () => navigate('/recommendations');
  const handleExplore = () => navigate('/explore');

  return (
    <div className="flex min-h-225 w-full flex-1 justify-center bg-gray-50 px-3 py-12.5">
      <div className="flex w-full max-w-300 flex-col items-start gap-5">
        <p className="text-heading-medium font-bold text-text-primary">저장 목록</p>
        {savedJobs.length > 0 && (
          <p className="text-label-medium font-medium text-text-secondary">
            저장 {totalSaved}건 · 지원 의향 {totalApplyIntent}건
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
            !isEmptyPreview && savedJobsQuery.isLoading ? (
              <div className="flex w-full items-center justify-center py-20">
                <Spinner />
              </div>
            ) : !isEmptyPreview && savedJobsQuery.isError ? (
              <NoticePanel resultIconVariant="danger" title="저장 목록을 불러오지 못했어요">
                <Button onClick={() => savedJobsQuery.refetch()}>다시 시도</Button>
              </NoticePanel>
            ) : (
              <SavedJobsSavedContent
                jobs={savedJobs}
                onBrowseRecommendations={handleBrowseRecommendations}
                onExplore={handleExplore}
              />
            )
          ) : historyQuery.isLoading ? (
            <div className="flex w-full items-center justify-center py-20">
              <Spinner />
            </div>
          ) : historyQuery.isError ? (
            <NoticePanel resultIconVariant="danger" title="내역을 불러오지 못했어요">
              <Button onClick={() => historyQuery.refetch()}>다시 시도</Button>
            </NoticePanel>
          ) : (
            <SavedJobsHistoryContent
              history={historyItems}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              onBrowseRecommendations={handleBrowseRecommendations}
              onExplore={handleExplore}
              onLoadMore={historyQuery.hasNextPage ? () => historyQuery.fetchNextPage() : undefined}
            />
          )}
        </div>
      </div>
    </div>
  );
}
