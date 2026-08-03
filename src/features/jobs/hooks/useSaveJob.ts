import { useMutation } from '@tanstack/react-query';
import { saveJob, unsaveJob } from '@/api/jobs';

export function useSaveJob() {
  const { mutateAsync: save } = useMutation({ mutationFn: saveJob });
  const { mutateAsync: unsave } = useMutation({ mutationFn: unsaveJob });

  return { save, unsave };
}
