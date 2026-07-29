export type AptitudeChoiceValue = 1 | 2;

export interface AptitudeOption {
  value: AptitudeChoiceValue;
  label: string;
}

export interface AptitudeQuestion {
  questionNo: number;
  prompt: string;
  options: [AptitudeOption, AptitudeOption];
}

export const APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  {
    questionNo: 1,
    prompt: '새 팀에 합류한다면?',
    options: [
      { value: 1, label: '체계·매뉴얼이 잘 갖춰진 안정된 팀' },
      { value: 2, label: '유연한 체계 아래 빠르게 크는 팀' },
    ],
  },
  {
    questionNo: 2,
    prompt: '더 끌리는 회사는?',
    options: [
      { value: 1, label: '오래 다닐 수 있는 탄탄한 회사' },
      { value: 2, label: '지금은 작아도 폭발 성장할 회사' },
    ],
  },
  {
    questionNo: 3,
    prompt: '연말 회사 소식으로 더 반가운 건?',
    options: [
      { value: 1, label: '“창립 30주년, 안정 경영 지속”' },
      { value: 2, label: '“시리즈B 투자유치, 사업 확장”' },
    ],
  },
  {
    questionNo: 4,
    prompt: '더 견디기 힘든 상황은?',
    options: [
      { value: 1, label: '매년 조직개편·직무 변경' },
      { value: 2, label: '몇 년째 똑같은 업무의 반복' },
    ],
  },
  {
    questionNo: 5,
    prompt: '금요일 퇴근 직전 급한 요청',
    options: [
      { value: 1, label: '월요일 아침에 처리하겠다' },
      { value: 2, label: '오늘 끝내고 마음 편히 주말' },
    ],
  },
  {
    questionNo: 6,
    prompt: '더 좋은 회사는?',
    options: [
      { value: 1, label: '칼퇴·유연근무 보장' },
      { value: 2, label: '바쁘지만 성과만큼 확실히 인정' },
    ],
  },
  {
    questionNo: 7,
    prompt: '이상적인 하루는?',
    options: [
      { value: 1, label: '일과 삶의 경계가 뚜렷' },
      { value: 2, label: '몰입해서 시간 가는 줄 모름' },
    ],
  },
  {
    questionNo: 8,
    prompt: '더 부러운 동료는?',
    options: [
      { value: 1, label: '취미·자기 시간 확실한 동료' },
      { value: 2, label: '큰 프로젝트를 이끄는 동료' },
    ],
  },
  {
    questionNo: 9,
    prompt: '커리어 목표에 가까운 건?',
    options: [
      { value: 1, label: '한 분야 최고 전문가' },
      { value: 2, label: '두루 아는 제네럴리스트' },
    ],
  },
  {
    questionNo: 10,
    prompt: '더 재밌는 업무는?',
    options: [
      { value: 1, label: '내 전문 영역 깊게' },
      { value: 2, label: '새 영역 넘나들며 다양하게' },
    ],
  },
];
