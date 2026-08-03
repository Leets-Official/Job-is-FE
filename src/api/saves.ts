import { client } from '@/api/client';
import type { ApiEnvelope, PageResponse } from '@/api/types';

export interface SavedJob {
  jobId: number;
  companyName: string;
  title: string;
  locationFull: string;
  careerLevel: string;
  employmentType: string;
  savedAt: string;
  deadlineAt: string;
  expired: boolean;
  applyIntent: boolean;
}

export interface SavedJobList {
  totalSaved: number;
  totalApplyIntent: number;
  saves: PageResponse<SavedJob>;
}

export type SavedJobsSort = 'SAVED_DESC' | 'DEADLINE_ASC';

export interface GetSavedJobsParams {
  page?: number;
  size?: number;
  sort?: SavedJobsSort;
}

export async function getSavedJobs(params: GetSavedJobsParams = {}) {
  const { data } = await client.get<ApiEnvelope<SavedJobList>>('/api/saves', { params });
  return data.data;
}
