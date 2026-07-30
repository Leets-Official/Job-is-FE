import type { MultiSelectOption } from '@/components/common/MultiSelect';

export const JOB_ROLE_OPTIONS: MultiSelectOption[] = [
  { label: 'iOS 개발자', value: 'ios' },
  { label: '백엔드 개발자', value: 'backend' },
  { label: '데이터 엔지니어', value: 'data' },
  { label: '프로덕트 매니저', value: 'pm' },
];

export const JOB_ROLE_KEYWORDS: Record<string, string> = {
  ios: 'iOS',
  backend: '백엔드',
  data: '데이터',
  pm: '프로덕트',
};
