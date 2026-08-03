import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { searchJobs, type SearchJobsParams } from '@/api/jobs';

export function useExploreJobs(params: SearchJobsParams) {
  return useQuery({
    queryKey: ['jobs', 'search', params],
    queryFn: () => searchJobs(params),
    placeholderData: keepPreviousData,
  });
}
