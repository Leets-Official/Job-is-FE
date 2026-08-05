# job-is-fe

채용 정보 서비스 프론트엔드. React 19 + Vite 기반 SPA입니다.

## 기본 원칙

- 사용자가 다르게 요청하지 않으면 한국어로 사고하고 응답합니다.
- 구현 전에 관련 파일과 지침을 먼저 확인하고, 작업은 작고 검증 가능한 단위로 나눕니다.
- 요청과 무관한 리팩터링·정리는 diff에 섞지 않고, 기존 코드 스타일과 파일 위치를 따릅니다.
- 새 production dependency, 새 최상위 폴더, 새 UI 라이브러리는 도입 전에 확인을 받습니다.
- `pnpm`만 사용합니다. `npm`/`yarn`/`npx` 명령을 쓰지 않습니다.
- 엔드포인트 경로, request body, response shape를 추측해서 만들지 않고 실제 API 문서를
  먼저 확인합니다.
- 검증하지 않은 변경을 검증한 것처럼 보고하지 않습니다. 무엇을 확인했고 무엇을 확인하지
  못했는지 최종 보고에 남깁니다.

## 기술 스택

React 19 + TypeScript · Vite · Tailwind CSS v4 · TanStack Query · pnpm

## 명령어

- `pnpm dev` / `pnpm build` / `pnpm lint` / `pnpm format`

## 검증

- 컴포넌트/훅 변경: `pnpm lint`
- 앱 전반/타입 변경: `pnpm lint` + `pnpm build`
- UI 변경: 가능하면 `pnpm dev`로 확인
- 회귀 위험이 있는 훅/유틸리티 변경: `pnpm test`

## 문서

- [ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [CONVENTIONS.md](docs/CONVENTIONS.md)
- [GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md)
- [PRD.md](docs/PRD.md)
- [REACT_BEST_PRACTICES.md](docs/REACT_BEST_PRACTICES.md)
