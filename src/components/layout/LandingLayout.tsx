import { Outlet } from 'react-router';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import useLandingIntroAnimation from '@/features/landing/hooks/useLandingIntroAnimation';
import { cn } from '@/utils/cn';

const HERO_COPY = '매일 아침, 오늘 들어온 공고를 검토해\n당신에게 맞는 몇 건만 편지로 보내드려요.';
const TYPING_INTERVAL = 60;

export interface LandingOutletContext {
  headline: string;
  typedHeadline: string;
  isIntroComplete: boolean;
  shouldPlayRevisitAnimation: boolean;
}

export default function LandingLayout() {
  const { typedHeadline, isIntroComplete, shouldPlayRevisitAnimation } = useLandingIntroAnimation(
    HERO_COPY,
    TYPING_INTERVAL,
  );
  const revealClassName = isIntroComplete
    ? 'landing-reveal landing-reveal--visible'
    : 'landing-reveal';

  return (
    <div className="landing-layout flex min-h-screen flex-col bg-gray-50">
      <div className={cn(revealClassName, 'landing-reveal--from-top')}>
        <Header />
      </div>
      <main className="flex flex-1 flex-col">
        <Outlet
          context={
            {
              headline: HERO_COPY,
              typedHeadline,
              isIntroComplete,
              shouldPlayRevisitAnimation,
            } satisfies LandingOutletContext
          }
        />
      </main>
      <div className={cn(revealClassName, 'landing-reveal--delay-9')}>
        <Footer />
      </div>
    </div>
  );
}
