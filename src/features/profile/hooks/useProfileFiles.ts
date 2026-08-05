import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfileFiles } from '@/api/profile';
import { QUERY_KEYS } from '@/constants/queryKey';

export default function useProfileFiles() {
  const queryClient = useQueryClient();
  const profileFilesQuery = useQuery({
    queryKey: QUERY_KEYS.PROFILE.FILES(),
    queryFn: getProfileFiles,
  });

  return {
    profileFiles: profileFilesQuery.data ?? [],
    invalidateProfileFiles: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROFILE.FILES() }),
  };
}
