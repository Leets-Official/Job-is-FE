import { useEffect, useRef, useState } from 'react';
import useProfileFiles from './useProfileFiles';
import useProfileFormMetadata from './useProfileFormMetadata';
import useProfileUpdate, { PROFILE_UPDATE_VALIDATION_ERROR_MESSAGE } from './useProfileUpdate';
import type { ProfileSettingsFormValues } from '../types/profileSettings';

interface UseProfileSettingsFormOptions {
  loadProfile: boolean;
  onSubmit?: (values: ProfileSettingsFormValues) => void | Promise<void>;
}

function toggleSingleValue(values: string[], value: string) {
  return values.includes(value) ? [] : [value];
}

function toggleMultipleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

function addUniqueValue(values: string[], value: string) {
  return values.includes(value) ? values : [...values, value];
}

export default function useProfileSettingsForm({
  loadProfile,
  onSubmit,
}: UseProfileSettingsFormOptions) {
  const [regions, setRegions] = useState<string[]>([]);
  const [career, setCareer] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [primaryInterest, setPrimaryInterest] = useState<string>();
  const [techStacks, setTechStacks] = useState<string[]>([]);
  const [preferenceNote, setPreferenceNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [defaultSubmitError, setDefaultSubmitError] = useState<string>();
  const hasHydratedProfile = useRef(false);
  const { techStackMetadata, jobCategoryMetadata, regionMetadata, careerLevelMetadata, profile } =
    useProfileFormMetadata(loadProfile);
  const { saveProfile, isSavingProfile } = useProfileUpdate({
    jobCategories: jobCategoryMetadata,
    regions: regionMetadata,
  });
  const { profileFiles } = useProfileFiles();

  const markUnsaved = () => setIsSaved(false);

  useEffect(() => {
    if (!loadProfile || !profile || hasHydratedProfile.current) return;

    setRegions(profile.region ? [profile.region.name] : []);
    setCareer(profile.careerLevel ?? '');
    const jobCategories = profile.jobCategories ?? [];
    const primaryCategory = jobCategories.find((category) => category.primary);
    setInterests([
      ...(primaryCategory ? [primaryCategory.name] : []),
      ...jobCategories.filter((category) => !category.primary).map((category) => category.name),
    ]);
    setPrimaryInterest(primaryCategory?.name);
    setTechStacks(profile.techStacks ?? []);
    setPreferenceNote(profile.preferenceNotes?.[0] ?? '');
    hasHydratedProfile.current = true;
  }, [loadProfile, profile]);

  const submit = async () => {
    const values = {
      regions,
      career,
      interests,
      primaryInterest,
      techStacks,
      preferenceNotes: preferenceNote.trim() ? [preferenceNote.trim()] : [],
    } satisfies ProfileSettingsFormValues;

    if (onSubmit) {
      await onSubmit(values);
      return;
    }

    setDefaultSubmitError(undefined);

    try {
      await saveProfile(values);
      setIsSaved(true);
    } catch (error) {
      setDefaultSubmitError(
        error instanceof Error && error.message === PROFILE_UPDATE_VALIDATION_ERROR_MESSAGE
          ? error.message
          : '프로필을 저장하지 못했어요. 잠시 후 다시 시도해주세요.',
      );
    }
  };

  return {
    regions,
    career,
    interests,
    techStacks,
    preferenceNote,
    isSaved,
    defaultSubmitError,
    isSavingProfile,
    profile,
    documentsStatus: profileFiles.length === 0 ? '미등록' : `${profileFiles.length}개 첨부 / 2개`,
    techStackOptions: techStackMetadata.map((techStack) => techStack.name),
    jobCategoryOptions: jobCategoryMetadata.map((category) => category.name),
    regionOptions: regionMetadata.map((region) => region.name),
    careerOptions: careerLevelMetadata,
    toggleRegion: (region: string) => {
      setRegions((previous) => toggleSingleValue(previous, region));
      markUnsaved();
    },
    addRegion: (region: string) => {
      setRegions([region]);
      markUnsaved();
    },
    changeCareer: (nextCareer: string) => {
      setCareer(nextCareer);
      markUnsaved();
    },
    toggleInterest: (interest: string) => {
      const nextInterests = toggleMultipleValue(interests, interest);
      setInterests(nextInterests);
      if (!nextInterests.includes(primaryInterest ?? '')) {
        setPrimaryInterest(nextInterests[0]);
      } else if (!primaryInterest) {
        setPrimaryInterest(nextInterests[0]);
      }
      markUnsaved();
    },
    addInterest: (interest: string) => {
      const nextInterests = addUniqueValue(interests, interest);
      setInterests(nextInterests);
      setPrimaryInterest(primaryInterest ?? nextInterests[0]);
      markUnsaved();
    },
    toggleTechStack: (techStack: string) => {
      setTechStacks((previous) => toggleMultipleValue(previous, techStack));
      markUnsaved();
    },
    addTechStack: (techStack: string) => {
      setTechStacks((previous) => addUniqueValue(previous, techStack));
      markUnsaved();
    },
    changePreferenceNote: (value: string) => {
      setPreferenceNote(value);
      markUnsaved();
    },
    submit,
  };
}
