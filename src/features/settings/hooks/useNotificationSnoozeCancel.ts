import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelNotificationSnooze } from '@/api/notification';

export default function useNotificationSnoozeCancel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelNotificationSnooze,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['settings', 'notification'] });
    },
  });
}
