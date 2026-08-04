import type { BriefingCard } from '@/api/briefings';
import { client } from '@/api/client';
import type { ApiEnvelope } from '@/api/types';

export async function generateTodayDeck() {
  const { data } = await client.post<ApiEnvelope<BriefingCard[]>>('/api/decks/generate');
  return data.data;
}

export async function dismissCard(deckId: number, cardId: number) {
  const { data } = await client.post<ApiEnvelope<BriefingCard>>(
    `/api/decks/${deckId}/cards/${cardId}/dismiss`,
  );
  return data.data;
}

export async function cancelDismissCard(deckId: number, cardId: number) {
  const { data } = await client.delete<ApiEnvelope<BriefingCard>>(
    `/api/decks/${deckId}/cards/${cardId}/dismiss`,
  );
  return data.data;
}

export interface DismissReasonRequest {
  reason?: string;
  comment?: string;
}

export async function submitDismissReason(
  deckId: number,
  cardId: number,
  request: DismissReasonRequest,
) {
  await client.post(`/api/decks/${deckId}/cards/${cardId}/dismiss-reason`, request);
}
