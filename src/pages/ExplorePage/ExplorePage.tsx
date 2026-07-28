import { useEffect, useState } from 'react';
import Pagination from '@/components/common/Pagination';
import ExploreEmptyResults from '@/features/jobs/components/ExploreEmptyResults';
import ExploreFilters from '@/features/jobs/components/ExploreFilters';
import ExploreJobGrid from '@/features/jobs/components/ExploreJobGrid';
import ExploreJobGridSkeleton from '@/features/jobs/components/ExploreJobGridSkeleton';
import ExploreLoadingIndicator from '@/features/jobs/components/ExploreLoadingIndicator';
import ExploreResultsToolbar, {
  type ExploreActiveFilter,
} from '@/features/jobs/components/ExploreResultsToolbar';
import { JOB_ROLE_KEYWORDS, JOB_ROLE_OPTIONS } from '@/features/jobs/constants/exploreFilters';
import { mockExploreJobs } from '@/features/jobs/mocks/exploreJobsMock';

const TOTAL_RESULT_COUNT = 128;
const TOTAL_PAGES = 3;
const SEARCH_LOADING_DELAY_MS = 700;

export default function ExplorePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJobRoles, setSelectedJobRoles] = useState<string[]>([]);
  const [isRemoteSelected, setIsRemoteSelected] = useState(false);
  const [isAlwaysOpenSelected, setIsAlwaysOpenSelected] = useState(true);
  const filterKey = JSON.stringify([selectedJobRoles, isRemoteSelected, isAlwaysOpenSelected]);
  const [previousFilterKey, setPreviousFilterKey] = useState(filterKey);
  const [isSearching, setIsSearching] = useState(true);

  if (filterKey !== previousFilterKey) {
    setPreviousFilterKey(filterKey);
    setIsSearching(true);
  }

  useEffect(() => {
    if (!isSearching) return;
    const timer = setTimeout(() => setIsSearching(false), SEARCH_LOADING_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isSearching]);

  const toggleJobRole = (value: string) => {
    setSelectedJobRoles((prev) =>
      prev.includes(value) ? prev.filter((role) => role !== value) : [...prev, value],
    );
  };

  const activeFilters: ExploreActiveFilter[] = [
    ...JOB_ROLE_OPTIONS.filter((option) => selectedJobRoles.includes(option.value)).map(
      (option) => ({
        key: option.value,
        label: option.label,
        onRemove: () => toggleJobRole(option.value),
      }),
    ),
    ...(isRemoteSelected
      ? [
          {
            key: 'remote',
            label: '원격',
            onRemove: () => setIsRemoteSelected(false),
          },
        ]
      : []),
    ...(isAlwaysOpenSelected
      ? [
          {
            key: 'always-open',
            label: '상시포함',
            onRemove: () => setIsAlwaysOpenSelected(false),
          },
        ]
      : []),
  ];

  const visibleJobs =
    selectedJobRoles.length === 0
      ? mockExploreJobs
      : mockExploreJobs.filter((job) =>
          selectedJobRoles.some((role) => job.title.includes(JOB_ROLE_KEYWORDS[role])),
        );

  const hasResults = visibleJobs.length > 0;
  const resultCount = selectedJobRoles.length === 0 ? TOTAL_RESULT_COUNT : visibleJobs.length;

  const resetFilters = () => {
    setSelectedJobRoles([]);
    setIsRemoteSelected(false);
    setIsAlwaysOpenSelected(false);
  };

  return (
    <div className="flex min-h-0 w-full flex-1 justify-center bg-gray-50 px-3 py-8">
      <div className="flex w-full max-w-300 flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-heading-large font-bold text-text-primary">탐색</h1>
          <p className="text-body-medium font-medium text-text-secondary">
            추천이 메인, 탐색은 직접 찾고 싶을 때의 보조 동선
          </p>
        </div>
        <ExploreFilters
          selectedJobRoles={selectedJobRoles}
          onToggleJobRole={toggleJobRole}
          isRemoteSelected={isRemoteSelected}
          onToggleRemote={() => setIsRemoteSelected((prev) => !prev)}
          isAlwaysOpenSelected={isAlwaysOpenSelected}
          onToggleAlwaysOpen={() => setIsAlwaysOpenSelected((prev) => !prev)}
        />
        <ExploreResultsToolbar
          resultCount={resultCount}
          activeFilters={activeFilters}
          onReset={resetFilters}
          isLoading={isSearching}
        />
        {isSearching ? (
          <>
            <ExploreJobGridSkeleton />
            <ExploreLoadingIndicator />
          </>
        ) : hasResults ? (
          <>
            <ExploreJobGrid jobs={visibleJobs} />
            <Pagination
              currentPage={currentPage}
              totalPages={TOTAL_PAGES}
              label={`${currentPage}/${TOTAL_PAGES}`}
              onPrevious={() => setCurrentPage((page) => Math.max(1, page - 1))}
              onNext={() => setCurrentPage((page) => Math.min(TOTAL_PAGES, page + 1))}
            />
          </>
        ) : (
          <ExploreEmptyResults activeFilters={activeFilters} onResetFilters={resetFilters} />
        )}
      </div>
    </div>
  );
}
