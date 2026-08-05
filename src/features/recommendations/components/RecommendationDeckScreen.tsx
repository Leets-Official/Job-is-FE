import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, NoticePanel } from '@/components/common';
import { Spinner } from '@/components/feedback';
import RecommendationLetterCard from './RecommendationLetterCard';
import RecommendationLetterCarousel from './RecommendationLetterCarousel';
import RecommendationNews from './RecommendationNews';
import RecommendationScreenLayout from './RecommendationScreenLayout';
import useRecommendationDeck from '../hooks/useRecommendationDeck';
import useRecommendationNewsItems from '../hooks/useRecommendationNewsItems';

export default function RecommendationDeckScreen() {
  const navigate = useNavigate();
  const {
    cardsQuery,
    letters,
    markViewed,
    handleSaveLetter,
    handleExpandLetter,
    handleDismissLetter,
  } = useRecommendationDeck();
  const { newsItems, isLoading: isNewsLoading } = useRecommendationNewsItems();

  const DECK = useMemo(
    () => [
      ...letters.map((letter) => ({ type: 'card', letter }) as const),
      { type: 'news' } as const,
    ],
    [letters],
  );

  const [deckIndex, setDeckIndex] = useState(0);
  const deckStep = DECK[deckIndex] ?? DECK[DECK.length - 1];

  useEffect(() => {
    if (deckStep.type === 'card') markViewed(deckStep.letter.id);
  }, [deckStep, markViewed]);

  if (cardsQuery.isLoading) {
    return (
      <RecommendationScreenLayout>
        <Spinner />
      </RecommendationScreenLayout>
    );
  }

  if (cardsQuery.isError) {
    return (
      <RecommendationScreenLayout>
        <NoticePanel resultIconVariant="danger" title="오늘의 추천을 불러오지 못했어요">
          <Button onClick={() => cardsQuery.refetch()}>다시 시도</Button>
        </NoticePanel>
      </RecommendationScreenLayout>
    );
  }

  const isLastStep = deckIndex === DECK.length - 1;
  const goNext = () => {
    if (isLastStep) {
      navigate('/recommendations/complete', { state: { transition: 'recommendation-flow' } });
    } else setDeckIndex((previous) => previous + 1);
  };

  return (
    <RecommendationScreenLayout>
      <RecommendationLetterCarousel
        current={deckIndex + 1}
        total={DECK.length}
        contentKey={deckIndex}
        enableStackTransition
        onPrev={() => setDeckIndex((previous) => Math.max(previous - 1, 0))}
        onNext={goNext}
        prevDisabled={deckIndex === 0}
        footNote={deckStep.type === 'news' ? '' : undefined}
      >
        {deckStep.type === 'news' ? (
          isNewsLoading ? (
            <Spinner />
          ) : (
            <RecommendationNews items={newsItems} />
          )
        ) : (
          <RecommendationLetterCard
            {...deckStep.letter}
            onExpand={() => handleExpandLetter(deckStep.letter.id)}
            onSave={() => {
              handleSaveLetter(deckStep.letter.id);
              goNext();
            }}
            onDismiss={() => {
              handleDismissLetter(deckStep.letter.id);
              goNext();
            }}
          />
        )}
      </RecommendationLetterCarousel>
    </RecommendationScreenLayout>
  );
}
