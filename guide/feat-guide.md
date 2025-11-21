# [FEAT-000] 기능명 입력

## 1. 개요 (Overview)

- **목표:** (이 기능을 통해 사용자가 얻는 가치나 시스템의 변화)
- **우선순위:** P0 (필수) / P1 (중요) / P2 (권장)
- **관련 페이지:** (예: `pages/DashboardPage.tsx`)

## 2. 데이터 및 로직 설계 (Data & Logic)

- **Zustand State / Props:**
    - `store.variableName` (Global State)
    - `props.propName` (Component Props)
- **사용 데이터 (API):**
    - `field_name_1`
    - `field_name_2`
- **핵심 로직/공식:**
    - (예: `useEffect` 의존성 배열 조건, 계산 공식 등)
- **필요한 파일/훅:**
    - `pages/ExamplePage.tsx` (페이지)
    - `components/ExampleComponent.tsx` (컴포넌트)
    - `hooks/useExampleHook.ts` (커스텀 훅 - 선택사항)
    - `store/useExampleStore.ts` (상태 관리)

## 3. UI/UX 상세 (Design Spec)

- **레이아웃:** (Grid, Flex 구조 설명)
- **스타일(Tailwind):** (주요 색상, 간격, `clsx` 조건부 스타일 등)
- **인터랙션:**
    - **Default:** (기본 상태)
    - **Hover/Focus:** (마우스 오버/포커스 시 변화)
    - **Click/Action:** (클릭 시 `onClick` 핸들러 동작)

## 4. 테스트 시나리오 (QA Checklist)

구현 후 다음 사항을 확인해야 합니다.

- [ ]  (테스트 항목 1: 예 - 데이터 로딩 중 Skeleton UI가 표시되는가?)
- [ ]  (테스트 항목 2: 예 - 상태 변경 시 리렌더링이 정상적으로 일어나는가?)
- [ ]  (테스트 항목 3: 예 - 콘솔에 TypeScript 에러나 Warning이 없는가?)