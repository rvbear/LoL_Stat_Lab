# [FEAT-005] Champion Detail: 챔피언 상세 분석 시뮬레이터

## 1. 개요 (Overview)

- **목표:** 개별 챔피언의 상세 정보를 정적인 위키 방식이 아닌, 사용자가 직접 레벨을 조작하며 스탯 변화를 체감할 수 있는 '시뮬레이터' 형태로 제공하여 깊이 있는 분석 경험을 선사한다.
- **우선순위:** P1 (중요)
- **관련 페이지:** `pages/DetailPage.tsx`

## 2. 데이터 및 로직 설계 (Data & Logic)

- **Zustand State / Props:**
    - `store.championMap`: `useChampionStore`에서 제공하는 전체 챔피언 맵. URL의 ID를 이용해 챔피언을 조회하는 데 사용.
    - `useState` (in component): `level` 상태 (1 ~ 18)를 관리.
- **사용 데이터 (API):**
    - `champion.id`, `name`, `title`, `tags`, `blurb` (헤더용)
    - `champion.info` (레이더 차트용)
    - `champion.stats`, `partype` (스탯 시뮬레이터 및 정보 배지용)
    - `champion.image` (배경 이미지용)
- **핵심 로직/공식:**
    - **Data Fetching:** `useParams`로 URL에서 `championId`를 얻고, `championMap.get(championId)`로 챔피언 데이터를 조회.
    - **Stat Calculation:** `getChampionStatsAtLevel` 유틸리티를 재사용하여 `level` 상태에 따라 실시간 스탯 계산.
- **필요한 파일/훅:**
    - `pages/DetailPage.tsx`
    - `components/champions/detail/HeroSection.tsx` (A 구획)
    - `components/champions/detail/StatSimulator.tsx` (C 구획)
    - `components/champions/detail/ResourceInfo.tsx` (D 구획)
    - `components/charts/RadarChart.tsx` (B 구획, 재사용)
    - `utils/statCalculator.ts` (재사용)
    - `utils/imageMapper.ts` (재사용)

## 3. UI/UX 상세 (Design Spec)

- **레이아웃:**
    - 최상단: 뒤로가기 링크.
    - 헤더: 로딩 이미지를 배경으로 하는 전체 너비 Hero Section.
    - 본문: 좌-우 2단 그리드. 좌측에 레이더 차트, 우측에 스탯 시뮬레이터 및 추가 정보.
- **스타일(Tailwind):**
    - **Hero Section:** `bg-cover`, `bg-center`로 배경 이미지를 설정하고, 텍스트 가독성을 위해 `bg-gradient-to-t from-hextech-black` 오버레이 적용.
    - **Stat Simulator Table:** 행마다 `[최종수치]`는 `text-hextech-gold-100`, `(성장수치)`는 `text-hextech-gold-500`으로 구분하여 표시.
    - **Resource/Range Badges:** 아이콘과 텍스트를 포함한 배지 형태. `flex`, `items-center`, `gap-2`, `bg-hextech-blue-500`, `rounded-full`.
- **인터랙션:**
    - **Default:** 페이지 진입 시 1레벨 기준으로 모든 스탯 표시.
    - **Slider Action:** 레벨 슬라이더를 드래그하거나 클릭하면 `level` 상태가 변경되고, `StatSimulator.tsx` 내부의 모든 스탯 수치가 실시간으로 재계산되어 표시됨.
    - **뒤로가기:** 클릭 시 이전 페이지(챔피언 탐색기)로 이동.

## 4. 테스트 시나리오 (QA Checklist)

- [ ] URL (`/champions/:id`)로 직접 접근 시에도 챔피언 데이터가 올바르게 표시되는가?
- [ ] 데이터 로딩 전/실패 시 적절한 폴백(Fallback) UI가 표시되는가?
- [ ] 헤더 섹션에 배경 이미지, 이름, 칭호, 태그, 설명이 모두 올바르게 표시되는가?
- [ ] 레이더 차트가 해당 챔피언의 `info` 데이터에 맞게 정상적으로 그려지는가?
- [ ] 레벨 슬라이더를 조작하면 스탯 테이블의 수치가 공식에 맞게 실시간으로 변경되는가?
- [ ] 사거리, 이동속도, 자원 정보가 디자인에 맞게 배지 형태로 표시되는가?
- [ ] 뒤로가기 버튼이 정상적으로 `ExplorerPage`로 이동시키는가?
