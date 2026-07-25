import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import type { MainLayoutOutletContext } from '@/components/layout/MainLayout';
import OnboardingConfirmStep from '@/features/onboarding/components/OnboardingConfirmStep';
import OnboardingProfileStep from '@/features/onboarding/components/OnboardingProfileStep';
import OnboardingQuizStep from '@/features/onboarding/components/OnboardingQuizStep';
import { cn } from '@/utils/cn';

type OnboardingStep = 'profile' | 'quiz' | 'confirm';
type StepTransitionDirection = 'forward' | 'backward';

interface OnboardingDraft {
  region: string;
  careerLevel: string;
  quizAnswers: string[];
}

const initialDraft: OnboardingDraft = {
  region: '서울 강남',
  careerLevel: '신입',
  quizAnswers: [],
};

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<OnboardingStep>('profile');
  const [draft, setDraft] = useState<OnboardingDraft>(initialDraft);
  const [quizIndex, setQuizIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] =
    useState<StepTransitionDirection>('forward');
  const [shouldAnimateStep, setShouldAnimateStep] = useState(false);
  const { setCarouselActiveIndex } = useOutletContext<MainLayoutOutletContext>();

  useEffect(() => {
    const carouselActiveIndex = { profile: 0, quiz: 1, confirm: 2 }[step];
    setCarouselActiveIndex(carouselActiveIndex);
  }, [setCarouselActiveIndex, step]);

  const changeStep = (nextStep: OnboardingStep, direction: StepTransitionDirection) => {
    setTransitionDirection(direction);
    setShouldAnimateStep(true);
    setStep(nextStep);
  };

  let stepContent;

  if (step === 'profile') {
    stepContent = (
      <OnboardingProfileStep
        region={draft.region}
        careerLevel={draft.careerLevel}
        onRegionChange={(region) => setDraft((previous) => ({ ...previous, region }))}
        onCareerLevelChange={(careerLevel) =>
          setDraft((previous) => ({ ...previous, careerLevel }))
        }
        onNext={() => changeStep('quiz', 'forward')}
      />
    );
  } else if (step === 'quiz') {
    stepContent = (
      <OnboardingQuizStep
        currentIndex={quizIndex}
        selectedOption={draft.quizAnswers[quizIndex]}
        onBack={() => {
          if (quizIndex === 0) {
            changeStep('profile', 'backward');
            return;
          }

          setQuizIndex((previous) => previous - 1);
        }}
        onSelect={(answer, isLastQuestion) => {
          setDraft((previous) => {
            const quizAnswers = [...previous.quizAnswers];
            quizAnswers[quizIndex] = answer;
            return { ...previous, quizAnswers };
          });

          if (isLastQuestion) {
            changeStep('confirm', 'forward');
            return;
          }

          setQuizIndex((previous) => previous + 1);
        }}
        onSkip={() => changeStep('confirm', 'forward')}
      />
    );
  } else {
    stepContent = (
      <OnboardingConfirmStep
        region={draft.region}
        careerLevel={draft.careerLevel}
        onBack={() => changeStep('quiz', 'backward')}
        onStart={() => navigate('/recommendations')}
      />
    );
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
