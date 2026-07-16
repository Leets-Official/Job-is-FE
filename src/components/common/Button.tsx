import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentPropsWithRef } from 'react';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex h-14 items-center justify-center gap-1 rounded-sm px-5 text-base font-medium text-text-primary',
  {
    variants: {
      variant: {
        solid: 'bg-primary-400',
        outline: 'border border-primary-400 bg-white',
      },
    },
    defaultVariants: {
      variant: 'solid',
    },
  },
);

type ButtonProps = ComponentPropsWithRef<'button'> & VariantProps<typeof buttonVariants>;

export default function Button({ className, type = 'button', variant, ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant }), className)} {...props} />;
}
