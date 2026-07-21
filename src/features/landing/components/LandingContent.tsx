import type { LandingOutletContext } from '@/components/layout/LandingLayout';
import LandingFeatureGrid from '@/features/landing/components/LandingFeatureGrid';
import LandingHero from '@/features/landing/components/LandingHero';

export default function LandingContent({
  headline,
  typedHeadline,
  isIntroComplete,
  shouldPlayRevisitAnimation,
}: LandingOutletContext) {
  return (
    <>
      <LandingHero
        headline={headline}
        typedHeadline={typedHeadline}
        isIntroComplete={isIntroComplete}
        shouldPlayRevisitAnimation={shouldPlayRevisitAnimation}
      />
      <LandingFeatureGrid isIntroComplete={isIntroComplete} />
    </>
  );
}
