import { type ComponentPropsWithRef, type ReactNode } from 'react';
import Link from '@/components/common/Link';
import { cn } from '@/utils/cn';

interface ListCardProps extends ComponentPropsWithRef<'div'> {
  badge?: ReactNode;
  heading: string;
  caption: string;
  captionPosition?: 'top' | 'bottom';
  linkLabel?: string;
  linkHref?: string;
}

export default function ListCard({
  className,
  ref,
  badge,
  heading,
  caption,
  captionPosition = 'bottom',
  linkLabel,
  linkHref,
  ...props
}: ListCardProps) {
  const headingElement = (
    <div className="flex w-full items-center gap-4">
      <p className="flex-1 text-[18px] leading-normal font-bold text-text-primary">{heading}</p>
    </div>
  );
  const captionElement = (
    <p className="w-full text-[14px] leading-normal font-medium text-text-tertiary">{caption}</p>
  );
  const hasExtraContent = Boolean(badge) || Boolean(linkLabel && linkHref);

  return (
    <div
      ref={ref}
      className={cn(
        'flex w-full flex-col items-start justify-center gap-2 rounded-sm border border-gray-300 bg-white p-6',
        className,
      )}
      {...props}
    >
      {badge}
      <div
        className={cn(
          'flex w-full flex-col items-start justify-center',
          hasExtraContent ? 'gap-1' : 'gap-4',
        )}
      >
        {captionPosition === 'top' ? (
          <>
            {captionElement}
            {headingElement}
          </>
        ) : (
          <>
            {headingElement}
            {captionElement}
          </>
        )}
      </div>
      {linkLabel && linkHref && (
        <Link href={linkHref} className="px-0.5 text-[14px]" iconClassName="size-5">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
