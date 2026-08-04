import { useQuery } from '@tanstack/react-query';
import { getNotificationSettings } from '@/api/notification';

export default function useNotificationSettings() {
  return useQuery({
    queryKey: ['settings', 'notification'],
    queryFn: getNotificationSettings,
  });
}
