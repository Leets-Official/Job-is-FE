import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useOutletContext } from 'react-router';
import type { JobCategory, Region } from '@/api/jobs';
import {
  completeOnboarding,
  getProfileDraft,
  getProfileFiles,
  saveProfileDraft,
  type ProfileDraftResponse,
} from '@/api/profile';
import type { MainLayoutOutletContext } from '@/components/layout/MainLayout';
import { setOnboardingCompleted, useAuthStore } from '@/features/login/store/useAuthStore';
import OnboardingConfirmStep from '@/features/onboarding/components/OnboardingConfirmStep';
import OnboardingProfileStep from '@/features/onboarding/components/OnboardingProfileStep';
import useOnboardingMetadata from '@/features/onboarding/hooks/useOnboardingMetadata';
import type { ProfileSettingsFormValues } from '@/features/profile/components/ProfileSettingsForm';
import { cn } from '@/utils/cn';

type OnboardingStep = 'profile' | 'confirm';
type StepTransitionDirection = 'forward' | 'backward';
type ProfileValidationResult =
  | {
      isValid: true;
      selectedCategories: JobCategory[];
      selectedRegion: Region;
      careerLevel: ProfileDraftResponse['careerLevel'];
    }
  | { isValid: false; message: string };

const PROFILE_VALIDATION_MESSAGES = {
  metadataPending: '선택 목록을 불러오는 중이에요. 잠시 후 다시 시도해주세요.',
  required: '관심 직무, 희망 지역, 경력 단계를 모두 선택해주세요.',
  invalidMetadata: '등록된 목록에서 관심 직무와 희망 지역을 선택해주세요.',
} as const;

function normalizeMetadataName(value: string) {
  return value.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();
}

function findMetadataByName<T extends { name: string }>(items: T[], value: string) {
  const normalizedValue = normalizeMetadataName(value);
  return items.find((item) => normalizeMetadataName(item.name) === normalizedValue);
}

function validateProfileValues(
  values: ProfileSettingsFormValues,
  jobCategories: JobCategory[],
  regions: Region[],
  isMetadataPending: boolean,
): ProfileValidationResult {
  const { interests, regions: selectedRegions, career } = values;

  if (isMetadataPending) {
    return { isValid: false, message: PROFILE_VALIDATION_MESSAGES.metadataPending };
  }

  if (interests.length === 0 || selectedRegions.length === 0 || !career) {
    return { isValid: false, message: PROFILE_VALIDATION_MESSAGES.required };
  }

  const selectedCategories = interests
    .map((interest) => findMetadataByName(jobCategories, interest))
    .filter((category): category is JobCategory => category !== undefined);
  const selectedRegion = findMetadataByName(regions, selectedRegions[0] ?? '');

  if (selectedCategories.length !== interests.length || !selectedRegion) {
    return { isValid: false, message: PROFILE_VALIDATION_MESSAGES.invalidMetadata };
  }

  return {
    isValid: true,
    selectedCategories,
    selectedRegion,
    careerLevel: career as ProfileDraftResponse['careerLevel'],
  };
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<OnboardingStep>('profile');
  const [draft, setDraft] = useState<ProfileDraftResponse | null>(null);
  const [resumeName, setResumeName] = useState<string>();
  const [saveError, setSaveError] = useState<string>();
  const [isSaving, setIsSaving] = useState(false);
  const [completeError, setCompleteError] = useState<string>();
  const [isCompleting, setIsCompleting] = useState(false);
  const [transitionDirection, setTransitionDirection] =
    useState<StepTransitionDirection>('forward');
  const [shouldAnimateStep, setShouldAnimateStep] = useState(false);
  const { setCarouselActiveIndex } = useOutletContext<MainLayoutOutletContext>();
  const onboardingCompleted = useAuthStore((state) => state.onboardingCompleted);
  const { jobCategories, regions, isPending: isMetadataPending } = useOnboardingMetadata();

  useEffect(() => {
    const carouselActiveIndex = { profile: 0, confirm: 1 }[step];
    setCarouselActiveIndex(carouselActiveIndex);
  }, [setCarouselActiveIndex, step]);

  const changeStep = (nextStep: OnboardingStep, direction: StepTransitionDirection) => {
    setTransitionDirection(direction);
    setShouldAnimateStep(true);
    setStep(nextStep);
  };

  const handleOnboardingComplete = async () => {
    setCompleteError(undefined);
    setIsCompleting(true);

    try {
      await saveProfileDraft({ onboardingStep: 'REVIEW' });
      await completeOnboarding();
      setOnboardingCompleted(true);
      navigate('/recommendations', { replace: true });
    } catch {
      setCompleteError('온보딩 완료 처리에 실패했어요. 잠시 후 다시 시도해주세요.');
      setIsCompleting(false);
    }
  };

  const handleProfileNext = async (values: ProfileSettingsFormValues) => {
    setSaveError(undefined);

    const validationResult = validateProfileValues(
      values,
      jobCategories,
      regions,
      isMetadataPending,
    );

    if (!validationResult.isValid) {
      setSaveError(validationResult.message);
      return;
    }

    setIsSaving(true);

    try {
      await saveProfileDraft({
        onboardingStep: 'PROFILE',
        jobCategoryIds: validationResult.selectedCategories.map((category) => category.id),
        primaryJobCategoryId: validationResult.selectedCategories[0]?.id,
        regionId: validationResult.selectedRegion.id,
        careerLevel: validationResult.careerLevel,
        preferenceNotes: values.preferenceNotes,
        excludeKeywords: [],
        techStacks: values.techStacks,
      });

      const [savedDraft, profileFiles] = await Promise.all([
        getProfileDraft(),
        getProfileFiles().catch(() => []),
      ]);
      setDraft(savedDraft);
      setResumeName(profileFiles.find((file) => file.category === 'RESUME')?.fileName);
      changeStep('confirm', 'forward');
    } catch {
      setSaveError('임시저장에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  if (onboardingCompleted) {
    return <Navigate to="/recommendations" replace />;
  }

  let stepContent;

  if (step === 'profile') {
    stepContent = (
      <OnboardingProfileStep
        onDocumentsClick={() => navigate('/profile/documents?from=onboarding')}
        onAptitudeTestClick={() => navigate('/profile/aptitude-test?source=ONBOARDING')}
        submitError={saveError}
        isSubmitting={isSaving}
        onNext={handleProfileNext}
      />
    );
  } else if (draft) {
    stepContent = (
      <OnboardingConfirmStep
        draft={draft}
        resumeName={resumeName}
        onBack={() => changeStep('profile', 'backward')}
        onStart={handleOnboardingComplete}
        isStarting={isCompleting}
        startError={completeError}
      />
    );
  } else {
    stepContent = null;
  }

  return (
    <div className="flex min-h-0 w-full flex-1 overflow-x-clip">
      <div
        key={step}
        className={cn(
          'flex min-h-0 w-full flex-1',
          shouldAnimateStep && 'onboarding-step-enter',
          shouldAnimateStep &&
            transitionDirection === 'backward' &&
            'onboarding-step-enter--backward',
        )}
      >
        {stepContent}
      </div>
    </div>
  );
}
