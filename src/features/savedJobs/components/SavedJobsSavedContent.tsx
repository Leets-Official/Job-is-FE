import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';
import SavedJobsEmptyState from '@/features/savedJobs/components/SavedJobsEmptyState';
import { type SavedJobListing } from '@/features/savedJobs/types/savedJob';
import { cn } from '@/utils/cn';

interface SavedJobsSavedContentProps {
  jobs: SavedJobListing[];
  onBrowseRecommendations: () => void;
  onExplore: () => void;
}

function SavedJobRow({ job }: { job: SavedJobListing }) {
  return (
    <div className="flex w-full items-center justify-between rounded-xs border border-gray-400 bg-white p-6">
      <div>
        <p
          className={cn(
            'text-body-small font-bold',
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
        <Button disabled={job.closed} className="h-10">
          보기
        </Button>
        <Button variant="outline" disabled={job.closed} className="h-10">
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
      <div className="flex w-full flex-1 items-center justify-center">
        <SavedJobsEmptyState
          title="아직 저장한 공고가 없어요"
          description="마음에 드는 공고를 저장해 두면 여기에 모여요."
          onBrowseRecommendations={onBrowseRecommendations}
          onExplore={onExplore}
        />
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full justify-end">
        <Dropdown
          placeholder="저장일 순"
          size="sm"
          className="w-25"
          options={[{ label: '저장일 순', value: 'latest' }]}
          value="latest"
          onChange={() => {}}
        />
      </div>

      {jobs.map((job) => (
        <SavedJobRow key={job.id} job={job} />
      ))}
    </>
  );
}
