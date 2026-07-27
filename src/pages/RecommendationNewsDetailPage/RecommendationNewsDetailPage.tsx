import { useParams } from 'react-router';
import RecommendationNewsDetailMain from '@/features/recommendations/components/RecommendationNewsDetailMain';
import { mockRecommendationNewsDetail } from '@/features/recommendations/mocks/recommendationNewsDetail';

export default function RecommendationNewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const newsDetail = { ...mockRecommendationNewsDetail, id: id ?? mockRecommendationNewsDetail.id };

  return (
    <div className="flex min-h-0 w-full flex-1 items-start justify-center bg-gray-50 px-3 py-10">
      <div className="flex w-full max-w-160 flex-col">
        <RecommendationNewsDetailMain
          newsDetail={newsDetail}
          backTo="/recommendations/news"
          backLabel="오늘의 소식으로"
        />
      </div>
    </div>
  );
}
