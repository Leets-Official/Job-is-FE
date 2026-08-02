import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { JobCategory, Region } from '@/api/jobs';
import { updateProfile, type CareerLevel } from '@/api/profile';

interface ProfileSettingsValues {
  regions: string[];
  career: string;
  interests: string[];
  techStacks: string[];
  preferenceNotes: string[];
}

interface UseProfileUpdateOptions {
  jobCategories: JobCategory[];
  regions: Region[];
}

export const PROFILE_UPDATE_VALIDATION_ERROR_MESSAGE =
  '관심 직무, 희망 지역, 경력 단계를 등록된 목록에서 선택해주세요.';

function findByName<T extends { name: string }>(items: T[], name: string) {
  return items.find((item) => item.name === name);
}

export default function useProfileUpdate({ jobCategories, regions }: UseProfileUpdateOptions) {
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (profile) => {
      queryClient.setQueryData(['profile'], profile);
    },
  });

  const saveProfile = async (values: ProfileSettingsValues) => {
    const selectedCategories = values.interests
      .map((interest) => findByName(jobCategories, interest))
      .filter((category): category is JobCategory => category !== undefined);
    const selectedRegion = findByName(regions, values.regions[0] ?? '');

    if (
      values.interests.length === 0 ||
      !selectedRegion ||
      !values.career ||
      selectedCategories.length !== values.interests.length
    ) {
      throw new Error(PROFILE_UPDATE_VALIDATION_ERROR_MESSAGE);
    }

    await updateMutation.mutateAsync({
      jobCategoryIds: selectedCategories.map((category) => category.id),
      primaryJobCategoryId: selectedCategories[0]?.id,
      regionId: selectedRegion.id,
      careerLevel: values.career as CareerLevel,
      preferenceNotes: values.preferenceNotes,
      techStacks: values.techStacks,
    });
  };

  return {
    saveProfile,
    isSavingProfile: updateMutation.isPending,
  };
}
