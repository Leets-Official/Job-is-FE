import { type ComponentPropsWithRef } from 'react';
import { cn } from '@/utils/cn';

type ButtonProps = ComponentPropsWithRef<'button'>;

export default function Button({ className, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white',
        className,
      )}
      {...props}
    />
  );
}
