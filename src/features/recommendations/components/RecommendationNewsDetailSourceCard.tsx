import { Link } from '@/components/common';
import type { RecommendationNewsDetailSource } from '@/features/recommendations/types/recommendationNewsDetail';

interface RecommendationNewsDetailSourceCardProps {
  source: RecommendationNewsDetailSource;
}

export default function RecommendationNewsDetailSourceCard({
  source,
}: RecommendationNewsDetailSourceCardProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-heading-xxsmall font-bold text-text-primary">출처</p>
      <div className="flex flex-col gap-1">
        <p className="text-body-small font-bold text-text-primary">{source.siteName}</p>
        <p className="text-body-small font-medium text-text-tertiary">
          등록 {source.registeredDate}
        </p>
      </div>
      <Link href={source.originalUrl} target="_blank" rel="noreferrer" className="text-body-small">
        원문 보기
      </Link>
    </div>
  );
}
