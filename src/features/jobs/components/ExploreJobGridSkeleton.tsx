import JobCard from '@/features/jobs/components/JobCard';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect width="1" height="1" fill="#e9ecef"/></svg>',
  );

const SKELETON_ITEMS = Array.from({ length: 6 }, (_, index) => index);

export default function ExploreJobGridSkeleton() {
  return (
    <div
      className="grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-live="polite"
    >
      {SKELETON_ITEMS.map((index) => (
        <JobCard
          key={index}
          className="w-full animate-pulse"
          thumbnailUrl={PLACEHOLDER_IMAGE}
          dDayLabel="D-day"
          matchScoreLabel="Match Score"
          avatarUrl={PLACEHOLDER_IMAGE}
          title="Job Title"
          companyName="[Company Name]"
          employmentInfo="Employment Info"
        />
      ))}
    </div>
  );
}
