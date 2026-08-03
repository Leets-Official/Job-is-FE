import { useState } from 'react';
import type { JobRegionName } from '@/api/jobs';
import Pagination from '@/components/common/Pagination';
import ExploreEmptyResults from '@/features/jobs/components/ExploreEmptyResults';
import ExploreFilters from '@/features/jobs/components/ExploreFilters';
import ExploreJobGrid from '@/features/jobs/components/ExploreJobGrid';
import ExploreJobGridSkeleton from '@/features/jobs/components/ExploreJobGridSkeleton';
import ExploreLoadingIndicator from '@/features/jobs/components/ExploreLoadingIndicator';
import ExploreResultsToolbar, {
  type ExploreActiveFilter,
} from '@/features/jobs/components/ExploreResultsToolbar';
import { useExploreJobs } from '@/features/jobs/hooks/useExploreJobs';
import {
  useEmploymentTypes,
  useJobCategories,
  useRegions,
} from '@/features/jobs/hooks/useJobFilterOptions';
import { mapJobSummary } from '@/features/jobs/utils/mapJobSummary';

const PAGE_SIZE = 24;

export default function ExplorePage() {
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [selectedJobRoles, setSelectedJobRoles] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedEmploymentType, setSelectedEmploymentType] = useState('');
  const [isRemoteSelected, setIsRemoteSelected] = useState(false);

  const categoriesQuery = useJobCategories();
  const regionsQuery = useRegions();
  const employmentTypesQuery = useEmploymentTypes();
  const categoryOptions = (categoriesQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.name,
  }));
  const regionOptions = (regionsQuery.data ?? []).map((region) => ({
    label: region.name,
    value: region.name,
  }));
  const employmentTypeOptions = employmentTypesQuery.data ?? [];

  const jobsQuery = useExploreJobs({
    keyword: keyword || undefined,
    categoryChild: selectedJobRoles[0],
    regions: selectedRegion ? [selectedRegion as JobRegionName] : undefined,
    page,
    size: PAGE_SIZE,
  });

  const toggleJobRole = (value: string) => {
    setPage(0);
    setSelectedJobRoles((prev) =>
      prev.includes(value) ? prev.filter((role) => role !== value) : [...prev, value],
    );
  };

  const handleSearchSubmit = (value: string) => {
    setPage(0);
    setKeyword(value);
  };

  const handleRegionChange = (value: string) => {
    setPage(0);
    setSelectedRegion(value);
  };

  const handleEmploymentTypeChange = (value: string) => {
    setPage(0);
    setSelectedEmploymentType(value);
  };

  const toggleRemote = () => setIsRemoteSelected((prev) => !prev);

  const activeFilters: ExploreActiveFilter[] = [
    ...selectedJobRoles.map((role) => ({
      key: role,
      label: role,
      onRemove: () => toggleJobRole(role),
    })),
    ...(selectedRegion
      ? [
          {
            key: selectedRegion,
            label: selectedRegion,
            onRemove: () => handleRegionChange(''),
          },
        ]
      : []),
    ...(selectedEmploymentType
      ? [
          {
            key: selectedEmploymentType,
            label: selectedEmploymentType,
            onRemove: () => handleEmploymentTypeChange(''),
          },
        ]
      : []),
    ...(isRemoteSelected
      ? [
          {
            key: 'remote',
            label: '원격',
            onRemove: () => setIsRemoteSelected(false),
          },
        ]
      : []),
  ];

  const hasActiveFilters = activeFilters.length > 0;

  const visibleJobs = (jobsQuery.data?.content ?? [])
    .filter((job) => !isRemoteSelected || job.remoteAvailable)
    .filter((job) => !selectedEmploymentType || job.employmentType === selectedEmploymentType)
    .map(mapJobSummary);

  const isSearching = jobsQuery.isLoading;
  const hasResults = visibleJobs.length > 0;
  const totalPages = jobsQuery.data?.totalPages ?? 1;
  const resultCount = jobsQuery.data?.totalElements ?? 0;

  const resetFilters = () => {
    setPage(0);
    setSelectedJobRoles([]);
    setSelectedRegion('');
    setSelectedEmploymentType('');
    setIsRemoteSelected(false);
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
          onSearchSubmit={handleSearchSubmit}
          categoryOptions={categoryOptions}
          selectedJobRoles={selectedJobRoles}
          onToggleJobRole={toggleJobRole}
          regionOptions={regionOptions}
          selectedRegion={selectedRegion}
          onRegionChange={handleRegionChange}
          employmentTypeOptions={employmentTypeOptions}
          selectedEmploymentType={selectedEmploymentType}
          onEmploymentTypeChange={handleEmploymentTypeChange}
          isRemoteSelected={isRemoteSelected}
          onToggleRemote={toggleRemote}
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
              currentPage={page + 1}
              totalPages={totalPages}
              label={`${page + 1}/${totalPages}`}
              onPrevious={() => setPage((prev) => Math.max(0, prev - 1))}
              onNext={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
            />
          </>
        ) : (
          <ExploreEmptyResults
            activeFilters={hasActiveFilters ? activeFilters : []}
            onResetFilters={resetFilters}
          />
        )}
      </div>
    </div>
  );
}
