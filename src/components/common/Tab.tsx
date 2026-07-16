import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentPropsWithRef } from 'react';
import { cn } from '@/utils/cn';

const tabVariants = cva(
  'flex items-center justify-center text-[18px] leading-normal font-bold text-text-primary',
  {
    variants: {
      variant: {
        filled: 'h-10 rounded-[6px] px-3',
        underline: 'h-12 min-w-16 border-b-[3px] border-transparent px-2',
      },
      active: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { variant: 'filled', active: true, className: 'bg-primary-400' },
      { variant: 'underline', active: true, className: 'border-primary-400' },
    ],
    defaultVariants: {
      variant: 'filled',
      active: false,
    },
  },
);

type TabProps = ComponentPropsWithRef<'button'> &
  VariantProps<typeof tabVariants> & { label: string };

export default function Tab({
  className,
  ref,
  type = 'button',
  variant,
  active,
  label,
  ...props
}: TabProps) {
  return (
    <button
      ref={ref}
      type={type}
      role="tab"
      aria-selected={active ?? false}
      className={cn(tabVariants({ variant, active }), className)}
      {...props}
    >
      {label}
    </button>
  );
}
