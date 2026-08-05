import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateNotificationSettings } from '@/api/notification';
import type { NotificationSettingsResponse } from '@/api/types/notification.types';
import { QUERY_KEYS } from '@/constants/queryKey';

export default function useNotificationSettingsUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotificationSettings,
    onSuccess: (settings) => {
      queryClient.setQueryData<NotificationSettingsResponse>(
        QUERY_KEYS.SETTINGS.NOTIFICATION(),
        settings,
      );
    },
  });
}
