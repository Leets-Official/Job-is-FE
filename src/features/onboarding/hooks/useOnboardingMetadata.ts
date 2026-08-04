import { useQuery } from '@tanstack/react-query';
import { getJobCategories, getRegions } from '@/api/jobs';

export default function useOnboardingMetadata() {
  const jobCategoriesQuery = useQuery({
    queryKey: ['jobCategories'],
    queryFn: getJobCategories,
  });
  const regionsQuery = useQuery({
    queryKey: ['regions'],
    queryFn: getRegions,
  });

  return {
    jobCategories: jobCategoriesQuery.data ?? [],
    regions: regionsQuery.data ?? [],
    isPending: jobCategoriesQuery.isPending || regionsQuery.isPending,
  };
}
