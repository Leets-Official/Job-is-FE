# job-is-fe

채용 정보 서비스 프론트엔드. React 19 + Vite 기반 SPA입니다.

## 기본 원칙

- 사용자가 다르게 요청하지 않으면 한국어로 사고하고 응답합니다.
- 구현 전에 관련 파일과 지침을 먼저 확인하고, 작업은 작고 검증 가능한 단위로 나눕니다.

## 기술 스택

React 19 + TypeScript · Vite · Tailwind CSS v4 · pnpm

## 명령어

- `pnpm dev` / `pnpm build` / `pnpm lint` / `pnpm format`

## 검증

- 컴포넌트/훅 변경: `pnpm lint`
- 앱 전반/타입 변경: `pnpm lint` + `pnpm build`
- UI 변경: 가능하면 `pnpm dev`로 확인

## 문서

- `docs/ARCHITECTURE.md`, `docs/CONVENTIONS.md`, `docs/GIT_WORKFLOW.md`
