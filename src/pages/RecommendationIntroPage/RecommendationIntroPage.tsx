import { useNavigate } from 'react-router';
import RecommendationGreeting from '@/features/recommendations/components/RecommendationGreeting';

export default function RecommendationIntroPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-0 w-full flex-1 items-center justify-center bg-gray-50 px-3 py-10">
      <RecommendationGreeting
        reviewedCount={847}
        matchedCount={5}
        focusDescription="오늘은 성장기 스타트업 · 데이터 직무 위주로 골랐습니다."
        onStart={() => navigate('/today/deck')}
      />
    </div>
  );
}
