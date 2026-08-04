import { useQuery } from '@tanstack/react-query';
import { getCareerLevels, getJobCategories, getRegions, getTechStacks } from '@/api/jobs';
import { getProfile } from '@/api/profile';

export default function useProfileFormMetadata(loadProfile: boolean) {
  const techStacksQuery = useQuery({ queryKey: ['techStacks'], queryFn: getTechStacks });
  const jobCategoriesQuery = useQuery({ queryKey: ['jobCategories'], queryFn: getJobCategories });
  const regionsQuery = useQuery({ queryKey: ['regions'], queryFn: getRegions });
  const careerLevelsQuery = useQuery({ queryKey: ['careerLevels'], queryFn: getCareerLevels });
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: loadProfile,
  });

  return {
    techStackMetadata: techStacksQuery.data ?? [],
    jobCategoryMetadata: jobCategoriesQuery.data ?? [],
    regionMetadata: regionsQuery.data ?? [],
    careerLevelMetadata: careerLevelsQuery.data ?? [],
    profile: profileQuery.data,
  };
}
