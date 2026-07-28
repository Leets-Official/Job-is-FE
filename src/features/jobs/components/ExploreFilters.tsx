import { MultiSelect, Select } from '@/components/common';
import Search from '@/components/common/Search';
import Tag from '@/components/common/Tag';
import { JOB_ROLE_OPTIONS } from '@/features/jobs/constants/exploreFilters';

interface ExploreFiltersProps {
  selectedJobRoles: string[];
  onToggleJobRole: (value: string) => void;
  isRemoteSelected: boolean;
  onToggleRemote: () => void;
  isAlwaysOpenSelected: boolean;
  onToggleAlwaysOpen: () => void;
}

export default function ExploreFilters({
  selectedJobRoles,
  onToggleJobRole,
  isRemoteSelected,
  onToggleRemote,
  isAlwaysOpenSelected,
  onToggleAlwaysOpen,
}: ExploreFiltersProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <Search placeholder="직무 · 회사 · 키워드" className="w-[827px]" />
      <div className="flex w-full flex-wrap items-center gap-2">
        <MultiSelect
          placeholder="세부 직군"
          options={JOB_ROLE_OPTIONS}
          selectedValues={selectedJobRoles}
          onToggle={onToggleJobRole}
          className="w-[200px] shrink-0"
        />
        <Select placeholder="지역" className="w-[200px] shrink-0">
          <option value="seoul">서울</option>
          <option value="busan">부산</option>
          <option value="jeju">제주</option>
        </Select>
        <Select placeholder="경력" className="w-[200px] shrink-0">
          <option value="junior">신입~1년</option>
          <option value="mid">3~5년</option>
        </Select>
        <Select placeholder="고용 형태" className="w-[200px] shrink-0">
          <option value="fulltime">정규직</option>
          <option value="contract">계약직</option>
        </Select>
        <Tag variant="select" label="원격" selected={isRemoteSelected} onClick={onToggleRemote} />
        <Tag
          variant="select"
          label="상시포함"
          selected={isAlwaysOpenSelected}
          onClick={onToggleAlwaysOpen}
        />
      </div>
    </div>
  );
}
