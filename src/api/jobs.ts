import { client } from '@/api/client';
import type { ApiEnvelope, PageResponse } from '@/api/types';

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

export interface JobSummary {
  id: number;
  companyName: string;
  position: string;
  careerLevel: string;
  employmentType: string;
  remoteAvailable: boolean;
  dueTime: string;
  thumbnailUrl: string;
  skillTags: string[];
  locationCity: string;
  locationDistrict: string;
  // 적합도 배지 점수(0~100). 산출 불가 시 null — 배지 생략
  fitScore: number | null;
}

export type JobCareerRange = 'NEWCOMER' | 'JUNIOR' | 'SENIOR';
export type JobSortOption = 'FIT' | 'RECENT' | 'DEADLINE';

const JOB_CAREER_RANGES: readonly string[] = ['NEWCOMER', 'JUNIOR', 'SENIOR'];

export function isJobCareerRange(value: string): value is JobCareerRange {
  return JOB_CAREER_RANGES.includes(value);
}

export interface SearchJobsParams {
  keyword?: string;
  categoryChildren?: string[];
  cities?: string[];
  districts?: string[];
  careerRanges?: JobCareerRange[];
  employmentTypes?: string[];
  remoteOnly?: boolean;
  includeAlwaysOpen?: boolean;
  sort?: JobSortOption;
  page?: number;
  size?: number;
}

export async function searchJobs(params: SearchJobsParams = {}) {
  const { data } = await client.get<ApiEnvelope<PageResponse<JobSummary>>>('/api/jobs/search', {
    params,
    // 기본 직렬화는 배열을 cities[]=... 형태로 보내는데, 백엔드는 cities=...&cities=... 형태를 기대함
    paramsSerializer: { indexes: null },
  });
  return data.data;
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

export async function getEmploymentTypes() {
  const { data } = await client.get<ApiEnvelope<string[]>>('/api/jobs/filters/employment-types');
  return data.data;
}

export type FitCriteriaVerdict = 'MATCH' | 'ESTIMATED' | 'CAUTION' | 'UNKNOWN';

export interface CriteriaMatrix {
  jobType: FitCriteriaVerdict;
  career: FitCriteriaVerdict;
  location: FitCriteriaVerdict;
  skills: FitCriteriaVerdict;
  preference: FitCriteriaVerdict;
  salary: FitCriteriaVerdict;
}

export interface JobMatching {
  matchScore: number;
  rating: number;
  matchReasons: string[];
  fitCriteria: CriteriaMatrix;
}

export interface JobDetail {
  id: number;
  companyName: string;
  position: string;
  careerLevel: string;
  employmentType: string;
  remoteAvailable: boolean;
  sourceUrl: string;
  dueTime: string;
  intro: string;
  mainTasks: string;
  requirements: string;
  preferredPoints: string;
  benefits: string;
  employeeCount: number;
  companyType: string;
  industry: string;
  stockStatus: string;
  skillTags: string[];
  locationFull: string;
  // 비로그인 · 온보딩 퀴즈 미완료 시 null
  matching: JobMatching | null;
}

export async function getJobDetail(jobId: number) {
  const { data } = await client.get<ApiEnvelope<JobDetail>>(`/api/jobs/${jobId}`);
  return data.data;
}

export interface JobLinkValidation {
  isValid: boolean;
  statusCode: number | null;
  message: string;
}

export async function checkJobLink(jobId: number) {
  const { data } = await client.get<ApiEnvelope<JobLinkValidation>>(
    `/api/jobs/${jobId}/source-check`,
  );
  return data.data;
}

export async function saveJob(jobId: number) {
  await client.post(`/api/jobs/${jobId}/save`);
}

export async function unsaveJob(jobId: number) {
  await client.delete(`/api/jobs/${jobId}/save`);
}

export interface JobInteraction {
  jobId: number;
  viewed: boolean;
  applyIntent: boolean;
  applied: boolean;
  applicable: boolean;
}

export async function recordJobView(jobId: number) {
  const { data } = await client.post<ApiEnvelope<JobInteraction>>(`/api/jobs/${jobId}/view`);
  return data.data;
}

export async function toggleApplyIntent(jobId: number) {
  const { data } = await client.post<ApiEnvelope<JobInteraction>>(
    `/api/jobs/${jobId}/apply-intent`,
  );
  return data.data;
}

export async function recordJobApply(jobId: number, applyIntent?: boolean) {
  const { data } = await client.post<ApiEnvelope<JobInteraction>>(
    `/api/jobs/${jobId}/apply`,
    applyIntent === undefined ? undefined : { applyIntent },
  );
  return data.data;
}
