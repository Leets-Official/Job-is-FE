import { useSearchParams } from 'react-router';
import SavedJobsList from '@/features/savedJobs/SavedJobsList';

export default function SavedJobsPage() {
  const [searchParams] = useSearchParams();

  // NOTE: ?preview= 쿼리스트링, 임시 확인용, 실제 트리거 연결 후 삭제 예정
  return <SavedJobsList isEmptyPreview={searchParams.get('preview') === 'empty'} />;
}
