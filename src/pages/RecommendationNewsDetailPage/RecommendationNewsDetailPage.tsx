import { useParams } from 'react-router';
import AppShell from '@/components/layout/AppShell';
import RecommendationNewsDetailMain from '@/features/recommendations/components/RecommendationNewsDetailMain';
import { mockRecommendationNewsDetail } from '@/features/recommendations/mocks/recommendationNewsDetail';

export default function RecommendationNewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const newsDetail = { ...mockRecommendationNewsDetail, id: id ?? mockRecommendationNewsDetail.id };

  return (
    <AppShell activeTab="today">
      <div className="flex w-full max-w-160 flex-col">
        <RecommendationNewsDetailMain
          newsDetail={newsDetail}
          backTo="/today/news"
          backLabel="오늘의 소식으로"
        />
      </div>
    </AppShell>
  );
}
