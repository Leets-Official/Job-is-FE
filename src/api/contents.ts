import { client } from '@/api/client';
import type { ApiEnvelope } from '@/api/types';

export type ContentType = 'NEWS' | 'BENEFIT';

export interface ContentSummary {
  contentId: number;
  contentType: ContentType;
  tag: string;
  title: string;
  summary: string;
  sourceName: string;
  publishedAt: string;
}

export interface ContentDetail {
  contentId: number;
  contentType: ContentType;
  tag: string;
  title: string;
  summary: string;
  body: string;
  sourceName: string;
  publishedAt: string;
  target: string;
  applicationStartDate: string;
  applicationEndDate: string;
  applicationMethod: string;
  originalUrl: string;
}

export async function getContents() {
  const { data } = await client.get<ApiEnvelope<ContentSummary[]>>('/api/contents');
  return data.data;
}

export async function getContent(contentId: number) {
  const { data } = await client.get<ApiEnvelope<ContentDetail>>(`/api/contents/${contentId}`);
  return data.data;
}
