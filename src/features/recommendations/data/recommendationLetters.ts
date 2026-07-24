export interface RecommendationLetter {
  id: string;
  issueDate: string;
  volumeLabel: string;
  recommendReason: string;
  title: string;
  matchScoreLabel: string;
  companyInfo: string;
  tags: string[];
  dDayLabel: string;
  note: string;
}

export const RECOMMENDATION_LETTERS: RecommendationLetter[] = [
  {
    id: '42',
    issueDate: '2026.07.09',
    volumeLabel: 'VOL.1 · No.42',
    recommendReason: '백엔드 · 데이터 관심사',
    title: '주니어 백엔드 엔지니어',
    matchScoreLabel: '적합도 92%',
    companyInfo: '스택 플로우 · 클라우드 데이터 플랫폼 · 서울',
    tags: ['신입 · 주니어', '서울 강남', '연봉 비공개'],
    dDayLabel: 'D-12',
    note: '백엔드로 커리어를 시작하려는 당신에게 가장 먼저 추천드립니다. 스택플로우는 신입을 시니어와 페어로 붙여 키우는 문화라, CS 기초만 탄탄하면 대규모 분산 시스템을 직접 만지며 빠르게 성장하실 수 있습니다.',
  },
  {
    id: '43',
    issueDate: '2026.07.09',
    volumeLabel: 'VOL.1 · No.43',
    recommendReason: '데이터 · 분석 관심사',
    title: '데이터 분석가',
    matchScoreLabel: '적합도 88%',
    companyInfo: '그로스랩 · 커머스 데이터 플랫폼 · 서울',
    tags: ['신입 · 주니어', '서울 성동', '연봉 협의'],
    dDayLabel: 'D-7',
    note: '그로스랩은 데이터 기반 의사결정 문화가 강한 조직입니다. SQL과 통계 기초가 있다면 실제 매출 지표에 바로 기여할 수 있는 환경입니다.',
  },
  {
    id: '44',
    issueDate: '2026.07.09',
    volumeLabel: 'VOL.1 · No.44',
    recommendReason: '백엔드 · 인프라 관심사',
    title: '클라우드 인프라 엔지니어',
    matchScoreLabel: '적합도 85%',
    companyInfo: '넷파이프 · 클라우드 인프라 · 판교',
    tags: ['경력 1~3년', '경기 판교', '연봉 4000↑'],
    dDayLabel: 'D-5',
    note: '넷파이프는 자체 클라우드 플랫폼을 운영하는 팀으로, 대규모 트래픽 처리 경험을 빠르게 쌓을 수 있습니다.',
  },
  {
    id: '45',
    issueDate: '2026.07.09',
    volumeLabel: 'VOL.1 · No.45',
    recommendReason: '백엔드 · 커머스 관심사',
    title: '커머스 백엔드 개발자',
    matchScoreLabel: '적합도 83%',
    companyInfo: '마켓노트 · 이커머스 플랫폼 · 서울',
    tags: ['신입 · 주니어', '서울 강남', '연봉 비공개'],
    dDayLabel: 'D-9',
    note: '마켓노트는 주문/결제 도메인을 신입에게도 과감히 맡기는 팀입니다. 트래픽이 몰리는 실전 환경에서 배울 점이 많습니다.',
  },
  {
    id: '46',
    issueDate: '2026.07.09',
    volumeLabel: 'VOL.1 · No.46',
    recommendReason: '데이터 · 백엔드 관심사',
    title: '데이터 엔지니어',
    matchScoreLabel: '적합도 80%',
    companyInfo: '파이프라인즈 · 데이터 파이프라인 · 서울',
    tags: ['신입 · 주니어', '서울 마포', '연봉 비공개'],
    dDayLabel: 'D-14',
    note: '파이프라인즈는 배치/실시간 데이터 파이프라인을 함께 설계할 신입을 찾고 있습니다. Python 기초만 있어도 지원 가능합니다.',
  },
];
