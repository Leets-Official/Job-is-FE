import { cn } from '@/utils/cn';

type RateProps = {
  value: number;
  max?: number;
  label?: string;
  className?: string;
};

export default function Rate({ value, max = 5, label = 'percentage', className }: RateProps) {
  return (
    <div className={cn('inline-flex items-center gap-1', className)}>
      {Array.from({ length: max }, (_, index) => (
        <span
          key={index}
          className={cn(
            'size-2 shrink-0 rounded-full',
            index < value ? 'bg-primary-400' : 'bg-gray-300',
          )}
        />
      ))}
      <span className="text-label-xsmall leading-[15px] font-medium text-black">{label}</span>
    </div>
  );
}
