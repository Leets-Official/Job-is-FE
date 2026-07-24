import { useNavigate } from 'react-router';
import AppShell from '@/components/layout/AppShell';
import RecommendationGreeting from '@/features/recommendations/components/RecommendationGreeting';
import { useRecommendationDeckStore } from '@/features/recommendations/hooks/useRecommendationDeckStore';

export default function RecommendationIntroPage() {
  const navigate = useNavigate();
  const setDeckIndex = useRecommendationDeckStore((state) => state.setDeckIndex);

  return (
    <AppShell activeTab="today">
      <RecommendationGreeting
        reviewedCount={847}
        matchedCount={5}
        focusDescription="오늘은 성장기 스타트업 · 데이터 직무 위주로 골랐습니다."
        onStart={() => {
          setDeckIndex(0);
          navigate('/today/deck');
        }}
      />
    </AppShell>
  );
}
