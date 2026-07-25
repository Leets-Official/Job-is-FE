import { useNavigate } from 'react-router';
import Button from '@/components/common/Button';
import AppShell from '@/components/layout/AppShell';
import RecommendationNoticePanel from '@/features/recommendations/components/RecommendationNoticePanel';

export default function RecommendationEmptyCandidatesPage() {
  const navigate = useNavigate();

  return (
    <AppShell variant="guest">
      <RecommendationNoticePanel
        resultIconVariant="warning"
        title="오늘은 딱 맞는 공고가 적어요"
        description={'오늘은 조건에 맞는 공고를 찾지 못했어요.\n내일 아침 다시 골라 보내 드릴게요.'}
        footNote="메일함에서 지난 레터를 확인할 수 있어요."
      >
        <Button className="w-[414px]" onClick={() => navigate('/explore')}>
          조건 넓히기
        </Button>
        <Button className="w-[414px]" variant="outline" onClick={() => navigate('/explore')}>
          탐색 둘러보기
        </Button>
      </RecommendationNoticePanel>
    </AppShell>
  );
}
