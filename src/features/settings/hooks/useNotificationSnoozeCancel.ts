import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelNotificationSnooze, getNotificationSettings } from '@/api/notification';

export default function useNotificationSnoozeCancel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await cancelNotificationSnooze();
      return queryClient.fetchQuery({
        queryKey: ['settings', 'notification'],
        queryFn: getNotificationSettings,
        staleTime: 0,
      });
    },
  });
}
