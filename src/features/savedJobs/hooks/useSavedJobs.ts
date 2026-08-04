import { useQuery } from '@tanstack/react-query';
import { getSavedJobs, type GetSavedJobsParams } from '@/api/saves';

export function useSavedJobs(params: GetSavedJobsParams) {
  return useQuery({
    queryKey: ['saves', params],
    queryFn: () => getSavedJobs(params),
  });
}
