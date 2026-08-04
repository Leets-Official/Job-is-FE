import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveJob, unsaveJob } from '@/api/jobs';

export function useSaveJob() {
  const queryClient = useQueryClient();
  const invalidateSaves = () => queryClient.invalidateQueries({ queryKey: ['saves'] });

  const { mutateAsync: save } = useMutation({ mutationFn: saveJob, onSuccess: invalidateSaves });
  const { mutateAsync: unsave } = useMutation({
    mutationFn: unsaveJob,
    onSuccess: invalidateSaves,
  });

  return { save, unsave };
}
