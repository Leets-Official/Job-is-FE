import { useNavigate } from 'react-router';
import { Button, NoticePanel } from '@/components/common';
import { Spinner } from '@/components/feedback';
import RecommendationGreeting from './RecommendationGreeting';
import RecommendationScreenLayout from './RecommendationScreenLayout';
import useRecommendationIntroAnimation from '../hooks/useRecommendationIntroAnimation';
import { useTodayBriefing } from '../hooks/useTodayBriefing';

export default function RecommendationIntroScreen() {
  const navigate = useNavigate();
  const briefingQuery = useTodayBriefing();
  const introAnimationMode = useRecommendationIntroAnimation(true);

  if (briefingQuery.isLoading) {
    return (
      <RecommendationScreenLayout>
        <Spinner />
      </RecommendationScreenLayout>
    );
  }

  if (briefingQuery.isError) {
    return (
      <RecommendationScreenLayout>
        <NoticePanel resultIconVariant="danger" title="브리핑을 불러오지 못했어요">
          <Button onClick={() => briefingQuery.refetch()}>다시 시도</Button>
        </NoticePanel>
      </RecommendationScreenLayout>
    );
  }

  return (
    <RecommendationScreenLayout>
      <RecommendationGreeting
        reviewedCount={briefingQuery.data?.applicableCount ?? 0}
        matchedCount={briefingQuery.data?.curatedCount ?? 0}
        focusDescription={briefingQuery.data?.theme ?? ''}
        animationMode={introAnimationMode}
        onStart={() =>
          navigate('/recommendations/deck', { state: { transition: 'recommendation-flow' } })
        }
      />
    </RecommendationScreenLayout>
  );
}
