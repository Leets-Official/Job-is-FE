import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getCareerLevels, getJobCategories, getRegions, getTechStacks } from '@/api/jobs';
import { getProfile } from '@/api/profile';
import Button from '@/components/common/Button';
import ProfileBasicInfoSection from '@/features/profile/components/ProfileBasicInfoSection';
import ProfileLifestyleSection from '@/features/profile/components/ProfileLifestyleSection';
import ProfileLinksSection from '@/features/profile/components/ProfileLinksSection';
import ProfilePreferencesSection from '@/features/profile/components/ProfilePreferencesSection';

const INITIAL_REGIONS: string[] = [];
const INITIAL_INTERESTS: string[] = [];
const INITIAL_TECH_STACKS: string[] = [];

function toggleSingleValue(values: string[], value: string) {
  return values.includes(value) ? [] : [value];
}

function toggleMultipleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

function addUniqueValue(values: string[], value: string) {
  return values.includes(value) ? values : [...values, value];
}

export interface ProfileSettingsFormValues {
  regions: string[];
  career: string;
  interests: string[];
  techStacks: string[];
  preferenceNotes: string[];
}

interface ProfileSettingsFormProps {
  onDocumentsClick?: () => void;
  onAptitudeTestClick?: () => void;
  onSubmit?: (values: ProfileSettingsFormValues) => void | Promise<void>;
  submitLabel?: string;
  title?: string;
  showSaveNotice?: boolean;
  loadProfile?: boolean;
  submitError?: string;
  isSubmitting?: boolean;
}

export default function ProfileSettingsForm({
  onDocumentsClick,
  onAptitudeTestClick,
  onSubmit,
  submitLabel = '저장',
  title = '내 프로필',
  showSaveNotice = true,
  loadProfile = true,
  submitError,
  isSubmitting = false,
}: ProfileSettingsFormProps) {
  const [regions, setRegions] = useState(INITIAL_REGIONS);
  const [career, setCareer] = useState('');
  const [interests, setInterests] = useState(INITIAL_INTERESTS);
  const [techStacks, setTechStacks] = useState(INITIAL_TECH_STACKS);
  const [preferenceNote, setPreferenceNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const toggleRegion = (region: string) => {
    setRegions((previous) => toggleSingleValue(previous, region));
    setIsSaved(false);
  };

  const changeCareer = (nextCareer: string) => {
    setCareer(nextCareer);
    setIsSaved(false);
  };

  const toggleInterest = (interest: string) => {
    setInterests((previous) => toggleMultipleValue(previous, interest));
    setIsSaved(false);
  };

  const addInterest = (interest: string) => {
    setInterests((previous) => addUniqueValue(previous, interest));
    setIsSaved(false);
  };

  const { data: techStackMetadata = [] } = useQuery({
    queryKey: ['techStacks'],
    queryFn: getTechStacks,
  });
  const { data: jobCategoryMetadata = [] } = useQuery({
    queryKey: ['jobCategories'],
    queryFn: getJobCategories,
  });
  const { data: regionMetadata = [] } = useQuery({
    queryKey: ['regions'],
    queryFn: getRegions,
  });
  const { data: careerLevelMetadata = [] } = useQuery({
    queryKey: ['careerLevels'],
    queryFn: getCareerLevels,
  });
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: loadProfile,
  });
  const techStackOptions = techStackMetadata.map((techStack) => techStack.name);

  const toggleTechStack = (techStack: string) => {
    setTechStacks((previous) => toggleMultipleValue(previous, techStack));
    setIsSaved(false);
  };

  const addTechStack = (techStack: string) => {
    setTechStacks((previous) => addUniqueValue(previous, techStack));
    setIsSaved(false);
  };

  return (
    <form
      className="flex w-full max-w-190 flex-col gap-5 rounded-md border border-gray-200 bg-white p-6"
      onSubmit={(event) => {
        event.preventDefault();
        if (onSubmit) {
          void onSubmit({
            regions,
            career,
            interests,
            techStacks,
            preferenceNotes: preferenceNote.trim() ? [preferenceNote.trim()] : [],
          });
          return;
        }
        setIsSaved(true);
      }}
    >
      <header className="flex flex-col gap-5 border-b border-gray-400 pb-5">
        <h1 className="text-heading-medium text-text-primary">{title}</h1>
        <p className="text-label-medium font-medium text-text-primary">
          이 정보로 매일 아침 추천 레터가 만들어져요
        </p>
      </header>

      <ProfileBasicInfoSection
        interests={interests}
        interestOptions={jobCategoryMetadata.map((category) => category.name)}
        regions={regions}
        regionOptions={regionMetadata.map((region) => region.name)}
        careerOptions={careerLevelMetadata}
        career={career}
        onToggleInterest={toggleInterest}
        onAddInterest={addInterest}
        onToggleRegion={toggleRegion}
        onAddRegion={toggleRegion}
        onCareerChange={changeCareer}
      />

      <ProfilePreferencesSection
        techStacks={techStacks}
        techStackOptions={techStackOptions}
        onAddTechStack={addTechStack}
        onToggleTechStack={toggleTechStack}
        onPreferenceNoteChange={(value) => {
          setPreferenceNote(value);
          setIsSaved(false);
        }}
      />

      <ProfileLinksSection
        onDocumentsClick={onDocumentsClick}
        onAptitudeTestClick={onAptitudeTestClick}
        aptitudeTestCompleted={profile?.jobTestCompleted}
      />

      {profile?.jobTestCompleted && profile.personalityTags.length > 0 && (
        <ProfileLifestyleSection tags={profile.personalityTags} />
      )}

      <div className="flex flex-col gap-5">
        {showSaveNotice && (
          <div className="flex min-h-18 items-center rounded-xs border border-dashed border-gray-400 bg-gray-200 px-6">
            <p className="text-label-medium font-medium text-text-tertiary">
              {isSaved
                ? '저장됐어요. 다음 레터부터 변경 내용이 반영돼요.'
                : '오늘 레터는 그대로예요. 다음 레터부터 반영돼요(내일 발송 분).'}
            </p>
          </div>
        )}
        {submitError && (
          <p className="text-label-medium font-medium text-danger-500" role="alert">
            {submitError}
          </p>
        )}
        <Button type="submit" className="h-14 w-full" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
