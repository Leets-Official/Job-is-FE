import { type ReactNode } from 'react';
import ResultIcon from '@/components/common/ResultIcon';
import { cn } from '@/utils/cn';

type NoticeIconVariant = 'success' | 'warning' | 'danger' | 'loading' | 'quiz';

interface RecommendationNoticePanelProps {
  resultIconVariant: NoticeIconVariant;
  title: string;
  description: string;
  footNote?: string;
  children: ReactNode;
  className?: string;
}

export default function RecommendationNoticePanel({
  resultIconVariant,
  title,
  description,
  footNote,
  children,
  className,
}: RecommendationNoticePanelProps) {
  return (
    <div
      className={cn(
        'flex w-full max-w-190 flex-col items-center gap-5 rounded-md border border-gray-200 bg-white p-6 text-center',
        className,
      )}
    >
      <ResultIcon variant={resultIconVariant} />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-heading-medium font-semibold text-text-primary">{title}</h1>
        <p className="text-body-medium leading-[1.5] font-medium whitespace-pre-line text-text-secondary">
          {description}
        </p>
      </div>
      <div className="flex w-full flex-col items-center gap-5">{children}</div>
      {footNote && (
        <p className="flex w-[415px] flex-col items-center justify-center rounded-xs border border-dashed border-gray-400 bg-gray-200 p-6 text-body-small font-medium text-text-tertiary">
          {footNote}
        </p>
      )}
    </div>
  );
}
