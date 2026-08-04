import { useMutation, useQueryClient } from '@tanstack/react-query';
import { snoozeNotification } from '@/api/notification';

export default function useNotificationSnooze() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: snoozeNotification,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['settings', 'notification'] });
    },
  });
}
