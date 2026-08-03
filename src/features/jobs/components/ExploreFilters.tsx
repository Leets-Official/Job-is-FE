import { MultiSelect, Select, Tag } from '@/components/common';
import type { MultiSelectOption } from '@/components/common/MultiSelect';
import Search from '@/components/common/Search';

interface ExploreFiltersProps {
  onSearchSubmit: (keyword: string) => void;
  categoryOptions: MultiSelectOption[];
  selectedJobRoles: string[];
  onToggleJobRole: (value: string) => void;
  regionOptions: MultiSelectOption[];
  selectedRegion: string;
  onRegionChange: (value: string) => void;
  employmentTypeOptions: string[];
  selectedEmploymentType: string;
  onEmploymentTypeChange: (value: string) => void;
  isRemoteSelected: boolean;
  onToggleRemote: () => void;
}

export default function ExploreFilters({
  onSearchSubmit,
  categoryOptions,
  selectedJobRoles,
  onToggleJobRole,
  regionOptions,
  selectedRegion,
  onRegionChange,
  employmentTypeOptions,
  selectedEmploymentType,
  onEmploymentTypeChange,
  isRemoteSelected,
  onToggleRemote,
}: ExploreFiltersProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <Search
        placeholder="직무 · 회사 · 키워드"
        className="w-[827px]"
        onSearchSubmit={onSearchSubmit}
      />
      <div className="flex w-full flex-wrap items-center gap-2">
        <MultiSelect
          placeholder="세부 직군"
          options={categoryOptions}
          selectedValues={selectedJobRoles}
          onToggle={onToggleJobRole}
          className="w-[200px] shrink-0"
        />
        <Select
          placeholder="지역"
          className="w-[200px] shrink-0"
          value={selectedRegion}
          onChange={(event) => onRegionChange(event.target.value)}
        >
          {regionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <Select placeholder="경력" className="w-[200px] shrink-0">
          <option value="junior">신입~1년</option>
          <option value="mid">3~5년</option>
        </Select>
        <Select
          placeholder="고용 형태"
          className="w-[200px] shrink-0"
          value={selectedEmploymentType}
          onChange={(event) => onEmploymentTypeChange(event.target.value)}
        >
          {employmentTypeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
        <Tag variant="select" label="원격" selected={isRemoteSelected} onClick={onToggleRemote} />
      </div>
    </div>
  );
}
