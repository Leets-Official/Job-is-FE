import { useOutletContext } from 'react-router';
import type { LandingOutletContext } from '@/components/layout/LandingLayout';
import LandingContent from '@/features/landing/components/LandingContent';

export default function LandingPage() {
  const landingContext = useOutletContext<LandingOutletContext>();

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center bg-gray-50 px-3 py-4">
      <LandingContent {...landingContext} />
    </div>
  );
}
