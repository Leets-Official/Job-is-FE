import { useState } from 'react';
import { Select, ToggleSwitch } from '@/components/common';
import Chip from '@/components/common/Chip';
import Search from '@/components/common/Search';

export default function ExploreFilters() {
  const [isAlwaysOpenOnly, setIsAlwaysOpenOnly] = useState(true);

  return (
    <div className="flex w-full flex-col gap-3">
      <Search placeholder="직무 · 회사 · 키워드" />
      <div className="flex w-full flex-wrap items-center gap-2">
        <Select placeholder="세부 직무" className="w-40">
          <option value="backend">백엔드</option>
          <option value="frontend">프론트엔드</option>
        </Select>
        <Select placeholder="지역" className="w-40">
          <option value="seoul">서울</option>
          <option value="busan">부산</option>
        </Select>
        <Select placeholder="경력" className="w-40">
          <option value="junior">신입~1년</option>
          <option value="mid">3~5년</option>
        </Select>
        <Select placeholder="고용 형태" className="w-40">
          <option value="fulltime">정규직</option>
          <option value="contract">계약직</option>
        </Select>
        <ToggleSwitch id="remote-only" label="원격" />
        <Chip
          label="상시포함"
          selected={isAlwaysOpenOnly}
          onClick={() => setIsAlwaysOpenOnly((prev) => !prev)}
        />
      </div>
    </div>
  );
}
