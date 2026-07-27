import { useState } from 'react';
import ChevronRightIcon from '@/assets/icons/icon-chevron-right.svg?react';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import Tag from '@/components/common/Tag';
import { cn } from '@/utils/cn';

const REGION_OPTIONS = ['서울', '경기'];
const CAREER_OPTIONS = ['신입', '1~3년', '4년 이상'];
const INTEREST_OPTIONS = ['기획 • PM', '개발', '디자인'];
const LIFESTYLE_TAGS = ['# 성장 지향', '# 실무형', '# 협업 중시'];

function FieldLabel({
  children,
  status,
}: {
  children: string;
  status?: '필수' | '선택' | '읽기 전용';
}) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-label-medium font-medium text-text-primary">{children}</h2>
      {status && (
        <Badge color={status === '필수' ? 'primary' : 'disabled'} type="outline">
          {status}
        </Badge>
      )}
    </div>
  );
}

function ProfileLinkRow({
  title,
  status,
  onClick,
}: {
  title: string;
  status: string;
  onClick?: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="flex min-h-18 w-full cursor-pointer items-center justify-between rounded-xs border border-gray-400 bg-white px-6 py-4 text-left transition-colors hover:bg-gray-50"
      >
        <span className="flex flex-wrap items-center gap-1.5">
          <strong className="text-body-small text-text-primary">{title}</strong>
          <span className="text-body-xsmall font-medium text-text-tertiary">{status}</span>
        </span>
        <ChevronRightIcon className="size-6 text-gray-800" aria-hidden="true" />
      </button>
    </div>
  );
}

export default function ProfileSettingsForm({
  onDocumentsClick,
  onAptitudeTestClick,
}: {
  onDocumentsClick?: () => void;
  onAptitudeTestClick?: () => void;
}) {
  const [regions, setRegions] = useState(REGION_OPTIONS);
  const [career, setCareer] = useState('신입');
  const [interests, setInterests] = useState(['기획 • PM']);
  const [isSaved, setIsSaved] = useState(false);

  const toggleRegion = (region: string) => {
    setRegions((previous) =>
      previous.includes(region)
        ? previous.filter((item) => item !== region)
        : [...previous, region],
    );
    setIsSaved(false);
  };

  const toggleInterest = (interest: string) => {
    setInterests((previous) =>
      previous.includes(interest)
        ? previous.filter((item) => item !== interest)
        : [...previous, interest],
    );
    setIsSaved(false);
  };

  return (
    <form
      className="flex w-full max-w-190 flex-col gap-5 rounded-md border border-gray-200 bg-white p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setIsSaved(true);
      }}
    >
      <header className="flex flex-col gap-5 border-b border-gray-400 pb-5">
        <h1 className="text-heading-medium text-text-primary">내 프로필</h1>
        <p className="text-label-medium font-medium text-text-primary">
          이 정보로 매일 아침 추천 레터가 만들어져요
        </p>
      </header>

      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <FieldLabel status="필수">관심 직무</FieldLabel>
          <input
            type="text"
            defaultValue="IT 서비스 PM"
            onChange={() => setIsSaved(false)}
            className="h-10 w-full rounded-[6px] border border-gray-700 bg-white px-4 text-label-medium font-medium text-text-secondary outline-none transition-colors focus:border-primary-500"
            aria-label="관심 직무"
          />
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel status="필수">희망 지역</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {REGION_OPTIONS.map((region) => (
              <Tag
                key={region}
                variant="removable"
                label={region}
                className={cn(
                  'h-10 border-primary-600 bg-primary-600 px-3 text-label-large text-text-primary',
                  !regions.includes(region) && 'border-gray-300 bg-white text-text-primary',
                )}
                onClick={() => toggleRegion(region)}
                aria-pressed={regions.includes(region)}
              />
            ))}
            <Tag
              variant="add"
              label="지역"
              className="h-10 border-dashed text-label-large text-text-primary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel status="필수">경력 단계</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {CAREER_OPTIONS.map((option) => (
              <Tag
                key={option}
                variant="select"
                label={option}
                selected={career === option}
                className={cn(
                  'h-10 px-3 text-label-large',
                  career === option && 'border-primary-600 bg-primary-600 text-text-primary',
                )}
                onClick={() => {
                  setCareer(option);
                  setIsSaved(false);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <FieldLabel status="선택">관심 분야 • 직군</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((option) => (
              <Tag
                key={option}
                variant="removable"
                label={option}
                className={cn(
                  'h-10 px-3 text-label-large',
                  interests.includes(option) &&
                    'border-primary-600 bg-primary-600 text-text-primary',
                )}
                onClick={() => toggleInterest(option)}
                aria-pressed={interests.includes(option)}
              />
            ))}
            <Tag
              variant="add"
              label="추가"
              className="h-10 border-dashed text-label-large text-text-primary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel status="선택">선호 조건</FieldLabel>
          <input
            type="text"
            placeholder="정규직 우선 · 재택 가능한 곳이면 좋겠어요…"
            onChange={() => setIsSaved(false)}
            className="h-10 w-full rounded-[6px] border border-gray-700 bg-white px-4 text-label-medium font-medium text-text-secondary outline-none placeholder:text-gray-600 focus:border-primary-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel status="선택">기술 스택</FieldLabel>
          <div className="flex flex-wrap gap-2">
            <Tag variant="hash" label="React" className="h-10 px-3 text-label-large" />
            <Tag variant="hash" label="Figma" className="h-10 px-3 text-label-large" />
            <Tag
              variant="plain"
              label="+ 2"
              className="h-10 border-dashed px-3 text-label-large text-text-primary"
            />
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-5">
        <ProfileLinkRow
          title="이력서 • 자기소개서 관리"
          status="미첨부 / 2개"
          onClick={onDocumentsClick}
        />
        <ProfileLinkRow title="직무 성향 테스트" status="미완료" onClick={onAptitudeTestClick} />
      </div>

      <section className="border-b border-gray-400 pb-5">
        <FieldLabel status="읽기 전용">성향 결과 태그</FieldLabel>
        <div className="mt-5 flex flex-wrap gap-2">
          {LIFESTYLE_TAGS.map((tag) => (
            <Tag key={tag} variant="plain" label={tag} className="h-10 px-3 text-label-large" />
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-5">
        <div className="flex min-h-18 items-center rounded-xs border border-dashed border-gray-400 bg-gray-200 px-6">
          <p className="text-label-medium font-medium text-text-tertiary">
            {isSaved
              ? '저장됐어요. 다음 레터부터 변경 내용이 반영돼요.'
              : '오늘 레터는 그대로예요. 다음 레터부터 반영돼요(내일 발송 분).'}
          </p>
        </div>
        <div>
          <Button type="submit" className="h-14 w-full">
            저장
          </Button>
        </div>
      </div>
    </form>
  );
}
