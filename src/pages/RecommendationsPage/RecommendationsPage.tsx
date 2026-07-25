import { useSearchParams } from 'react-router';
import RecommendationFlowContent, {
  type RecommendationScreen,
} from '@/features/recommendations/components/RecommendationFlowContent';
import useRecommendationIntroAnimation from '@/features/recommendations/hooks/useRecommendationIntroAnimation';

interface RecommendationsPageProps {
  screen?: RecommendationScreen;
}

export default function RecommendationsPage({ screen = 'pending' }: RecommendationsPageProps) {
  const [searchParams] = useSearchParams();
  const previewScreen = searchParams.get('preview') === 'intro' ? 'intro' : undefined;
  const introAnimationMode = useRecommendationIntroAnimation(previewScreen === 'intro');

  return (
    <RecommendationFlowContent
      screen={previewScreen ?? screen}
      introAnimationMode={introAnimationMode}
    />
  );
}
