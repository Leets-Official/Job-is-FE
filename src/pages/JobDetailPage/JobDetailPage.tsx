import { Link, useParams } from 'react-router';
import ChevronLeftIcon from '@/assets/icons/icon-chevron-left.svg?react';
import AppShell from '@/components/layout/AppShell';
import JobDetailMain from '@/features/jobs/components/JobDetailMain';
import JobDetailSidebar from '@/features/jobs/components/JobDetailSidebar';
import { mockJobDetail } from '@/features/jobs/mocks/jobDetailMock';

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const job = { ...mockJobDetail, id: id ?? mockJobDetail.id };

  return (
    <AppShell activeTab="today" className="items-stretch justify-start p-0">
      <div className="flex w-full flex-1 justify-center px-3 py-8">
        <div className="flex w-full max-w-300 flex-col gap-4">
          <Link
            to="/today"
            className="inline-flex w-fit items-center gap-1 rounded-full border border-gray-300 bg-white px-4 py-2 text-body-small font-medium text-text-secondary hover:bg-gray-50"
          >
            <ChevronLeftIcon className="size-4" />
            오늘의 추천으로
          </Link>
          <div className="flex w-full items-start gap-6">
            <div className="min-w-0 flex-1">
              <JobDetailMain job={job} />
            </div>
            <div className="w-90 shrink-0">
              <div className="sticky top-24">
                <JobDetailSidebar job={job} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
