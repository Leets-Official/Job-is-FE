import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useOutletContext } from 'react-router';
import { getJobCategories, getRegions } from '@/api/jobs';
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
import { cn } from '@/utils/cn';

type OnboardingStep = 'profile' | 'confirm';
type StepTransitionDirection = 'forward' | 'backward';

function findMetadataByName<T extends { name: string }>(items: T[], value: string) {
  const normalizedValue = value.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();

  return items.find((item) => {
    const normalizedName = item.name.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();
    return normalizedName === normalizedValue || normalizedName.includes(normalizedValue);
  });
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
  const { data: jobCategories = [] } = useQuery({
    queryKey: ['jobCategories'],
    queryFn: getJobCategories,
  });
  const { data: regions = [] } = useQuery({
    queryKey: ['regions'],
    queryFn: getRegions,
  });

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
        onNext={async ({
          interests,
          regions: selectedRegions,
          career,
          preferenceNotes,
          techStacks,
        }) => {
          setSaveError(undefined);
          const selectedCategories = interests
            .map((interest) => findMetadataByName(jobCategories, interest))
            .filter((category) => category !== undefined);
          const selectedRegion = findMetadataByName(regions, selectedRegions[0] ?? '');
          const careerLevel = career as ProfileDraftResponse['careerLevel'];

          // TODO: 직무·지역·경력 메타데이터 선택 상태를 ID로 보관한 뒤, 임시저장 전 필수값 검증을 복구한다.
          setIsSaving(true);

          try {
            await saveProfileDraft({
              onboardingStep: 'PROFILE',
              jobCategoryIds: selectedCategories.map((category) => category.id),
              primaryJobCategoryId: selectedCategories[0]?.id,
              regionId: selectedRegion?.id,
              careerLevel: careerLevel || undefined,
              preferenceNotes,
              excludeKeywords: [],
              techStacks,
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
        }}
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
