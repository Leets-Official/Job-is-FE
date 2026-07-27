import { useState } from 'react';
import Pagination from '@/components/common/Pagination';
import ExploreFilters from '@/features/jobs/components/ExploreFilters';
import ExploreJobGrid from '@/features/jobs/components/ExploreJobGrid';
import ExploreResultsToolbar from '@/features/jobs/components/ExploreResultsToolbar';
import { mockExploreJobs } from '@/features/jobs/mocks/exploreJobsMock';

const TOTAL_RESULT_COUNT = 128;
const TOTAL_PAGES = 3;

export default function ExplorePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAlwaysOpenFilterActive, setIsAlwaysOpenFilterActive] = useState(true);

  return (
    <div className="flex min-h-0 w-full flex-1 justify-center bg-gray-50 px-3 py-8">
      <div className="flex w-full max-w-300 flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-heading-large font-bold text-text-primary">탐색</h1>
          <p className="text-body-medium font-medium text-text-secondary">
            추천이 메인, 탐색은 직접 찾고 싶을 때의 보조 동선
          </p>
        </div>
        <ExploreFilters />
        <ExploreResultsToolbar
          resultCount={TOTAL_RESULT_COUNT}
          activeFilterLabel={isAlwaysOpenFilterActive ? '상시포함' : undefined}
          onRemoveActiveFilter={() => setIsAlwaysOpenFilterActive(false)}
          onReset={() => setIsAlwaysOpenFilterActive(false)}
        />
        <ExploreJobGrid jobs={mockExploreJobs} />
        <Pagination
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          label={`${currentPage}/${TOTAL_PAGES}`}
          onPrevious={() => setCurrentPage((page) => Math.max(1, page - 1))}
          onNext={() => setCurrentPage((page) => Math.min(TOTAL_PAGES, page + 1))}
        />
      </div>
    </div>
  );
}
