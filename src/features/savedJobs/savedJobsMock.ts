export type SavedJobBadgeColor = 'primary' | 'warn' | 'disabled';

export interface SavedJobBadge {
  label: string;
  color: SavedJobBadgeColor;
}

export interface SavedJob {
  id: string;
  title: string;
  meta: string;
  badges: SavedJobBadge[];
  closed?: boolean;
}

export type SavedJobHistoryStatus = 'viewed' | 'skipped' | 'intended';

export interface SavedJobHistoryItem {
  id: string;
  date: string;
  dateLabel: string;
  status: SavedJobHistoryStatus;
  title: string;
  time: string;
  canRestore?: boolean;
}

export const SAVED_JOBS: SavedJob[] = [
  {
    id: '1',
    title: '그로스핏 · IT 서비스 PM (신입)',
    meta: '서울 • 신입 • 정규직',
    badges: [
      { label: '3일 전 저장', color: 'primary' },
      { label: 'D-2 • 마감 임박', color: 'warn' },
      { label: '지원 의향', color: 'warn' },
    ],
  },
  {
    id: '2',
    title: '브라이트코드 · 프론트엔드 엔지니어',
    meta: '서울 · 1~3년 · 정규직',
    badges: [
      { label: '6/21 저장', color: 'primary' },
      { label: 'D-30', color: 'primary' },
      { label: '저장만', color: 'primary' },
    ],
  },
  {
    id: '3',
    title: '파인더스랩 · 데이터 분석가',
    meta: '경기 • 신입 • 정규직',
    badges: [
      { label: '6/18 저장', color: 'primary' },
      { label: '상시', color: 'primary' },
      { label: '저장만', color: 'primary' },
    ],
  },
  {
    id: '4',
    title: '웨이브텍 • 데이터 PM',
    meta: '서울 • 3년 이상 • 정규직',
    badges: [
      { label: '6/10 저장', color: 'disabled' },
      { label: '마감됨', color: 'disabled' },
    ],
    closed: true,
  },
];

export const SAVED_JOB_HISTORY: SavedJobHistoryItem[] = [
  {
    id: 'history-1',
    date: '2026-07-05',
    dateLabel: '7월 5일 (일)',
    status: 'intended',
    title: '알파스퀘어 · 프로덕트 기획',
    time: '20:12',
  },
  {
    id: 'history-2',
    date: '2026-07-05',
    dateLabel: '7월 5일 (일)',
    status: 'skipped',
    title: '브릿지데이터 · 데이터 PM',
    time: '20:12',
    canRestore: true,
  },
  {
    id: 'history-3',
    date: '2026-07-05',
    dateLabel: '7월 5일 (일)',
    status: 'viewed',
    title: '코어리즘 · 서비스 운영',
    time: '19:41',
  },
  {
    id: 'history-4',
    date: '2026-07-04',
    dateLabel: '7월 4일 (토)',
    status: 'viewed',
    title: '파인더스랩 · 데이터 분석가',
    time: '18:34',
  },
];
