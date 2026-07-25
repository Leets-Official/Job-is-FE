import RecommendationNews from '@/features/recommendations/components/RecommendationNews';
import { RECOMMENDATION_NEWS_ITEMS } from '@/features/recommendations/mocks/recommendationNews';

export default function RecommendationNewsPage() {
  return (
    <div className="flex min-h-0 w-full flex-1 items-center justify-center bg-gray-50 px-3 py-10">
      <RecommendationNews items={RECOMMENDATION_NEWS_ITEMS} />
    </div>
  );
}
