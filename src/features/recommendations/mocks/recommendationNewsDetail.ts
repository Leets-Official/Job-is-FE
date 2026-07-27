import type { RecommendationNewsDetail } from '@/features/recommendations/types/recommendationNewsDetail';

export const mockRecommendationNewsDetail: RecommendationNewsDetail = {
  id: '1',
  badgeLabel: '혜택',
  title: '신입 · 주니어 개발자 이력서 첨삭 무료 프로그램',
  sourceName: '잡코리아 파트너',
  registeredDate: '2026. 07. 01',
  applicationPeriod: '2026. 07. 01 ~ 2026. 07. 31',
  summary:
    '현직 개발자 멘토가 이력서를 첨삭하고 모의 면접을 진행하는 무료 프로그램입니다.\n신입 · 주니어 개발자를 대상으로 하며 선착순 마감입니다.',
  applicationInfoTitle: '기업 정보',
  applicationInfo: [
    { label: '대상', value: '신입 · 주니어 개발자' },
    { label: '기간', value: '2026. 07. 01 ~ 2026. 07. 31' },
    { label: '방법', value: '잡코리아 파트너 페이지에서 신청서 작성' },
  ],
  source: {
    siteName: '잡코리아 파트너',
    registeredDate: '2026. 07. 01',
    originalUrl: 'https://www.jobkorea.co.kr',
  },
};
