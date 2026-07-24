import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import AppShell from '@/components/layout/AppShell';
import RecommendationLetterCard from '@/features/recommendations/components/RecommendationLetterCard';
import RecommendationLetterCarousel from '@/features/recommendations/components/RecommendationLetterCarousel';
import RecommendationStatusTabs from '@/features/recommendations/components/RecommendationStatusTabs';
import { RECOMMENDATION_LETTERS } from '@/features/recommendations/data/recommendationLetters';
import {
  getRecommendationLetterStatus,
  useRecommendationDeckStore,
  type RecommendationLetterStatus,
} from '@/features/recommendations/hooks/useRecommendationDeckStore';

const STATUS_TABS: { label: string; status: RecommendationLetterStatus }[] = [
  { label: '저장됨', status: 'saved' },
  { label: '관심 없음', status: 'dismissed' },
  { label: '미처리', status: 'unprocessed' },
];

const EMPTY_MESSAGE: Record<RecommendationLetterStatus, string> = {
  saved: '저장한 공고가 아직 없어요.',
  dismissed: '관심 없음으로 표시한 공고가 아직 없어요.',
  unprocessed: '아직 확인하지 않은 공고가 없어요.',
};

export default function RecommendationRevisitPage() {
  const navigate = useNavigate();
  const statusByLetterId = useRecommendationDeckStore((state) => state.statusByLetterId);
  const setStatus = useRecommendationDeckStore((state) => state.setStatus);
  const statusIndex = useRecommendationDeckStore((state) => state.revisitStatusIndex);
  const setStatusIndex = useRecommendationDeckStore((state) => state.setRevisitStatusIndex);
  const cardIndex = useRecommendationDeckStore((state) => state.revisitCardIndex);
  const setCardIndex = useRecommendationDeckStore((state) => state.setRevisitCardIndex);

  const activeStatus = STATUS_TABS[statusIndex].status;
  const filteredLetters = useMemo(
    () =>
      RECOMMENDATION_LETTERS.filter(
        (letter) => getRecommendationLetterStatus(statusByLetterId, letter.id) === activeStatus,
      ),
    [statusByLetterId, activeStatus],
  );

  const displayIndex = Math.min(cardIndex, Math.max(filteredLetters.length - 1, 0));
  const letter = filteredLetters[displayIndex];

  function handleTabChange(index: number) {
    setStatusIndex(index);
    setCardIndex(0);
  }

  return (
    <AppShell activeTab="today">
      <RecommendationLetterCarousel
        current={filteredLetters.length === 0 ? 0 : displayIndex + 1}
        total={filteredLetters.length}
        onPrev={() => setCardIndex(Math.max(displayIndex - 1, 0))}
        onNext={() => setCardIndex(Math.min(displayIndex + 1, filteredLetters.length - 1))}
        prevDisabled={displayIndex === 0}
        nextDisabled={displayIndex >= filteredLetters.length - 1}
        filterSlot={
          <RecommendationStatusTabs
            tabs={STATUS_TABS.map((tab) => tab.label)}
            activeIndex={statusIndex}
            onChange={handleTabChange}
          />
        }
      >
        {letter ? (
          <RecommendationLetterCard
            {...letter}
            onExpand={() => navigate(`/jobs/${letter.id}`)}
            onSave={() => setStatus(letter.id, 'saved')}
            onDismiss={() => setStatus(letter.id, 'dismissed')}
          />
        ) : (
          <div className="flex w-full max-w-130 flex-col items-center gap-2 rounded-sm border border-gray-200 bg-white p-10 text-center">
            <p className="text-body-large font-medium text-text-secondary">
              {EMPTY_MESSAGE[activeStatus]}
            </p>
          </div>
        )}
      </RecommendationLetterCarousel>
    </AppShell>
  );
}
