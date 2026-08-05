import { useNavigate } from 'react-router';
import RecommendationCompletion from './RecommendationCompletion';
import RecommendationScreenLayout from './RecommendationScreenLayout';
import useRecommendationDeck from '../hooks/useRecommendationDeck';

export default function RecommendationCompleteScreen() {
  const navigate = useNavigate();
  const { letters, resolveStatus, viewedLetterIds } = useRecommendationDeck();

  const savedCount = letters.filter((letter) => resolveStatus(letter.id) === 'saved').length;
  const dismissedCount = letters.filter(
    (letter) => resolveStatus(letter.id) === 'dismissed',
  ).length;
  const viewedCount = letters.filter((letter) => viewedLetterIds[letter.id]).length;

  return (
    <RecommendationScreenLayout>
      <RecommendationCompletion
        savedCount={savedCount}
        dismissedCount={dismissedCount}
        viewedCount={viewedCount}
        nextLetterNotice="내일 오전 7시 30분경, 다음 레터가 도착해요."
        onViewSaved={() => navigate('/recommendations/archive')}
        onExplore={() => navigate('/explore')}
      />
    </RecommendationScreenLayout>
  );
}
