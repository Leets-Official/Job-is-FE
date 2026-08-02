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

export interface ProfileFile {
  fileId: number;
  category: ProfileFileCategory;
  fileName: string;
  fileFormat: string;
  uploadedAt: string;
}

export interface ProfileResponse {
  personalityTags: string[];
  jobTestCompleted: boolean;
}

export type CareerLevel = 'ENTRY' | 'JUNIOR' | 'EXPERIENCED';

export interface ProfileDraftResponse {
  onboardingStep: 'PROFILE' | 'QUIZ' | 'REVIEW';
  jobCategories: Array<{ id: number; name: string; primary: boolean }>;
  region: { id: number; name: string };
  careerLevel: CareerLevel;
  preferenceNotes: string[];
  excludeKeywords: string[];
  techStacks: string[];
  personalityTags: string[];
  jobTestCompleted: boolean;
}

export interface ProfileDraftRequest {
  onboardingStep?: ProfileDraftResponse['onboardingStep'];
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
