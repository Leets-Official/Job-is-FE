import { client } from '@/api/client';
import type { ApiEnvelope } from '@/api/types';

export interface BriefingSummary {
  greeting: string;
  applicableCount: number;
  curatedCount: number;
  theme: string;
}

export type BriefingCardStatus = 'PENDING' | 'SAVED' | 'DISMISSED';

export interface BriefingCard {
  cardId: number;
  deckId: number;
  jobId: number;
  postedAt: string;
  jobTitle: string;
  reason: string;
  fitScore: number | null;
  techStack: string[];
  jobScope: string;
  companyLocation: string | null;
  tags: string[];
  deadlineAt: string | null;
  summary: string | null;
  position: number;
  status: BriefingCardStatus;
}

export async function getTodayBriefing() {
  const { data } = await client.get<ApiEnvelope<BriefingSummary>>('/api/briefings/today');
  return data.data;
}

export async function getTodayBriefingStatus() {
  const { data } = await client.get<ApiEnvelope<BriefingCard[]>>('/api/briefings/status');
  return data.data;
}
