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

const TAG_CLASS_NAME =
  'inline-flex h-10 items-center justify-center gap-0.5 rounded-full border border-gray-200 bg-white px-3 text-base leading-6 font-normal text-gray-900';

export default function Tag({
  className,
  variant = 'removable',
  label,
  type = 'button',
  ...props
}: TagProps) {
  const content = (
    <>
      {variant === 'add' && <PlusIcon className="size-4" />}
      {variant === 'hash' && <HashIcon className="size-4" />}
      {label}
      {variant === 'removable' && <CloseIcon className="size-4" />}
    </>
  );

  if (variant === 'plain') {
    return <span className={cn(TAG_CLASS_NAME, className)}>{content}</span>;
  }

  return (
    <button type={type} className={cn(TAG_CLASS_NAME, className)} {...props}>
      {content}
    </button>
  );
}
