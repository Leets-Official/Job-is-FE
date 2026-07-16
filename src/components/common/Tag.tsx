import { type ComponentPropsWithRef } from 'react';
import CloseIcon from '@/assets/icons/icon-close.svg?react';
import { cn } from '@/utils/cn';

interface TagProps extends ComponentPropsWithRef<'span'> {
  label: string;
  onRemove?: () => void;
}

export default function Tag({ className, ref, label, onRemove, ...props }: TagProps) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex h-8 items-center gap-0.5 rounded-full border border-gray-200 bg-white px-2.5 py-2 text-base font-medium text-text-primary',
        className,
      )}
      {...props}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`${label} 삭제`}
          className="flex size-4 items-center justify-center"
        >
          <CloseIcon className="size-4" />
        </button>
      )}
    </span>
  );
}
