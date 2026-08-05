import { useNavigate } from 'react-router';
import { Spinner } from '@/components/feedback';
import RecommendationArchiveScreen from './RecommendationArchiveScreen';
import RecommendationCompleteScreen from './RecommendationCompleteScreen';
import RecommendationDeckScreen from './RecommendationDeckScreen';
import RecommendationEmptyScreen from './RecommendationEmptyScreen';
import RecommendationIntroScreen from './RecommendationIntroScreen';
import RecommendationNewsScreen from './RecommendationNewsScreen';
import RecommendationPendingContent from './RecommendationPendingContent';
import RecommendationScreenLayout from './RecommendationScreenLayout';
import useRecommendationDeck from '../hooks/useRecommendationDeck';

export type RecommendationScreen =
  | 'pending'
  | 'intro'
  | 'deck'
  | 'news'
  | 'complete'
  | 'archive'
  | 'empty-candidates'
  | 'empty-signup'
  | 'empty-before-send';

export default function RecommendationFlowContent({ screen }: { screen: RecommendationScreen }) {
  const navigate = useNavigate();
  const { cardsQuery, letters } = useRecommendationDeck();

  const isEntryScreen = screen === 'pending';
  const hasTodayCards = letters.length > 0;
  const resolvedScreen: RecommendationScreen = isEntryScreen && hasTodayCards ? 'intro' : screen;

  if (isEntryScreen && cardsQuery.isLoading) {
    return (
      <RecommendationScreenLayout>
        <Spinner />
      </RecommendationScreenLayout>
    );
  }

  if (resolvedScreen === 'pending') {
    return (
      <RecommendationPendingContent
        onExploreClick={() => navigate('/explore')}
        onCompleteProfileClick={() => navigate('/profile')}
      />
    );
  }

  if (resolvedScreen === 'intro') return <RecommendationIntroScreen />;
  if (resolvedScreen === 'deck') return <RecommendationDeckScreen />;
  if (resolvedScreen === 'news') return <RecommendationNewsScreen />;
  if (resolvedScreen === 'complete') return <RecommendationCompleteScreen />;
  if (resolvedScreen === 'archive') return <RecommendationArchiveScreen />;

  return <RecommendationEmptyScreen variant={resolvedScreen} />;
}
