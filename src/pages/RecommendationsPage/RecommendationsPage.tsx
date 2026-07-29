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
  // NOTE: ?preview= 쿼리스트링, 임시 확인용, 실제 트리거 연결 후 삭제 예정
  const previewScreen = searchParams.get('preview') === 'intro' ? 'intro' : undefined;
  const introAnimationMode = useRecommendationIntroAnimation(previewScreen === 'intro');

  return (
    <RecommendationFlowContent
      screen={previewScreen ?? screen}
      introAnimationMode={introAnimationMode}
    />
  );
}
