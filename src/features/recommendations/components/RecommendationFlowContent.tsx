import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '@/components/common/Button';
import RecommendationCompletion from './RecommendationCompletion';
import RecommendationGreeting from './RecommendationGreeting';
import RecommendationLetterCard from './RecommendationLetterCard';
import RecommendationLetterCarousel from './RecommendationLetterCarousel';
import RecommendationNews from './RecommendationNews';
import RecommendationNoticePanel from './RecommendationNoticePanel';
import RecommendationPendingContent from './RecommendationPendingContent';
import RecommendationStatusTabs from './RecommendationStatusTabs';
import { RECOMMENDATION_LETTERS } from '../mocks/recommendationLetters';
import { RECOMMENDATION_NEWS_ITEMS } from '../mocks/recommendationNews';
import {
  getRecommendationLetterStatus,
  type RecommendationLetterStatus,
  useRecommendationDeckStore,
} from '../store/useRecommendationDeckStore';
import type { RecommendationIntroAnimationMode } from '../hooks/useRecommendationIntroAnimation';

export type RecommendationScreen =
  | 'pending'
  | 'intro'
  | 'deck'
  | 'news'
  | 'complete'
  | 'revisit'
  | 'empty-candidates'
  | 'empty-signup'
  | 'empty-before-send';

const DECK = [
  ...RECOMMENDATION_LETTERS.map((letter) => ({ type: 'card', letter }) as const),
  { type: 'news' } as const,
];

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

function ScreenLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-0 w-full flex-1 items-center justify-center bg-gray-50 px-3 py-10">
      {children}
    </div>
  );
}

export default function RecommendationFlowContent({
  screen,
  introAnimationMode = 'none',
}: {
  screen: RecommendationScreen;
  introAnimationMode?: RecommendationIntroAnimationMode;
}) {
  const navigate = useNavigate();
  const setStatus = useRecommendationDeckStore((state) => state.setStatus);
  const markViewed = useRecommendationDeckStore((state) => state.markViewed);
  const statusByLetterId = useRecommendationDeckStore((state) => state.statusByLetterId);
  const viewedLetterIds = useRecommendationDeckStore((state) => state.viewedLetterIds);
  const [deckIndex, setDeckIndex] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const deckStep = DECK[deckIndex];
  const activeStatus = STATUS_TABS[statusIndex].status;
  const filteredLetters = useMemo(
    () =>
      RECOMMENDATION_LETTERS.filter(
        (letter) => getRecommendationLetterStatus(statusByLetterId, letter.id) === activeStatus,
      ),
    [statusByLetterId, activeStatus],
  );

  useEffect(() => {
    if (screen === 'deck' && deckStep.type === 'card') markViewed(deckStep.letter.id);
  }, [deckStep, markViewed, screen]);

  if (screen === 'pending') return <RecommendationPendingContent />;

  if (screen === 'intro') {
    return (
      <ScreenLayout>
        <RecommendationGreeting
          reviewedCount={847}
          matchedCount={5}
          focusDescription="오늘은 성장기 스타트업 · 데이터 직무 위주로 골랐습니다."
          animationMode={introAnimationMode}
          onStart={() =>
            navigate('/recommendations/deck', { state: { transition: 'recommendation-flow' } })
          }
        />
      </ScreenLayout>
    );
  }

  if (screen === 'deck') {
    const isLastStep = deckIndex === DECK.length - 1;
    const goNext = () => {
      if (isLastStep) {
        navigate('/recommendations/complete', { state: { transition: 'recommendation-flow' } });
      } else setDeckIndex((previous) => previous + 1);
    };

    return (
      <ScreenLayout>
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
            <RecommendationNews items={RECOMMENDATION_NEWS_ITEMS} />
          ) : (
            <RecommendationLetterCard
              {...deckStep.letter}
              onExpand={() => navigate(`/jobs/${deckStep.letter.id}`)}
              onSave={() => {
                setStatus(deckStep.letter.id, 'saved');
                goNext();
              }}
              onDismiss={() => {
                setStatus(deckStep.letter.id, 'dismissed');
                goNext();
              }}
            />
          )}
        </RecommendationLetterCarousel>
      </ScreenLayout>
    );
  }

  if (screen === 'news') {
    return (
      <ScreenLayout>
        <RecommendationNews items={RECOMMENDATION_NEWS_ITEMS} />
      </ScreenLayout>
    );
  }

  if (screen === 'complete') {
    const savedCount = RECOMMENDATION_LETTERS.filter(
      (letter) => getRecommendationLetterStatus(statusByLetterId, letter.id) === 'saved',
    ).length;
    const dismissedCount = RECOMMENDATION_LETTERS.filter(
      (letter) => getRecommendationLetterStatus(statusByLetterId, letter.id) === 'dismissed',
    ).length;
    const viewedCount = RECOMMENDATION_LETTERS.filter(
      (letter) => viewedLetterIds[letter.id],
    ).length;

    return (
      <ScreenLayout>
        <RecommendationCompletion
          savedCount={savedCount}
          dismissedCount={dismissedCount}
          viewedCount={viewedCount}
          nextLetterNotice="내일 오전 7시 30분경, 다음 레터가 도착해요."
          onViewSaved={() => navigate('/recommendations/revisit')}
          onExplore={() => navigate('/explore')}
        />
      </ScreenLayout>
    );
  }

  if (screen === 'revisit') {
    const displayIndex = Math.min(cardIndex, Math.max(filteredLetters.length - 1, 0));
    const letter = filteredLetters[displayIndex];
    return (
      <ScreenLayout>
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
              onChange={(index) => {
                setStatusIndex(index);
                setCardIndex(0);
              }}
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
      </ScreenLayout>
    );
  }

  const notice = {
    'empty-candidates': {
      icon: 'warning' as const,
      title: '오늘은 딱 맞는 공고가 적어요',
      description: '오늘은 조건에 맞는 공고를 찾지 못했어요.\n내일 아침 다시 골라 보내 드릴게요.',
      footNote: '메일함에서 지난 레터를 확인할 수 있어요.',
      primary: '조건 넓히기',
    },
    'empty-signup': {
      icon: 'loading' as const,
      title: '첫 레터를 준비하고 있어요',
      description: '내일 아침 첫 레터가 도착해요.\n프로필을 채우면 더 정확해져요.',
      footNote: '첫 레터 도착 예정 · 07:30',
      primary: '프로필 채우기',
    },
    'empty-before-send': {
      icon: 'loading' as const,
      title: '오늘의 레터가 준비돼요',
      description: '잠시 후 오늘의 추천이 도착해요.\n준비되면 메일로도 알려드려요.',
      footNote: '발송 예정 시간 · 07:30',
      primary: '새로고침',
    },
  }[screen];
  const handlePrimaryAction = () => {
    if (screen === 'empty-candidates') {
      navigate('/explore');
      return;
    }

    if (screen === 'empty-signup') {
      navigate('/onboarding');
      return;
    }

    window.location.reload();
  };

  return (
    <ScreenLayout>
      <RecommendationNoticePanel
        resultIconVariant={notice.icon}
        title={notice.title}
        description={notice.description}
        footNote={notice.footNote}
      >
        <Button className="w-[414px]" onClick={handlePrimaryAction}>
          {notice.primary}
        </Button>
        <Button className="w-[414px]" variant="outline" onClick={() => navigate('/explore')}>
          탐색 둘러보기
        </Button>
      </RecommendationNoticePanel>
    </ScreenLayout>
  );
}
