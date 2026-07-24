import { Badge } from '@/components/common';
import type {
  JobDetailFitCriterionItem,
  JobDetailFitStatus,
} from '@/features/jobs/types/jobDetail';
import { cn } from '@/utils/cn';

const STATUS_STYLE: Record<
  JobDetailFitStatus,
  { icon: string; label: string; badgeColor: 'ok' | 'est' | 'warn'; boxClassName: string }
> = {
  met: { icon: '✓', label: '충족', badgeColor: 'ok', boxClassName: 'bg-primary-50' },
  estimated: { icon: '~', label: '주의', badgeColor: 'est', boxClassName: 'bg-info-50' },
  caution: { icon: '!', label: '주의', badgeColor: 'warn', boxClassName: 'bg-warning-50' },
};

interface JobDetailFitCriteriaProps {
  items: JobDetailFitCriterionItem[];
}

export default function JobDetailFitCriteria({ items }: JobDetailFitCriteriaProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-heading-xxsmall font-bold text-text-primary">당신의 기준으로 따져봤어요</p>
      <div className="flex w-full flex-col gap-2">
        {items.map((item, index) => {
          const status = STATUS_STYLE[item.status];

          return (
            <div
              key={`${item.title}-${index}`}
              className={cn('flex items-start gap-2 rounded-sm p-4', status.boxClassName)}
            >
              <Badge type="solid" color={status.badgeColor} className="mt-0.5 shrink-0">
                {status.icon} {status.label}
              </Badge>
              <p className="text-body-small font-medium text-text-primary">
                <span className="font-bold">{item.title}</span> — {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
