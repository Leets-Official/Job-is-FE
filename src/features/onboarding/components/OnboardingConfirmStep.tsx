import Button from '@/components/common/Button';
import Tag from '@/components/common/Tag';

interface OnboardingConfirmStepProps {
  region: string;
  careerLevel: string;
  onBack: () => void;
  onEdit: () => void;
  onStart: () => void;
}

const PERSONALITY_TAGS = ['성장 지향', '실무형', '탐구형'];

export default function OnboardingConfirmStep({
  region,
  careerLevel,
  onBack,
  onEdit,
  onStart,
}: OnboardingConfirmStepProps) {
  const summaryItems = [
    { label: '직무 • 직군', value: '백엔드 엔지니어, 데이터 엔지니어' },
    { label: '지역 • 경력', value: `${region} • ${careerLevel}` },
    { label: '선호 • 제외 • 스택', value: '재택 근무 가능 • 야근 잦은 곳 제외 • Python, Go' },
    { label: '이력서', value: '이력서_김민준.pdf' },
  ];

  return (
    <div className="flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden bg-gray-50 px-3">
      <div className="flex w-full max-w-190 flex-col items-start gap-5 rounded-md border border-gray-200 bg-white p-6">
        <p className="text-heading-medium font-bold text-text-primary">
          이대로 시작할게요. 맞는지 확인해 주세요.
        </p>

        {summaryItems.map((item) => (
          <div key={item.label} className="flex w-full flex-col gap-5">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-6">
                <p className="text-body-small font-bold text-text-secondary">{item.label}</p>
                <p className="text-body-small font-bold text-text-primary">{item.value}</p>
              </div>
              <button
                type="button"
                onClick={onEdit}
                className="cursor-pointer text-label-large font-medium text-text-tertiary underline decoration-solid decoration-from-font [text-underline-position:from-font]"
              >
                수정
              </button>
            </div>
            <hr className="w-full border-t border-gray-200" />
          </div>
        ))}

        <div className="flex w-full flex-col gap-5">
          <div className="flex items-center gap-6">
            <p className="text-body-small font-bold text-text-secondary">성향 결과</p>
            <div className="flex items-center gap-1">
              {PERSONALITY_TAGS.map((label) => (
                <Tag key={label} variant="hash" label={label} />
              ))}
            </div>
          </div>
          <hr className="w-full border-t border-gray-200" />
        </div>

        <div className="w-full rounded-xs border border-dashed border-gray-400 bg-gray-200 p-6">
          <p className="text-label-medium font-medium text-text-tertiary">
            저장한 조건은 <span className="text-text-secondary">다음 추천</span>부터 반영돼요.
          </p>
        </div>
        <hr className="w-full border-t border-gray-200" />

        <div className="flex w-full items-center gap-5">
          <Button variant="outline" onClick={onBack}>
            이전
          </Button>
          <Button className="flex-1" onClick={onStart}>
            이대로 시작
          </Button>
        </div>
      </div>
    </div>
  );
}
