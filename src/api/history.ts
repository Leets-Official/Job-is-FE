import { client } from '@/api/client';
import type { ApiEnvelope, PageResponse } from '@/api/types';

export type HistoryActionType = 'VIEWED' | 'SKIPPED' | 'APPLY_INTENT' | 'SAVED';
export type HistoryFilter = 'ALL' | HistoryActionType;

export interface HistoryItem {
  jobId: number;
  companyName: string;
  title: string;
  actionType: HistoryActionType;
  reasonCode: string | null;
  comment: string | null;
  actionAt: string;
  expired: boolean;
}

export interface GetHistoryParams {
  page?: number;
  size?: number;
  filter?: HistoryFilter;
}

export async function getHistory(params: GetHistoryParams = {}) {
  const { data } = await client.get<ApiEnvelope<PageResponse<HistoryItem>>>('/api/history', {
    params,
  });
  return data.data;
}
