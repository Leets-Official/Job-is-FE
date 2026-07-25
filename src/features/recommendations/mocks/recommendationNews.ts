export interface RecommendationNewsItem {
  badgeLabel: string;
  title: string;
  description: string;
  href: string;
}

export const RECOMMENDATION_NEWS_ITEMS: RecommendationNewsItem[] = [
  {
    badgeLabel: '뉴스',
    title: '2026년 신입 개발자 채용 시장 리포트',
    description: '잡코리아 · 하반기 백엔드 채용 공고 전년 대비 18% 증가',
    href: '#',
  },
  {
    badgeLabel: '혜택',
    title: '이력서 첨삭 1:1 무료 세션',
    description: 'Job.is 파트너 · 신입 지원자 대상 · 선착순 30명',
    href: '#',
  },
];
