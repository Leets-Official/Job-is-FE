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
- `.claude`는 로컬 에이전트 보조 폴더이므로, 사용자가 명시하지 않으면 구현·문서·API 계약의
  근거로 읽거나 참조하지 않습니다.
- 검증하지 않은 변경을 검증한 것처럼 보고하지 않습니다. 무엇을 확인했고 무엇을 확인하지
  못했는지 최종 보고에 남깁니다.

## 작업 전 참조 문서

변경을 시작하기 전에 작업 유형에 해당하는 문서를 읽습니다. 필요한 문서만 읽고, 저장소 문서의
규칙이 스킬이나 일반 권장 사항보다 우선합니다.

| 작업 유형 | 먼저 확인할 문서 |
| --- | --- |
| 기능 추가, 사용자 흐름 또는 화면 상태 변경 | [PRD.md](docs/PRD.md) |
| 컴포넌트, 훅, 상태, 파일 배치 변경 | [ARCHITECTURE.md](docs/ARCHITECTURE.md), [CONVENTIONS.md](docs/CONVENTIONS.md) |
| React 컴포넌트·훅 구현 또는 리뷰 | [REACT_BEST_PRACTICES.md](docs/REACT_BEST_PRACTICES.md), `react-best-practices`·`composition-patterns` 스킬(사용 가능 시) |
| API 연동 또는 API 타입 변경 | 백엔드 API 명세 또는 Swagger 문서 |
| 문서 변경 | 변경 대상 문서와 연결된 프로젝트 문서 |
| 브랜치, 커밋, PR 관련 작업 | [GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md) |

## 프런트엔드 품질

- UI는 의미에 맞는 HTML 요소(`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`,
  `button`, `a`)를 우선 사용합니다. 클릭 가능한 `div`나 `span`을 만들지 않습니다.
- 아이콘만 있는 버튼에는 접근 가능한 이름을 제공하고, 입력 요소는 `label`과 연결합니다.
- 제목은 문서 구조에 맞는 순서로 사용하고, 키보드 탐색·포커스 상태·오류 상태를 고려합니다.
- React 스킬의 권장 사항이 아키텍처 또는 컨벤션과 충돌하면 저장소 문서를 따릅니다.

## Git 정책

- 커밋 메시지와 PR 본문은 제안하거나 작성할 수 있습니다.
- 사용자가 명시적으로 요청하지 않으면 `git commit`, `git push`, PR 생성은 실행하지 않습니다.

## 기술 스택

React 19 + TypeScript · Vite · Tailwind CSS v4 · TanStack Query · pnpm

## 명령어

- `pnpm dev` / `pnpm build` / `pnpm lint` / `pnpm format`

## 검증

- 컴포넌트/훅 변경: `pnpm lint`
- 앱 전반/타입 변경: `pnpm lint` + `pnpm build`
- UI 변경: 가능하면 `pnpm dev`로 확인
- 회귀 위험이 있는 훅/유틸리티 변경: `pnpm test`
