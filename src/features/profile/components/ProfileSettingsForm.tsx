import { useState } from 'react';
import Button from '@/components/common/Button';
import ProfileBasicInfoSection from '@/features/profile/components/ProfileBasicInfoSection';
import ProfileLifestyleSection from '@/features/profile/components/ProfileLifestyleSection';
import ProfileLinksSection from '@/features/profile/components/ProfileLinksSection';
import ProfilePreferencesSection from '@/features/profile/components/ProfilePreferencesSection';

const INITIAL_REGIONS = ['서울', '경기'];
const INITIAL_INTERESTS = ['기획 • PM'];

export default function ProfileSettingsForm({
  onDocumentsClick,
  onAptitudeTestClick,
}: {
  onDocumentsClick?: () => void;
  onAptitudeTestClick?: () => void;
}) {
  const [regions, setRegions] = useState(INITIAL_REGIONS);
  const [career, setCareer] = useState('신입');
  const [interests, setInterests] = useState(INITIAL_INTERESTS);
  const [isSaved, setIsSaved] = useState(false);

  const toggleRegion = (region: string) => {
    setRegions((previous) =>
      previous.includes(region)
        ? previous.filter((item) => item !== region)
        : [...previous, region],
    );
    setIsSaved(false);
  };

  const changeCareer = (nextCareer: string) => {
    setCareer(nextCareer);
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

      <ProfileBasicInfoSection
        regions={regions}
        career={career}
        onToggleRegion={toggleRegion}
        onCareerChange={changeCareer}
        onFieldChange={() => setIsSaved(false)}
      />

      <ProfilePreferencesSection
        interests={interests}
        onToggleInterest={toggleInterest}
        onFieldChange={() => setIsSaved(false)}
      />

      <ProfileLinksSection
        onDocumentsClick={onDocumentsClick}
        onAptitudeTestClick={onAptitudeTestClick}
      />

      <ProfileLifestyleSection />

      <div className="flex flex-col gap-5">
        <div className="flex min-h-18 items-center rounded-xs border border-dashed border-gray-400 bg-gray-200 px-6">
          <p className="text-label-medium font-medium text-text-tertiary">
            {isSaved
              ? '저장됐어요. 다음 레터부터 변경 내용이 반영돼요.'
              : '오늘 레터는 그대로예요. 다음 레터부터 반영돼요(내일 발송 분).'}
          </p>
        </div>
        <Button type="submit" className="h-14 w-full">
          저장
        </Button>
      </div>
    </form>
  );
}
