import { type ComponentPropsWithRef } from 'react';
import { cn } from '@/utils/cn';

type ToggleSwitchProps = ComponentPropsWithRef<'input'>;

export default function ToggleSwitch({ className, id, disabled, ...props }: ToggleSwitchProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'relative inline-flex h-6 w-10 shrink-0 items-center rounded-full bg-gray-200 p-0.5 transition-colors',
        'has-checked:bg-primary-400',
        'has-disabled:bg-gray-200',
        className,
      )}
    >
      <input id={id} type="checkbox" disabled={disabled} className="peer sr-only" {...props} />
      <span
        className={cn(
          'pointer-events-none size-5 rounded-full bg-white transition-transform',
          'peer-checked:translate-x-4',
          'peer-disabled:bg-gray-400',
        )}
      />
    </label>
  );
}
