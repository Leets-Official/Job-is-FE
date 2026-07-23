import { type ComponentPropsWithRef } from 'react';
import { cn } from '@/utils/cn';

export interface LandingFeatureCardData {
  title?: string;
  lines: string[];
  dashed?: boolean;
}

interface LandingFeatureCardProps
  extends LandingFeatureCardData, ComponentPropsWithRef<'article'> {}

export default function LandingFeatureCard({
  className,
  ref,
  title,
  lines,
  dashed = false,
  ...props
}: LandingFeatureCardProps) {
  return (
    <article
      ref={ref}
      className={cn(
        'rounded-sm border bg-white p-6',
        dashed ? 'border-dashed border-gray-400' : 'border-solid border-gray-400',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-4">
        {title && <p className="text-body-large font-bold text-text-primary">{title}</p>}
        <div
          className={cn(
            'text-body-small font-medium',
            title ? 'text-text-tertiary' : 'text-text-secondary',
          )}
        >
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
