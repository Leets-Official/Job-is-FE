import { Badge } from '@/components/common';
import { ProgressStepper } from '@/components/feedback';
import type { JobDetailMatchReason } from '@/features/jobs/types/jobDetail';

interface JobDetailMatchReasonsProps {
  matchScore: number;
  reasons: JobDetailMatchReason[];
}

export default function JobDetailMatchReasons({ matchScore, reasons }: JobDetailMatchReasonsProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <p className="text-label-small font-medium text-text-tertiary">왜 추천했나요</p>
        <Badge type="outline" color="primary">
          적합도 {matchScore}%
        </Badge>
      </div>
      <ProgressStepper
        steps={reasons.map((reason) => ({ label: reason.label, progress: reason.progress }))}
      />
    </div>
  );
}
