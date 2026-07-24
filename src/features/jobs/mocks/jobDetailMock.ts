import type { JobDetail } from '../types/jobDetail';

export const mockJobDetail: JobDetail = {
  id: '1',
  sourceName: '원티드',
  postedDate: '2026. 6. 28. 게시',
  rating: 4.0,
  title: '주니어 백엔드 엔지니어',
  subtitle: '스택플로우 · 클라우드 데이터 플랫폼 · 서울',
  employmentType: '정규직',
  location: '서울 강남 · 원격',
  dDayLabel: 'D-12',
  glanceItems: [
    { label: '직무', value: '백엔드 엔지니어' },
    { label: '경력', value: '신입~1년' },
    { label: '지역', value: '서울 강남 · 원격' },
    { label: '고용 형태', value: '정규직' },
    { label: '마감', value: 'D-12' },
    { label: '연봉', value: '급여 비공개' },
  ],
  fitCriteria: [
    {
      status: 'met',
      title: '성장 환경',
      description: '신입을 시니어와 페어로 키워요. 당신이 1순위로 보는 ‘사수’가 확실합니다.',
    },
    {
      status: 'estimated',
      title: '연봉',
      description:
        '공고엔 비공개지만, 비슷한 산업 신입 백엔드 기준 4,500~5,000으로 추정돼요. 기대 범위 안쪽입니다.',
    },
    {
      status: 'caution',
      title: '안정성',
      description: '시리즈 D로 빠르게 크는 중이라 기회는 많지만, 그만큼 빠른 적응이 필요해요.',
    },
  ],
  editorNote:
    '백엔드로 커리어를 시작하려는 당신에게 가장 먼저 추천드립니다.\nCS 기초만 탄탄하면 대규모 분산 시스템을 직접 만지며 빠르게 성장하실 수 있습니다.',
  matchScore: 92,
  matchReasons: [
    { label: '백엔드 데이터', progress: 90 },
    { label: '성장 결과 · 탐구형', progress: 85 },
    { label: '희망 지역 · 경력 조건', progress: 95 },
  ],
  contentSections: [
    {
      heading: '주요 업무',
      items: ['분산 스토리지 엔진의 API 설계 구현', '대용량 데이터 파이프라인 성능 최적화'],
    },
    { heading: '자격 요건', items: ['CS 기초 이해', 'Python 또는 Go 실무 경험'] },
    { heading: '우대 사항', items: ['분산 시스템 · 데이터 인프라 관심'] },
  ],
  techStack: ['Python', 'Go', 'PostgreSQL'],
  company: {
    industry: '데이터 인프라',
    employeeCount: '정보 없음',
    companySize: '정보 없음',
    isListed: '정보 없음',
  },
  source: {
    siteName: '원티드',
    collectedDate: '2026. 07. 05',
    notice: '마감 · 상세 조건은 원문에서 최종 확인 하세요',
    originalUrl: 'https://www.wanted.co.kr',
  },
};
