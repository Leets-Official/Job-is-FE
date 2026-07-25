import { cn } from '@/utils/cn';

interface RecommendationStatusTabsProps {
  tabs: string[];
  activeIndex: number;
  onChange?: (index: number) => void;
  className?: string;
}

export default function RecommendationStatusTabs({
  tabs,
  activeIndex,
  onChange,
  className,
}: RecommendationStatusTabsProps) {
  return (
    <div className={cn('inline-flex items-center gap-3', className)}>
      {tabs.map((label, index) => {
        const active = index === activeIndex;

        return (
          <button
            key={label}
            type="button"
            onClick={() => onChange?.(index)}
            className={cn(
              'flex h-12 items-center justify-center rounded-full px-6 text-[18px] font-bold whitespace-nowrap',
              active
                ? 'bg-primary-600 text-gray-900'
                : 'border border-gray-200 bg-white text-text-primary hover:bg-gray-50',
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
