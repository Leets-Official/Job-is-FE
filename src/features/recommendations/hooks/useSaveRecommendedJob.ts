import { useMutation } from '@tanstack/react-query';
import { saveJob } from '@/api/jobs';

export function useSaveRecommendedJob() {
  return useMutation({ mutationFn: saveJob });
}
