import { useNavigate } from 'react-router';
import { generateTodayDeck } from '@/api/recommendations';
import { Button, NoticePanel } from '@/components/common';
import RecommendationScreenLayout from './RecommendationScreenLayout';

export type RecommendationEmptyVariant = 'empty-candidates' | 'empty-signup' | 'empty-before-send';

const NOTICE_BY_VARIANT: Record<
  RecommendationEmptyVariant,
  {
    icon: 'warning' | 'loading';
    title: string;
    description: string;
    footNote: string;
    primary: string;
  }
> = {
  'empty-candidates': {
    icon: 'warning',
    title: '오늘은 딱 맞는 공고가 적어요',
    description: '오늘은 조건에 맞는 공고를 찾지 못했어요.\n내일 아침 다시 골라 보내 드릴게요.',
    footNote: '메일함에서 지난 레터를 확인할 수 있어요.',
    primary: '조건 넓히기',
  },
  'empty-signup': {
    icon: 'loading',
    title: '첫 레터를 준비하고 있어요',
    description: '내일 아침 첫 레터가 도착해요.\n프로필을 채우면 더 정확해져요.',
    footNote: '첫 레터 도착 예정 · 07:30',
    primary: '프로필 채우기',
  },
  'empty-before-send': {
    icon: 'loading',
    title: '오늘의 레터가 준비돼요',
    description: '잠시 후 오늘의 추천이 도착해요.\n준비되면 메일로도 알려드려요.',
    footNote: '발송 예정 시간 · 07:30',
    primary: '새로고침',
  },
};

export default function RecommendationEmptyScreen({
  variant,
}: {
  variant: RecommendationEmptyVariant;
}) {
  const navigate = useNavigate();
  const notice = NOTICE_BY_VARIANT[variant];

  const handlePrimaryAction = () => {
    if (variant === 'empty-candidates') {
      navigate('/explore');
      return;
    }

    if (variant === 'empty-signup') {
      navigate('/onboarding');
      return;
    }

    generateTodayDeck()
      .catch(console.error)
      .finally(() => window.location.reload());
  };

  return (
    <RecommendationScreenLayout>
      <NoticePanel
        resultIconVariant={notice.icon}
        title={notice.title}
        description={notice.description}
        footNote={notice.footNote}
      >
        <Button className="w-103.5" onClick={handlePrimaryAction}>
          {notice.primary}
        </Button>
        <Button className="w-103.5" variant="outline" onClick={() => navigate('/explore')}>
          탐색 둘러보기
        </Button>
      </NoticePanel>
    </RecommendationScreenLayout>
  );
}
