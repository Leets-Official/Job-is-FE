import { type ComponentPropsWithRef } from 'react';
import CloseIcon from '@/assets/icons/icon-close.svg?react';
import HashIcon from '@/assets/icons/icon-hash.svg?react';
import PlusIcon from '@/assets/icons/icon-plus.svg?react';
import { cn } from '@/utils/cn';

type TagVariant = 'removable' | 'add' | 'hash' | 'plain';

type TagProps = ComponentPropsWithRef<'button'> & {
  variant?: TagVariant;
  label: string;
};

export default function Tag({
  className,
  variant = 'removable',
  label,
  type = 'button',
  ...props
}: TagProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-10 items-center justify-center gap-0.5 rounded-full border border-gray-200 bg-white px-3 text-base leading-6 font-normal text-gray-900',
        className,
      )}
      {...props}
    >
      {variant === 'add' && <PlusIcon className="size-4" />}
      {variant === 'hash' && <HashIcon className="size-4" />}
      {label}
      {variant === 'removable' && <CloseIcon className="size-4" />}
    </button>
  );
}
