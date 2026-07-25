import type { JobDetailGlanceItem } from '@/features/jobs/types/jobDetail';

interface JobDetailAtAGlanceProps {
  items: JobDetailGlanceItem[];
}

export default function JobDetailAtAGlance({ items }: JobDetailAtAGlanceProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-label-small font-semibold tracking-wide text-text-tertiary uppercase">
        At a Glance
      </p>
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1 rounded-sm border border-gray-200 bg-gray-50 p-4"
          >
            <span className="text-body-small font-medium text-text-tertiary">{item.label}</span>
            <span className="text-body-large font-bold text-text-primary">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
