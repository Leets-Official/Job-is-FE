import JobDetailAtAGlance from '@/features/jobs/components/JobDetailAtAGlance';
import JobDetailContent from '@/features/jobs/components/JobDetailContent';
import JobDetailEditorNote from '@/features/jobs/components/JobDetailEditorNote';
import JobDetailFitCriteria from '@/features/jobs/components/JobDetailFitCriteria';
import JobDetailMatchReasons from '@/features/jobs/components/JobDetailMatchReasons';
import JobDetailSummary from '@/features/jobs/components/JobDetailSummary';
import type { JobDetail } from '@/features/jobs/types/jobDetail';

interface JobDetailMainProps {
  job: JobDetail;
}

export default function JobDetailMain({ job }: JobDetailMainProps) {
  return (
    <div className="flex w-full flex-col gap-6 rounded-sm border border-gray-300 bg-white p-6">
      <JobDetailSummary job={job} />
      <JobDetailAtAGlance items={job.glanceItems} />
      <JobDetailFitCriteria items={job.fitCriteria} />
      <JobDetailEditorNote note={job.editorNote} />
      <JobDetailMatchReasons matchScore={job.matchScore} reasons={job.matchReasons} />
      <JobDetailContent sections={job.contentSections} techStack={job.techStack} />
    </div>
  );
}
