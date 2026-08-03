import { client } from '@/api/client';
import type { ApiEnvelope } from '@/api/types';

export type ProfileFileCategory = 'RESUME' | 'COVER_LETTER';

interface PresignedUrlRequest {
  category: ProfileFileCategory;
  fileName: string;
}

interface PresignedUrlResponse {
  presignedUrl: string;
  objectKey: string;
  expiresIn: number;
}

interface ConfirmProfileFileRequest {
  category: ProfileFileCategory;
  fileName: string;
  objectKey: string;
}

interface ConfirmProfileFileResponse {
  fileId: number;
  created: boolean;
}

interface ProfileFileDownloadUrlResponse {
  downloadUrl: string;
  fileName: string;
  expiresIn: number;
}

export interface ProfileFile {
  fileId: number;
  category: ProfileFileCategory;
  fileName: string;
  fileFormat: string;
  uploadedAt: string;
}

export interface ProfileResponse {
  jobCategories: Array<{ id: number; name: string; primary: boolean }> | null;
  region: { id: number; name: string } | null;
  careerLevel: CareerLevel | null;
  preferenceNotes: string[] | null;
  excludeKeywords: string[] | null;
  techStacks: string[] | null;
  personalityTags: string[];
  jobTestCompleted: boolean;
}

export const CAREER_LEVELS = ['ENTRY', 'JUNIOR', 'EXPERIENCED'] as const;

export type CareerLevel = (typeof CAREER_LEVELS)[number];
export type OnboardingStep = 'PROFILE' | 'QUIZ' | 'REVIEW';

export function isCareerLevel(value: string): value is CareerLevel {
  return CAREER_LEVELS.includes(value as CareerLevel);
}

export interface ProfileDraftResponse {
  onboardingStep: OnboardingStep;
  jobCategories: Array<{ id: number; name: string; primary: boolean }> | null;
  region: { id: number; name: string } | null;
  careerLevel: CareerLevel | null;
  preferenceNotes: string[] | null;
  excludeKeywords: string[] | null;
  techStacks: string[] | null;
  personalityTags: string[] | null;
  jobTestCompleted: boolean;
}

export interface ProfileDraftRequest {
  onboardingStep?: OnboardingStep;
  jobCategoryIds?: number[];
  primaryJobCategoryId?: number;
  regionId?: number;
  careerLevel?: CareerLevel;
  preferenceNotes?: string[];
  excludeKeywords?: string[];
  techStacks?: string[];
}

export interface ProfileUpdateRequest {
  jobCategoryIds?: number[];
  primaryJobCategoryId?: number;
  regionId?: number;
  careerLevel?: CareerLevel;
  preferenceNotes?: string[];
  excludeKeywords?: string[];
  techStacks?: string[];
}

export async function getProfile() {
  const { data } = await client.get<ApiEnvelope<ProfileResponse>>('/api/profile');

  return data.data;
}

export async function updateProfile(request: ProfileUpdateRequest) {
  const { data } = await client.patch<ApiEnvelope<ProfileResponse>>('/api/profile', request);

  return data.data;
}

export async function getProfileDraft() {
  const { data } = await client.get<ApiEnvelope<ProfileDraftResponse>>('/api/profile/draft');

  return data.data;
}

export async function saveProfileDraft(request: ProfileDraftRequest) {
  const { data } = await client.put<ApiEnvelope<ProfileDraftResponse>>(
    '/api/profile/draft',
    request,
  );

  return data.data;
}

export async function completeOnboarding() {
  const { data } = await client.post<ApiEnvelope<string>>('/api/profile/onboarding/complete');

  return data.data;
}

export async function getProfileFiles() {
  const { data } = await client.get<ApiEnvelope<ProfileFile[]>>('/api/profile/files');

  return data.data;
}

export async function issueProfileFilePresignedUrl(request: PresignedUrlRequest) {
  const { data } = await client.post<ApiEnvelope<PresignedUrlResponse>>(
    '/api/profile/files/presigned-url',
    request,
  );

  return data.data;
}

export async function confirmProfileFile(request: ConfirmProfileFileRequest) {
  const { data } = await client.post<ApiEnvelope<ConfirmProfileFileResponse>>(
    '/api/profile/files',
    request,
  );

  return data.data;
}

export async function deleteProfileFile(fileId: number) {
  const { data } = await client.delete<ApiEnvelope<string>>(`/api/profile/files/${fileId}`);

  return data.data;
}

export async function getProfileFileDownloadUrl(fileId: number) {
  const { data } = await client.get<ApiEnvelope<ProfileFileDownloadUrlResponse>>(
    `/api/profile/files/${fileId}/download-url`,
  );

  return data.data;
}
