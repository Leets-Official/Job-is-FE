import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type NotificationSettingsResponse, updateNotificationSettings } from '@/api/notification';

export default function useNotificationSettingsUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotificationSettings,
    onSuccess: (settings) => {
      queryClient.setQueryData<NotificationSettingsResponse>(
        ['settings', 'notification'],
        settings,
      );
    },
  });
}
