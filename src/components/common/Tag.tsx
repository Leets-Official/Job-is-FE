import { type ComponentPropsWithRef } from 'react';
import CloseIcon from '@/assets/icons/icon-close.svg?react';
import HashIcon from '@/assets/icons/icon-hash.svg?react';
import PlusIcon from '@/assets/icons/icon-plus.svg?react';
import { cn } from '@/utils/cn';

type TagVariant = 'removable' | 'add' | 'hash' | 'select';

type TagProps = ComponentPropsWithRef<'button'> & {
  variant?: TagVariant;
  label: string;
  selected?: boolean;
};

export default function Tag({
  className,
  variant = 'removable',
  label,
  selected = false,
  type = 'button',
  ...props
}: TagProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-10 cursor-pointer items-center justify-center gap-0.5 rounded-full border px-3 text-base leading-6 font-normal transition-colors duration-150 active:scale-95',
        variant === 'select' && selected
          ? 'border-transparent bg-primary-600 text-text-primary'
          : 'border-gray-200 bg-white text-gray-900',
        className,
      )}
      {...props}
      aria-pressed={variant === 'select' ? selected : undefined}
    >
      {variant === 'add' && <PlusIcon className="size-4" />}
      {variant === 'hash' && <HashIcon className="size-4" />}
      {label}
      {variant === 'removable' && <CloseIcon className="size-4" />}
    </button>
  );
}
