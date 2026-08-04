import { useQuery } from '@tanstack/react-query';
import { getJobDetail } from '@/api/jobs';

export function useJobDetail(jobId: number | null) {
  return useQuery({
    queryKey: ['jobs', 'detail', jobId],
    queryFn: () => getJobDetail(jobId as number),
    enabled: jobId !== null,
  });
}
