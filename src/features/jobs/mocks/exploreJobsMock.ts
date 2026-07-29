import type { ExploreJobSummary } from '@/features/jobs/types/exploreJob';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect width="1" height="1" fill="#e9ecef"/></svg>',
  );

export const mockExploreJobs: ExploreJobSummary[] = [
  {
    id: '1',
    thumbnailUrl: PLACEHOLDER_IMAGE,
    dDayLabel: 'D-12',
    matchScoreLabel: '적합도 92%',
    avatarUrl: PLACEHOLDER_IMAGE,
    title: '주니어 백엔드 엔지니어',
    companyName: '[Company Name]',
    employmentInfo: '스택플로우 · 서울 강남',
    isRemote: true,
  },
  {
    id: '2',
    thumbnailUrl: PLACEHOLDER_IMAGE,
    dDayLabel: 'D-5',
    matchScoreLabel: '적합도 81%',
    avatarUrl: PLACEHOLDER_IMAGE,
    title: '프론트엔드 개발자',
    companyName: '[Company Name]',
    employmentInfo: '브라이트모드 · 서울 성수',
    isRemote: false,
  },
  {
    id: '3',
    thumbnailUrl: PLACEHOLDER_IMAGE,
    dDayLabel: '상시',
    matchScoreLabel: '적합도 74%',
    avatarUrl: PLACEHOLDER_IMAGE,
    title: 'iOS 개발자',
    companyName: '[Company Name]',
    employmentInfo: '모바일 팩토리 · 서울 강남',
    isRemote: false,
  },
  {
    id: '4',
    thumbnailUrl: PLACEHOLDER_IMAGE,
    dDayLabel: 'D-8',
    matchScoreLabel: '적합도 69%',
    avatarUrl: PLACEHOLDER_IMAGE,
    title: 'QA 엔지니어',
    companyName: '[Company Name]',
    employmentInfo: '테스트 웨이브 · 부산',
    isRemote: false,
  },
  {
    id: '5',
    thumbnailUrl: PLACEHOLDER_IMAGE,
    dDayLabel: '상시',
    matchScoreLabel: '적합도 85%',
    avatarUrl: PLACEHOLDER_IMAGE,
    title: '머신러닝 엔지니어',
    companyName: '[Company Name]',
    employmentInfo: '딥사이트 · 서울 역삼',
    isRemote: true,
  },
  {
    id: '6',
    thumbnailUrl: PLACEHOLDER_IMAGE,
    dDayLabel: 'D-3',
    matchScoreLabel: '적합도 77%',
    avatarUrl: PLACEHOLDER_IMAGE,
    title: '프로덕트 매니저',
    companyName: '[Company Name]',
    employmentInfo: '알파스퀘어 · 서울 성동',
    isRemote: false,
  },
];
