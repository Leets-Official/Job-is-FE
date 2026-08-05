import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { dismissCard } from '@/api/recommendations';
import {
  getRecommendationLetterStatus,
  useRecommendationDeckStore,
} from '@/store/useRecommendationDeckStore';
import { useSaveRecommendedJob } from './useSaveRecommendedJob';
import { useTodayBriefingCards } from './useTodayBriefing';
import { mapBriefingCard, mapBriefingCardStatus } from '../mapBriefingCard';

export default function useRecommendationDeck() {
  const navigate = useNavigate();
  const setStatus = useRecommendationDeckStore((state) => state.setStatus);
  const markViewed = useRecommendationDeckStore((state) => state.markViewed);
  const statusByLetterId = useRecommendationDeckStore((state) => state.statusByLetterId);
  const viewedLetterIds = useRecommendationDeckStore((state) => state.viewedLetterIds);

  const cardsQuery = useTodayBriefingCards();
  const { mutateAsync: saveRecommendedJob } = useSaveRecommendedJob();

  const cards = useMemo(
    () => [...(cardsQuery.data ?? [])].sort((a, b) => a.position - b.position),
    [cardsQuery.data],
  );
  const letters = useMemo(() => cards.map(mapBriefingCard), [cards]);
  const initialStatusByLetterId = useMemo(
    () =>
      Object.fromEntries(
        cards.map((card) => [String(card.cardId), mapBriefingCardStatus(card.status)]),
      ),
    [cards],
  );
  const jobIdByLetterId = useMemo(
    () => Object.fromEntries(cards.map((card) => [String(card.cardId), card.jobId])),
    [cards],
  );
  const deckIdByLetterId = useMemo(
    () => Object.fromEntries(cards.map((card) => [String(card.cardId), card.deckId])),
    [cards],
  );

  const resolveStatus = (letterId: string) =>
    getRecommendationLetterStatus(statusByLetterId, letterId, initialStatusByLetterId[letterId]);

  const handleSaveLetter = (letterId: string) => {
    const previousStatus = resolveStatus(letterId);
    setStatus(letterId, 'saved');
    const jobId = jobIdByLetterId[letterId];
    if (jobId !== undefined) {
      saveRecommendedJob(jobId).catch((error) => {
        setStatus(letterId, previousStatus);
        console.error(error);
      });
    }
  };

  const handleExpandLetter = (letterId: string) => {
    const jobId = jobIdByLetterId[letterId];
    const deckId = deckIdByLetterId[letterId];
    navigate(`/jobs/${jobId ?? letterId}`, {
      state: deckId ? { deckId, cardId: Number(letterId) } : undefined,
    });
  };

  const handleDismissLetter = (letterId: string) => {
    const previousStatus = resolveStatus(letterId);
    setStatus(letterId, 'dismissed');
    const deckId = deckIdByLetterId[letterId];
    if (deckId !== undefined) {
      dismissCard(deckId, Number(letterId)).catch((error) => {
        setStatus(letterId, previousStatus);
        console.error(error);
      });
    }
  };

  return {
    cardsQuery,
    letters,
    viewedLetterIds,
    markViewed,
    resolveStatus,
    handleSaveLetter,
    handleExpandLetter,
    handleDismissLetter,
  };
}
