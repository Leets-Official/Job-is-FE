import { useNavigate } from 'react-router';
import Button from '@/components/common/Button';
import AppShell from '@/components/layout/AppShell';
import RecommendationNoticePanel from '@/features/recommendations/components/RecommendationNoticePanel';

export default function RecommendationEmptyBeforeSendPage() {
  const navigate = useNavigate();

  return (
    <AppShell variant="guest">
      <RecommendationNoticePanel
        resultIconVariant="loading"
        title="오늘의 레터가 준비돼요"
        description={'잠시 후 오늘의 추천이 도착해요.\n준비되면 메일로도 알려드려요.'}
        footNote="발송 예정 시간 · 07:30"
      >
        <Button className="w-[414px]">새로고침</Button>
        <Button className="w-[414px]" variant="outline" onClick={() => navigate('/explore')}>
          탐색 둘러보기
        </Button>
      </RecommendationNoticePanel>
    </AppShell>
  );
}
