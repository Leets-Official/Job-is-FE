# Job-is-FE

Job-is 채용 정보 서비스의 프론트엔드입니다.

## 시작하기

1. `.env.example`을 복사해 `.env.local`을 만들고 값을 채웁니다.
2. `pnpm install`
3. `pnpm dev`

## 주요 스크립트

- `pnpm dev`: 개발 서버 실행
- `pnpm build`: 타입 체크 후 프로덕션 빌드
- `pnpm lint` / `pnpm lint:fix`: ESLint 검사/자동 수정
- `pnpm format`: Prettier로 코드 정리
- `pnpm preview`: 프로덕션 빌드 미리보기

## 개발 환경

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- TanStack Query, react-router, axios
- ESLint + Prettier, husky + lint-staged + commitlint

## 문서

- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — 폴더 구조, 레이어 책임
- [`docs/CONVENTIONS.md`](./docs/CONVENTIONS.md) — 네이밍, 코드 작성 원칙
- [`docs/GIT_WORKFLOW.md`](./docs/GIT_WORKFLOW.md) — 브랜치, 커밋, PR, 이슈 컨벤션
