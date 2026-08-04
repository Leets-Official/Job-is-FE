import { client } from '@/api/client';
import type { ApiEnvelope } from '@/api/types';

export interface NotificationSnooze {
  snoozed: boolean;
  until: string | null;
  indefinite: boolean;
}

export interface NotificationSettingsResponse {
  briefingEnabled: boolean;
  sendSlot: string;
  marketingSubscribed: boolean;
  snooze: NotificationSnooze;
}

export interface NotificationSettingsUpdateRequest {
  briefingEnabled: boolean;
  sendSlot: string;
  marketingSubscribed: boolean;
}

export type NotificationSnoozeDuration = 'SEVEN_DAYS' | 'THIRTY_DAYS' | 'INDEFINITE';

export interface NotificationSnoozeRequest {
  duration: NotificationSnoozeDuration;
}

export async function getNotificationSettings() {
  const { data } = await client.get<ApiEnvelope<NotificationSettingsResponse>>(
    '/api/settings/notification',
  );

  return data.data;
}

export async function updateNotificationSettings(request: NotificationSettingsUpdateRequest) {
  const { data } = await client.patch<ApiEnvelope<NotificationSettingsResponse>>(
    '/api/settings/notification',
    request,
  );

  return data.data;
}

export async function snoozeNotification(request: NotificationSnoozeRequest) {
  await client.post<ApiEnvelope<string>>('/api/settings/notification/snooze', request);
}

export async function cancelNotificationSnooze() {
  await client.delete<ApiEnvelope<string>>('/api/settings/notification/snooze');
}
