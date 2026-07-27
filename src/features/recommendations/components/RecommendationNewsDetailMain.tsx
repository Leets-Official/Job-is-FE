import { Link } from 'react-router';
import ChevronLeftIcon from '@/assets/icons/icon-chevron-left.svg?react';
import RecommendationNewsDetailApplicationInfo from '@/features/recommendations/components/RecommendationNewsDetailApplicationInfo';
import RecommendationNewsDetailOverview from '@/features/recommendations/components/RecommendationNewsDetailOverview';
import RecommendationNewsDetailSourceCard from '@/features/recommendations/components/RecommendationNewsDetailSourceCard';
import RecommendationNewsDetailSummary from '@/features/recommendations/components/RecommendationNewsDetailSummary';
import type { RecommendationNewsDetail } from '@/features/recommendations/types/recommendationNewsDetail';

interface RecommendationNewsDetailMainProps {
  newsDetail: RecommendationNewsDetail;
  backTo: string;
  backLabel: string;
}

export default function RecommendationNewsDetailMain({
  newsDetail,
  backTo,
  backLabel,
}: RecommendationNewsDetailMainProps) {
  return (
    <div className="flex w-full flex-col gap-6 rounded-sm border border-gray-300 bg-white p-6">
      <Link
        to={backTo}
        className="inline-flex w-fit items-center gap-1 rounded-full border border-primary-200 bg-transparent px-4 py-2 text-body-small font-medium text-text-secondary hover:bg-primary-50"
      >
        <ChevronLeftIcon className="size-4" />
        {backLabel}
      </Link>
      <RecommendationNewsDetailSummary newsDetail={newsDetail} />
      <RecommendationNewsDetailOverview summary={newsDetail.summary} />
      <RecommendationNewsDetailApplicationInfo
        title={newsDetail.applicationInfoTitle}
        rows={newsDetail.applicationInfo}
      />
      <RecommendationNewsDetailSourceCard source={newsDetail.source} />
    </div>
  );
}
