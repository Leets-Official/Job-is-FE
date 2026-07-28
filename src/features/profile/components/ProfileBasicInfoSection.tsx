import Tag from '@/components/common/Tag';
import ProfileFieldLabel from '@/features/profile/components/ProfileFieldLabel';
import { cn } from '@/utils/cn';

const REGION_OPTIONS = ['서울', '경기'];
const CAREER_OPTIONS = ['신입', '1~3년', '4년 이상'];

interface ProfileBasicInfoSectionProps {
  regions: string[];
  career: string;
  onToggleRegion: (region: string) => void;
  onCareerChange: (career: string) => void;
  onFieldChange: () => void;
}

export default function ProfileBasicInfoSection({
  regions,
  career,
  onToggleRegion,
  onCareerChange,
  onFieldChange,
}: ProfileBasicInfoSectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <ProfileFieldLabel status="필수">관심 직무</ProfileFieldLabel>
        <input
          type="text"
          defaultValue="IT 서비스 PM"
          onChange={onFieldChange}
          className="h-10 w-full rounded-[6px] border border-gray-700 bg-white px-4 text-label-medium font-medium text-text-secondary outline-none transition-colors focus:border-primary-500"
          aria-label="관심 직무"
        />
      </div>

      <div className="flex flex-col gap-2">
        <ProfileFieldLabel status="필수">희망 지역</ProfileFieldLabel>
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
              onClick={() => onToggleRegion(region)}
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
        <ProfileFieldLabel status="필수">경력 단계</ProfileFieldLabel>
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
              onClick={() => onCareerChange(option)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
