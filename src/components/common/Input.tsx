import { type ComponentPropsWithRef } from 'react';
import { cn } from '@/utils/cn';

type InputProps = ComponentPropsWithRef<'input'>;

export default function Input({ className, ref, type = 'text', ...props }: InputProps) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'h-12 w-full rounded-[6px] border border-gray-700 bg-white px-4 text-base font-medium text-text-primary placeholder:text-gray-600',
        className,
      )}
      {...props}
    />
  );
}
