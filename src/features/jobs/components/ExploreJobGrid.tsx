import { Link } from 'react-router';
import JobCard from '@/features/jobs/components/JobCard';
import type { ExploreJobSummary } from '@/features/jobs/types/exploreJob';

interface ExploreJobGridProps {
  jobs: ExploreJobSummary[];
}

export default function ExploreJobGrid({ jobs }: ExploreJobGridProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <Link key={job.id} to={`/jobs/${job.id}`} className="w-full">
          <JobCard
            className="w-full"
            thumbnailUrl={job.thumbnailUrl}
            dDayLabel={job.dDayLabel}
            matchScoreLabel={job.matchScoreLabel}
            avatarUrl={job.avatarUrl}
            title={job.title}
            companyName={job.companyName}
            employmentInfo={job.employmentInfo}
            onMoreClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          />
        </Link>
      ))}
    </div>
  );
}
