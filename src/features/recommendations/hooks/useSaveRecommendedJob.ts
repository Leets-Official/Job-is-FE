import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveJob } from '@/api/jobs';

export function useSaveRecommendedJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['saves'] }),
  });
}
