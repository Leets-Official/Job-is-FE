import { useSearchParams } from 'react-router';
import SavedJobsList from '@/features/savedJobs/SavedJobsList';

export default function SavedJobsPage() {
  const [searchParams] = useSearchParams();

  return <SavedJobsList isEmptyPreview={searchParams.get('preview') === 'empty'} />;
}
