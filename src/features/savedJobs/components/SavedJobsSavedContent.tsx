import ChevronDownIcon from '@/assets/icons/icon-chevron-down.svg?react';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import SavedJobsEmptyState from '@/features/savedJobs/components/SavedJobsEmptyState';
import { type SavedJob } from '@/features/savedJobs/mocks/savedJobsMock';
import { cn } from '@/utils/cn';

interface SavedJobsSavedContentProps {
  jobs: SavedJob[];
  onBrowseRecommendations: () => void;
  onExplore: () => void;
}

function SavedJobRow({ job }: { job: SavedJob }) {
  return (
    <div className="flex w-full items-center justify-between rounded-xs border border-gray-400 bg-white p-6">
      <div>
        <p
          className={cn(
            'text-body-small font-medium',
            job.closed ? 'text-text-secondary' : 'text-text-primary',
          )}
        >
          {job.title}
        </p>
        <p className="text-body-small font-medium text-text-tertiary">{job.meta}</p>
      </div>

      <div className="flex items-center gap-2.5">
        {job.badges.map((badge) => (
          <Badge key={badge.label} color={badge.color} className="h-6.25">
            {badge.label}
          </Badge>
        ))}
        <Button
          disabled={job.closed}
          className={cn('h-10', job.closed && 'disabled:bg-gray-200 disabled:text-gray-500')}
        >
          보기
        </Button>
        <Button
          variant="outline"
          disabled={job.closed}
          className={cn('h-10', job.closed && 'disabled:text-gray-500')}
        >
          해제
        </Button>
      </div>
    </div>
  );
}

export default function SavedJobsSavedContent({
  jobs,
  onBrowseRecommendations,
  onExplore,
}: SavedJobsSavedContentProps) {
  if (jobs.length === 0) {
    return (
      <SavedJobsEmptyState
        title="아직 저장한 공고가 없어요"
        description="마음에 드는 공고를 저장해 두면 여기에 모여요."
        onBrowseRecommendations={onBrowseRecommendations}
        onExplore={onExplore}
      />
    );
  }

  return (
    <>
      <div className="flex w-full justify-end">
        <div className="relative">
          <select
            defaultValue="latest"
            className="h-10 w-25 appearance-none rounded-sm border border-gray-700 bg-white py-2 pr-8 pl-4 text-body-small font-medium text-text-primary focus:border-primary-500 focus:outline-none"
          >
            <option value="latest">저장일 순</option>
          </select>
          <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-2 size-6 -translate-y-1/2 text-black" />
        </div>
      </div>

      {jobs.map((job) => (
        <SavedJobRow key={job.id} job={job} />
      ))}
    </>
  );
}
