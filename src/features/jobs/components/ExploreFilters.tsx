import { useState } from 'react';
import { Select } from '@/components/common';
import Search from '@/components/common/Search';
import Tag from '@/components/common/Tag';

export default function ExploreFilters() {
  const [isAlwaysOpenOnly, setIsAlwaysOpenOnly] = useState(true);

  return (
    <div className="flex w-full flex-col gap-3">
      <Search placeholder="직무 · 회사 · 키워드" className="w-[827px]" />
      <div className="flex w-full flex-wrap items-center gap-2">
        <Select placeholder="세부 직무" className="w-[200px] shrink-0">
          <option value="backend">백엔드</option>
          <option value="frontend">프론트엔드</option>
        </Select>
        <Select placeholder="지역" className="w-[200px] shrink-0">
          <option value="seoul">서울</option>
          <option value="busan">부산</option>
        </Select>
        <Select placeholder="경력" className="w-[200px] shrink-0">
          <option value="junior">신입~1년</option>
          <option value="mid">3~5년</option>
        </Select>
        <Select placeholder="고용 형태" className="w-[200px] shrink-0">
          <option value="fulltime">정규직</option>
          <option value="contract">계약직</option>
        </Select>
        <Tag variant="plain" label="원격" />
        <Tag
          variant="select"
          label="상시포함"
          selected={isAlwaysOpenOnly}
          onClick={() => setIsAlwaysOpenOnly((prev) => !prev)}
        />
      </div>
    </div>
  );
}
