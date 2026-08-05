# Job.is - Product Requirements Document

> 이 문서는 별도 기획 원본이 아니라, 현재 구현된 라우트(`src/routes/router.tsx`)와
> API Reference(`.claude/references/api/`)를 근거로 정리한 문서입니다. 새 기능을 추가하면
> 이 문서도 함께 갱신합니다.

## 1. 서비스 목적

Job.is는 매일 새로 올라오는 채용 공고 중 사용자에게 맞는 몇 건만 골라 아침마다
"레터" 형태로 전달하는 맞춤 취업 뉴스레터 서비스입니다. 공고를 사용자가 직접 검색해서
찾는 방식(탐색)도 지원하지만, 메인 동선은 매일 개인화된 추천을 받아보는 것입니다.

## 2. 문제 정의

- 채용 공고가 매일 대량으로 올라와서 관련 있는 공고만 골라내기 어렵습니다.
- 공고 하나하나가 내 조건(직무/지역/경력/기술스택)과 얼마나 맞는지 판단하는 데 시간이 듭니다.
- 성향이나 적성을 기준으로 한 추천 근거 없이 키워드 검색만으로는 "왜 이 공고가 나에게
  맞는지" 알기 어렵습니다.

## 3. 타겟 사용자

- 매일 아침 정리된 채용 정보를 받아보고 싶은 구직자
- 조건 기반 필터링(직무/지역/경력/고용형태)으로 직접 찾아보고 싶은 구직자

## 4. 페이지 구조

| 라우트                                                                                                  | 화면                                          | 조건                                                                           |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------ |
| `/`                                                                                                     | 랜딩 페이지                                   | 비로그인 전용 (로그인 시 `/recommendations` 또는 `/onboarding`으로 리다이렉트) |
| `/login`, `/login/fail`, `/login/email-required`                                                        | 로그인(기본/실패/이메일 필요)                 | 비로그인 전용                                                                  |
| `/policy`                                                                                               | 약관 동의                                     | 신규 가입자, OAuth 인증 직후                                                   |
| `/oauth/callback`                                                                                       | OAuth 콜백 처리                               | -                                                                              |
| `/account/recovery`                                                                                     | 탈퇴 계정 복구                                | 복구 유예기간(`restorableUntil`) 내                                            |
| `/system-error`                                                                                         | 시스템 에러 안내                              | -                                                                              |
| `/onboarding`, `/onboarding/documents`, `/onboarding/aptitude-test`                                     | 온보딩(프로필 기본정보/서류 업로드/적성 퀴즈) | 로그인 필요, `onboardingCompleted=false`                                       |
| `/recommendations` 및 하위(`/deck`, `/news`, `/news/:id`, `/complete`, `/archive`, `/empty-candidates`) | 오늘의 추천                                   | 로그인 필요, 메인 탭                                                           |
| `/explore`                                                                                              | 공고 탐색                                     | 로그인 필요, 메인 탭                                                           |
| `/saved`                                                                                                | 저장 목록 · 활동 히스토리                     | 로그인 필요, 메인 탭                                                           |
| `/profile`, `/profile/documents`, `/profile/aptitude-test`                                              | 프로필 설정                                   | 로그인 필요                                                                    |
| `/settings/notifications`, `/settings/account`, `/settings/account/withdraw`, `/settings/privacy`       | 설정                                          | 로그인 필요                                                                    |
| `/unsubscribe`                                                                                          | 이메일 수신거부                               | 이메일 링크의 `token`으로 인증(세션 불필요). 현재 정적 UI만 구현됨             |
| `/jobs/:id`, `/jobs/:id/expired`                                                                        | 공고 상세 · 만료 안내                         | 로그인 필요                                                                    |

## 5. 핵심 기능

### F-01: 인증 및 온보딩

- 소셜 로그인(OAuth), 약관 동의, 세션 조회(`GET /api/auth/me`)
- 온보딩: 관심 직무/희망 지역/경력/기술스택 등 프로필 기본정보, 이력서·자기소개서 등 서류
  업로드, 적성 퀴즈 응시
- 계정 탈퇴 및 유예기간 내 복구(`restorableUntil`)

### F-02: 오늘의 추천 (`/recommendations`)

매일 아침 개인화된 채용 공고 카드("레터") 덱을 제공하는 메인 기능입니다.

- 적성 퀴즈 결과를 페르소나로 삼아 pgvector 기반 추천 엔진이 공고별 적합도·추천 이유·요약을
  채운 카드를 생성합니다(`POST /api/decks/generate`, 06:00 자동 배치가 붙기 전까지 수동
  트리거용).
- 오늘의 브리핑 메타(인사말, 건수, 테마, 상태)는 `GET /api/briefings/today`로 조회하며,
  `state`(`pre_slot`/`no_candidates`/`onboarding_incomplete`)에 따라 화면이 분기됩니다.
- 카드 단위로 저장/관심없음(dismiss) 처리, 관심없음 사유 제출이 가능합니다.
- 뉴스/혜택 콘텐츠, 지난 레터 아카이브를 함께 제공합니다.

### F-03: 공고 탐색 (`/explore`)

- 키워드 검색과 직무/지역/경력/고용형태/원격/상시채용 필터로 공고를 직접 찾습니다.
- 오늘의 추천이 메인 동선이고, 탐색은 사용자가 직접 찾고 싶을 때 쓰는 보조 동선입니다.

### F-04: 저장 목록 · 활동 히스토리 (`/saved`)

- 저장한 공고 목록 조회(저장/저장취소 자체는 공고 API의 `POST`/`DELETE /api/jobs/{jobId}/save`)
- 열람·피드백(관심없음) 내역 조회

### F-05: 프로필 (`/profile`)

- 관심 직무, 희망 지역, 경력 단계, 기술스택, 자기소개 등 저장
- 이력서/자기소개서 등 서류 업로드 관리
- 적성 퀴즈 재응시

### F-06: 알림/수신 설정 (`/settings/notifications`)

- 오늘의 브리핑 발송 여부·시간대 설정
- 알림 일시중지(snooze)
- 마케팅 정보 수신 동의

## 6. 공통 규칙

- 공고 상세(`/jobs/:id`)는 만료된 공고에 대해 별도 안내 화면(`/jobs/:id/expired`)을 둡니다.
- 로그인하지 않은 상태로 `/recommendations`, `/explore`, `/saved`, `/profile`, `/settings/*`
  등 보호된 라우트에 접근하면 `/login`으로 리다이렉트됩니다.
- 이미 로그인된 상태로 `/`, `/login`(및 하위)에 접근하면 `onboardingCompleted` 여부에 따라
  `/recommendations` 또는 `/onboarding`으로 리다이렉트됩니다.
