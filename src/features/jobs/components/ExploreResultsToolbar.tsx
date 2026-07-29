import { Select, Tag } from '@/components/common';

export interface ExploreActiveFilter {
  key: string;
  label: string;
  onRemove: () => void;
}

interface ExploreResultsToolbarProps {
  resultCount: number;
  activeFilters: ExploreActiveFilter[];
  onReset?: () => void;
  isLoading?: boolean;
}

export default function ExploreResultsToolbar({
  resultCount,
  activeFilters,
  onReset,
  isLoading = false,
}: ExploreResultsToolbarProps) {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {isLoading ? (
          <p className="text-body-medium font-bold text-text-primary">검색 결과 확인 중 •••</p>
        ) : (
          <>
            <p className="text-body-medium font-bold text-text-primary">
              검색 결과 {resultCount}건
            </p>
            {activeFilters.map((filter) => (
              <Tag
                key={filter.key}
                variant="removable"
                label={filter.label}
                className="h-8 gap-1 border-transparent bg-primary-400 text-body-small text-text-primary"
                onClick={filter.onRemove}
              />
            ))}
            <button
              type="button"
              onClick={onReset}
              className="text-body-small font-medium text-text-tertiary underline underline-offset-2"
            >
              초기화
            </button>
          </>
        )}
      </div>
      <Select
        defaultValue="recommended"
        aria-label="정렬"
        className="h-10 w-25 shrink-0 px-4 text-body-small"
      >
        <option value="recommended">추천순</option>
        <option value="latest">최신순</option>
        <option value="deadline">마감임박순</option>
      </Select>
    </div>
  );
}
