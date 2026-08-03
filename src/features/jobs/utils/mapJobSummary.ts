import type { JobSummary } from '@/api/jobs';
import type { ExploreJobSummary } from '@/features/jobs/types/exploreJob';
import { formatDDayLabel } from '@/utils/formatDDayLabel';

export function mapJobSummary(job: JobSummary): ExploreJobSummary {
  return {
    id: job.id,
    thumbnailUrl: job.thumbnailUrl,
    dDayLabel: formatDDayLabel(job.dueTime),
    title: job.position,
    companyName: job.companyName,
    employmentInfo: `${job.employmentType} · ${job.careerLevel}`,
    isRemote: job.remoteAvailable,
  };
}
