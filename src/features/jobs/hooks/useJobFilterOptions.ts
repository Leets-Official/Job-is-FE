import { useQuery } from '@tanstack/react-query';
import { getEmploymentTypes, getJobCategories, getRegions } from '@/api/jobs';

const FILTER_METADATA_STALE_TIME = 60 * 60 * 1000;

export function useJobCategories() {
  return useQuery({
    queryKey: ['jobs', 'filters', 'job-categories'],
    queryFn: getJobCategories,
    staleTime: FILTER_METADATA_STALE_TIME,
  });
}

export function useRegions() {
  return useQuery({
    queryKey: ['jobs', 'filters', 'regions'],
    queryFn: getRegions,
    staleTime: FILTER_METADATA_STALE_TIME,
  });
}

export function useEmploymentTypes() {
  return useQuery({
    queryKey: ['jobs', 'filters', 'employment-types'],
    queryFn: getEmploymentTypes,
    staleTime: FILTER_METADATA_STALE_TIME,
  });
}
