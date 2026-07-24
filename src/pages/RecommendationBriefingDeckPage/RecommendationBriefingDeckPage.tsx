import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import AppShell from '@/components/layout/AppShell';
import RecommendationLetterCard from '@/features/recommendations/components/RecommendationLetterCard';
import RecommendationLetterCarousel from '@/features/recommendations/components/RecommendationLetterCarousel';
import RecommendationNews from '@/features/recommendations/components/RecommendationNews';
import { RECOMMENDATION_LETTERS } from '@/features/recommendations/data/recommendationLetters';
import { RECOMMENDATION_NEWS_ITEMS } from '@/features/recommendations/data/recommendationNews';
import { useRecommendationDeckStore } from '@/features/recommendations/hooks/useRecommendationDeckStore';

// 공고 5건을 모두 본 뒤 마지막 6번째 슬라이드로 오늘의 소식(REC-04)을 보여준다.
const DECK = [
  ...RECOMMENDATION_LETTERS.map((letter) => ({ type: 'card', letter }) as const),
  { type: 'news' } as const,
];

export default function RecommendationBriefingDeckPage() {
  const navigate = useNavigate();
  const setStatus = useRecommendationDeckStore((state) => state.setStatus);
  const markViewed = useRecommendationDeckStore((state) => state.markViewed);
  const index = useRecommendationDeckStore((state) => state.deckIndex);
  const setIndex = useRecommendationDeckStore((state) => state.setDeckIndex);
  const step = DECK[index];
  const isLastStep = index === DECK.length - 1;

  useEffect(() => {
    if (step.type === 'card') {
      markViewed(step.letter.id);
    }
  }, [step, markViewed]);

  function goNext() {
    if (isLastStep) {
      navigate('/today/complete');
      return;
    }
    setIndex(index + 1);
  }

  function handleSave(letterId: string) {
    setStatus(letterId, 'saved');
    goNext();
  }

  function handleDismiss(letterId: string) {
    setStatus(letterId, 'dismissed');
    goNext();
  }

  return (
    <AppShell activeTab="today">
      <RecommendationLetterCarousel
        current={index + 1}
        total={DECK.length}
        onPrev={() => setIndex(Math.max(index - 1, 0))}
        onNext={goNext}
        prevDisabled={index === 0}
        footNote={step.type === 'news' ? '' : undefined}
      >
        {step.type === 'news' ? (
          <RecommendationNews items={RECOMMENDATION_NEWS_ITEMS} />
        ) : (
          <RecommendationLetterCard
            {...step.letter}
            onExpand={() => navigate(`/jobs/${step.letter.id}`)}
            onSave={() => handleSave(step.letter.id)}
            onDismiss={() => handleDismiss(step.letter.id)}
          />
        )}
      </RecommendationLetterCarousel>
    </AppShell>
  );
}
