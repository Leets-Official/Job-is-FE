import Button from '@/components/common/Button';
import ProfileBasicInfoSection from '@/features/profile/components/ProfileBasicInfoSection';
import ProfileLifestyleSection from '@/features/profile/components/ProfileLifestyleSection';
import ProfileLinksSection from '@/features/profile/components/ProfileLinksSection';
import ProfilePreferencesSection from '@/features/profile/components/ProfilePreferencesSection';
import useProfileSettingsForm from '@/features/profile/hooks/useProfileSettingsForm';
import type { ProfileSettingsFormValues } from '@/features/profile/types/profileSettings';

export type { ProfileSettingsFormValues } from '@/features/profile/types/profileSettings';

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
  const {
    regions,
    career,
    interests,
    techStacks,
    preferenceNote,
    isSaved,
    defaultSubmitError,
    isSavingProfile,
    profile,
    documentsStatus,
    techStackOptions,
    jobCategoryOptions,
    regionOptions,
    careerOptions,
    toggleRegion,
    addRegion,
    changeCareer,
    toggleInterest,
    addInterest,
    toggleTechStack,
    addTechStack,
    changePreferenceNote,
    submit,
  } = useProfileSettingsForm({ loadProfile, onSubmit });

  return (
    <form
      className="flex w-full max-w-190 flex-col gap-5 rounded-md border border-gray-200 bg-white p-6"
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
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
        interestOptions={jobCategoryOptions}
        regions={regions}
        regionOptions={regionOptions}
        careerOptions={careerOptions}
        career={career}
        onToggleInterest={toggleInterest}
        onAddInterest={addInterest}
        onToggleRegion={toggleRegion}
        onAddRegion={addRegion}
        onCareerChange={changeCareer}
      />

      <ProfilePreferencesSection
        preferenceNote={preferenceNote}
        techStacks={techStacks}
        techStackOptions={techStackOptions}
        onAddTechStack={addTechStack}
        onToggleTechStack={toggleTechStack}
        onPreferenceNoteChange={changePreferenceNote}
      />

      <ProfileLinksSection
        onDocumentsClick={onDocumentsClick}
        onAptitudeTestClick={onAptitudeTestClick}
        aptitudeTestCompleted={profile?.jobTestCompleted}
        documentsStatus={documentsStatus}
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
        {(submitError ?? defaultSubmitError) && (
          <p className="text-label-medium font-medium text-danger-500" role="alert">
            {submitError ?? defaultSubmitError}
          </p>
        )}
        <Button
          type="submit"
          className="h-14 w-full"
          disabled={isSubmitting || (!onSubmit && isSavingProfile)}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
