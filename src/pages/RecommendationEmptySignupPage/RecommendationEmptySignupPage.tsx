import { useNavigate } from 'react-router';
import Button from '@/components/common/Button';
import RecommendationNoticePanel from '@/features/recommendations/components/RecommendationNoticePanel';

export default function RecommendationEmptySignupPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-0 w-full flex-1 items-center justify-center bg-gray-50 px-3 py-10">
      <RecommendationNoticePanel
        resultIconVariant="loading"
        title="첫 레터를 준비하고 있어요"
        description={'내일 아침 첫 레터가 도착해요.\n프로필을 채우면 더 정확해져요.'}
        footNote="첫 레터 도착 예정 · 07:30"
      >
        <Button className="w-[414px]">프로필 채우기</Button>
        <Button className="w-[414px]" variant="outline" onClick={() => navigate('/explore')}>
          탐색 둘러보기
        </Button>
      </RecommendationNoticePanel>
    </div>
  );
}
