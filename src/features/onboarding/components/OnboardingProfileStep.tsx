import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import Tag from '@/components/common/Tag';

const INTEREST_JOBS = ['백엔드 엔지니어', '데이터 엔지니어'];
const REGIONS = ['서울 강남', '서울 전체', '경기', '원격 가능만'];
const CAREER_LEVELS = ['신입', '1~3년', '4년 이상'];

interface OnboardingProfileStepProps {
  region: string;
  careerLevel: string;
  onRegionChange: (region: string) => void;
  onCareerLevelChange: (careerLevel: string) => void;
  onNext: () => void;
}

export default function OnboardingProfileStep({
  region,
  careerLevel,
  onRegionChange,
  onCareerLevelChange,
  onNext,
}: OnboardingProfileStepProps) {
  return (
    <div className="flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden bg-gray-50 px-3">
      <div className="flex w-full max-w-190 flex-col items-start gap-5 rounded-md border border-gray-200 bg-white p-6">
        <p className="text-heading-medium font-bold text-text-primary">
          지금은 IT•개발 직군을 우선 큐레이션해요
        </p>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <p className="text-label-medium font-medium text-text-primary">관심 직무 • 직군</p>
            <Badge type="solid">완료</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {INTEREST_JOBS.map((job) => (
              <Tag key={job} variant="select" label={job} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <p className="text-label-medium font-medium text-text-primary">희망 지역</p>
            <Badge>필수</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {REGIONS.map((label) => (
              <Tag
                key={label}
                variant="select"
                label={label}
                selected={region === label}
                onClick={() => onRegionChange(label)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <p className="text-label-medium font-medium text-text-primary">경력 단계</p>
            <Badge>필수</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {CAREER_LEVELS.map((label) => (
              <Tag
                key={label}
                variant="select"
                label={label}
                selected={careerLevel === label}
                onClick={() => onCareerLevelChange(label)}
              />
            ))}
          </div>
        </div>

        <hr className="w-full border-t border-gray-200" />

        <div className="flex w-full items-center gap-3">
          <Button variant="outline">이전</Button>
          <Button variant="outline">임시저장</Button>
          <Button className="flex-1" onClick={onNext}>
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
