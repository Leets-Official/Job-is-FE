import { client } from '@/api/client';
import type { ApiEnvelope } from '@/api/types';

export interface JobCategory {
  id: number;
  name: string;
}

export interface TechStack {
  code: string;
  name: string;
}

export interface Region {
  id: number;
  name: string;
}

export interface CareerLevelMetadata {
  key: string;
  description: string;
  minYears: number;
  maxYears: number;
}

export async function getJobCategories() {
  const { data } = await client.get<ApiEnvelope<JobCategory[]>>('/api/jobs/filters/job-categories');
  return data.data;
}

export async function getTechStacks() {
  const { data } = await client.get<ApiEnvelope<TechStack[]>>('/api/jobs/filters/tech-stacks');
  return data.data;
}

export async function getRegions() {
  const { data } = await client.get<ApiEnvelope<Region[]>>('/api/jobs/filters/regions');
  return data.data;
}

export async function getCareerLevels() {
  const { data } = await client.get<ApiEnvelope<CareerLevelMetadata[]>>(
    '/api/jobs/filters/career-levels',
  );
  return data.data;
}
