import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfileFiles } from '@/api/profile';

const PROFILE_FILES_QUERY_KEY = ['profileFiles'] as const;

export default function useProfileFiles() {
  const queryClient = useQueryClient();
  const profileFilesQuery = useQuery({
    queryKey: PROFILE_FILES_QUERY_KEY,
    queryFn: getProfileFiles,
  });

  return {
    profileFiles: profileFilesQuery.data ?? [],
    invalidateProfileFiles: () =>
      queryClient.invalidateQueries({ queryKey: PROFILE_FILES_QUERY_KEY }),
  };
}
