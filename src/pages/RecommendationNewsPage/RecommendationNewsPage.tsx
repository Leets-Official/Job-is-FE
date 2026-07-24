import AppShell from '@/components/layout/AppShell';
import RecommendationNews from '@/features/recommendations/components/RecommendationNews';
import { RECOMMENDATION_NEWS_ITEMS } from '@/features/recommendations/data/recommendationNews';

export default function RecommendationNewsPage() {
  return (
    <AppShell activeTab="today">
      <RecommendationNews items={RECOMMENDATION_NEWS_ITEMS} />
    </AppShell>
  );
}
