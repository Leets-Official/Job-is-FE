import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import MoreVerticalIcon from '@/assets/icons/icon-more-vertical.svg?react';
import JobCard from '@/features/jobs/components/JobCard';
import { useSaveJob } from '@/features/jobs/hooks/useSaveJob';
import type { ExploreJobSummary } from '@/features/jobs/types/exploreJob';

interface ExploreJobCardProps {
  job: ExploreJobSummary;
}

export default function ExploreJobCard({ job }: ExploreJobCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { save, unsave } = useSaveJob();

  useEffect(() => {
    if (!isMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (containerRef.current?.contains(event.target as Node)) return;
      setIsMenuOpen(false);
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isMenuOpen]);

  return (
    <div ref={containerRef} className="relative w-full">
      <Link to={`/jobs/${job.id}`} className="block w-full">
        <JobCard
          className="w-full"
          thumbnailUrl={job.thumbnailUrl}
          dDayLabel={job.dDayLabel}
          title={job.title}
          companyName={job.companyName}
          employmentInfo={job.employmentInfo}
        />
      </Link>
      <button
        type="button"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="더보기"
        className="absolute top-[209px] right-2.5 flex size-6 items-center justify-center"
      >
        <MoreVerticalIcon className="size-6" />
      </button>
      {isMenuOpen && (
        <div className="absolute top-9 right-2.5 z-10 flex w-36 flex-col gap-3 rounded-sm border border-gray-200 bg-white p-4 shadow-md">
          <button
            type="button"
            onClick={() => {
              setIsSaved(true);
              setIsMenuOpen(false);
              save(job.id).catch(console.error);
            }}
            className="text-left text-body-medium font-medium text-text-primary"
          >
            저장
          </button>
          <div className="h-0 w-full border-t border-dashed border-gray-300" />
          <button
            type="button"
            disabled={!isSaved}
            onClick={() => {
              setIsSaved(false);
              setIsMenuOpen(false);
              unsave(job.id).catch(console.error);
            }}
            className="text-left text-body-medium font-medium text-text-primary disabled:text-gray-400"
          >
            저장 해제
          </button>
          <div className="h-0 w-full border-t border-dashed border-gray-300" />
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="text-left text-body-medium font-medium text-text-primary"
          >
            관심 없음
          </button>
        </div>
      )}
    </div>
  );
}
