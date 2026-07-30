import Tag from '@/components/common/Tag';
import ProfileFieldLabel from '@/features/profile/components/ProfileFieldLabel';
import { cn } from '@/utils/cn';

const INTEREST_OPTIONS = ['기획 • PM', '개발', '디자인'];

interface ProfilePreferencesSectionProps {
  interests: string[];
  onToggleInterest: (interest: string) => void;
  onFieldChange: () => void;
}

export default function ProfilePreferencesSection({
  interests,
  onToggleInterest,
  onFieldChange,
}: ProfilePreferencesSectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <ProfileFieldLabel status="선택">관심 분야 • 직군</ProfileFieldLabel>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((option) => (
            <Tag
              key={option}
              variant="removable"
              label={option}
              className={cn(
                'h-10 px-3 text-label-large',
                interests.includes(option) && 'border-primary-600 bg-primary-600 text-text-primary',
              )}
              onClick={() => onToggleInterest(option)}
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
        <ProfileFieldLabel status="선택">선호 조건</ProfileFieldLabel>
        <input
          type="text"
          placeholder="정규직 우선 · 재택 가능한 곳이면 좋겠어요…"
          onChange={onFieldChange}
          className="h-10 w-full rounded-[6px] border border-gray-700 bg-white px-4 text-label-medium font-medium text-text-secondary outline-none placeholder:text-gray-600 focus:border-primary-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <ProfileFieldLabel status="선택">기술 스택</ProfileFieldLabel>
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
  );
}
