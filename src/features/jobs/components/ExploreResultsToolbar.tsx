import { Select } from '@/components/common';
import Tag from '@/components/common/Tag';

interface ExploreResultsToolbarProps {
  resultCount: number;
  activeFilterLabel?: string;
  onRemoveActiveFilter?: () => void;
  onReset?: () => void;
}

export default function ExploreResultsToolbar({
  resultCount,
  activeFilterLabel,
  onRemoveActiveFilter,
  onReset,
}: ExploreResultsToolbarProps) {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-body-medium font-bold text-text-primary">검색 결과 {resultCount}건</p>
        {activeFilterLabel && (
          <Tag
            variant="removable"
            label={activeFilterLabel}
            className="h-8 gap-1 border-transparent bg-primary-400 text-text-primary text-body-small"
            onClick={onRemoveActiveFilter}
          />
        )}
        <button
          type="button"
          onClick={onReset}
          className="text-body-small font-medium text-text-tertiary underline underline-offset-2"
        >
          초기화
        </button>
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
