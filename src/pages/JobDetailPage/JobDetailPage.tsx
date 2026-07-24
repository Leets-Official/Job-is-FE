import { useParams } from 'react-router';
import AppShell from '@/components/layout/AppShell';

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <AppShell activeTab="today">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-heading-large font-bold text-text-primary">채용공고 상세</h1>
        <p className="text-body-large font-medium text-text-secondary">공고 번호 {id}</p>
      </div>
    </AppShell>
  );
}
