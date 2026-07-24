import { useNavigate } from 'react-router';
import AppShell from '@/components/layout/AppShell';
import RecommendationCompletion from '@/features/recommendations/components/RecommendationCompletion';
import { RECOMMENDATION_LETTERS } from '@/features/recommendations/data/recommendationLetters';
import {
  getRecommendationLetterStatus,
  useRecommendationDeckStore,
} from '@/features/recommendations/hooks/useRecommendationDeckStore';

export default function RecommendationDeckCompletePage() {
  const navigate = useNavigate();
  const statusByLetterId = useRecommendationDeckStore((state) => state.statusByLetterId);
  const viewedLetterIds = useRecommendationDeckStore((state) => state.viewedLetterIds);

  const savedCount = RECOMMENDATION_LETTERS.filter(
    (letter) => getRecommendationLetterStatus(statusByLetterId, letter.id) === 'saved',
  ).length;
  const dismissedCount = RECOMMENDATION_LETTERS.filter(
    (letter) => getRecommendationLetterStatus(statusByLetterId, letter.id) === 'dismissed',
  ).length;
  const viewedCount = RECOMMENDATION_LETTERS.filter((letter) => viewedLetterIds[letter.id]).length;

  return (
    <AppShell activeTab="today">
      <RecommendationCompletion
        savedCount={savedCount}
        dismissedCount={dismissedCount}
        viewedCount={viewedCount}
        nextLetterNotice="내일 오전 7시 30분경, 다음 레터가 도착해요."
        onViewSaved={() => navigate('/today/revisit')}
        onExplore={() => navigate('/explore')}
      />
    </AppShell>
  );
}
