import { useParams } from 'react-router';
import { Spinner } from '@/components/feedback';
import RecommendationNewsDetailMain from '@/features/recommendations/components/RecommendationNewsDetailMain';
import { useContentDetail } from '@/features/recommendations/hooks/useContents';
import { mapContentDetail } from '@/features/recommendations/utils/mapContent';

export default function RecommendationNewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const contentQuery = useContentDetail(Number(id));

  return (
    <div className="flex min-h-0 w-full flex-1 items-start justify-center bg-gray-50 px-3 py-10">
      <div className="flex w-full max-w-160 flex-col">
        {contentQuery.isLoading || !contentQuery.data ? (
          <div className="flex w-full items-center justify-center py-20">
            <Spinner />
          </div>
        ) : (
          <RecommendationNewsDetailMain
            newsDetail={mapContentDetail(contentQuery.data)}
            backTo="/recommendations/news"
            backLabel="오늘의 소식으로"
          />
        )}
      </div>
    </div>
  );
}
