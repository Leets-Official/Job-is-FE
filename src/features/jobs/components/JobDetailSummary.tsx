import StarIcon from '@/assets/icons/icon-star.svg?react';
import { Badge } from '@/components/common';
import type { JobDetail } from '@/features/jobs/types/jobDetail';

interface JobDetailSummaryProps {
  job: Pick<
    JobDetail,
    | 'sourceName'
    | 'postedDate'
    | 'rating'
    | 'title'
    | 'subtitle'
    | 'employmentType'
    | 'location'
    | 'dDayLabel'
  >;
}

export default function JobDetailSummary({ job }: JobDetailSummaryProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-body-small font-medium text-text-tertiary">
          <span>
            {job.sourceName} · {job.postedDate}
          </span>
          <StarIcon className="ml-1 size-4 text-warning-400" />
          <span>{job.rating.toFixed(1)}</span>
        </div>
        <h1 className="text-heading-medium font-bold text-text-primary">{job.title}</h1>
        <p className="text-body-medium font-medium text-text-secondary">{job.subtitle}</p>
      </div>
      <div className="h-px w-full bg-gray-200" />
      <div className="flex items-center gap-2">
        <Badge type="outline" color="disabled">
          {job.employmentType}
        </Badge>
        <Badge type="outline" color="disabled">
          {job.location}
        </Badge>
        <Badge type="outline" color="primary">
          {job.dDayLabel}
        </Badge>
      </div>
    </div>
  );
}
