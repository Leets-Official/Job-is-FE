import { client } from '@/api/client';
import type { ApiEnvelope, PageResponse } from '@/api/types';

export type JobSkillTag =
  | 'PYTHON'
  | 'REACT'
  | 'JAVA'
  | 'SPRING_BOOT'
  | 'JAVASCRIPT'
  | 'TYPESCRIPT'
  | 'NODE_JS'
  | 'VUE_JS'
  | 'NEXT_JS'
  | 'KOTLIN'
  | 'GO'
  | 'C_PLUS_PLUS'
  | 'MYSQL'
  | 'POSTGRESQL'
  | 'REDIS'
  | 'DOCKER'
  | 'AWS';

export type JobRegionName = '서울' | '경기' | '인천' | '부산';

const JOB_REGION_NAMES: readonly string[] = ['서울', '경기', '인천', '부산'];

export function isJobRegionName(value: string): value is JobRegionName {
  return JOB_REGION_NAMES.includes(value);
}

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
}

export interface SearchJobsParams {
  keyword?: string;
  categoryChild?: string;
  skillTags?: JobSkillTag[];
  regions?: JobRegionName[];
  page?: number;
  size?: number;
  sort?: string[];
}

export async function searchJobs(params: SearchJobsParams = {}) {
  const { data } = await client.get<ApiEnvelope<PageResponse<JobSummary>>>('/api/jobs', {
    params,
    // 기본 직렬화는 배열을 regions[]=... 형태로 보내는데, 백엔드는 regions=...&regions=... 형태를 기대함
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

export interface CriteriaMatrix {
  jobType: string;
  career: string;
  location: string;
  skills: string;
  preference: string;
  salary: string;
}

export interface SimilarJobItem {
  jobId: string;
  title: string;
  companyName: string;
  fitScore: number;
  reason: string;
  fitPoints: string[];
  criteriaMatrix: CriteriaMatrix;
}

export interface SimilarJobs {
  targetJobId: string;
  label: string;
  items: SimilarJobItem[];
}

// NOTE: 명세상 targetJobId를 넘길 파라미터(쿼리/패스)가 없어서 어떤 공고 기준으로
// 유사 공고를 찾는지 지정할 방법이 없음. 백엔드 확인 후 UI 연결 예정.
export async function getSimilarJobs() {
  const { data } = await client.get<ApiEnvelope<SimilarJobs>>('/api/jobs/similar');
  return data.data;
}
