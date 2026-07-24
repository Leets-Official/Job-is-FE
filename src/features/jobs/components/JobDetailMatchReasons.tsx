import { Badge, ProgressStepper } from '@/components/common';
import type { JobDetailMatchReason } from '@/features/jobs/types/jobDetail';

interface JobDetailMatchReasonsProps {
  matchScore: number;
  reasons: JobDetailMatchReason[];
}

export default function JobDetailMatchReasons({ matchScore, reasons }: JobDetailMatchReasonsProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <p className="text-heading-xxsmall font-bold text-text-primary">왜 추천했나요</p>
        <Badge type="solid" color="primary">
          적합도 {matchScore}%
        </Badge>
      </div>
      <ProgressStepper
        steps={reasons.map((reason) => ({ label: reason.label, progress: reason.progress }))}
      />
    </div>
  );
}
