# [FEAT-002] Champion Explorer: 챔피언 탐색기

## 1. 개요 (Overview)

- **목표:** 사용자가 LoL의 모든 챔피언을 한눈에 탐색하고, 역할군(Tag) 필터와 이름 검색, 다양한 정렬 기준을 통해 원하는 챔피언을 쉽고 빠르게 찾을 수 있도록 한다.
- **우선순위:** P0 (필수)
- **관련 페이지:** `pages/ExplorerPage.tsx` (메인 페이지)

## 2. 데이터 및 로직 설계 (Data & Logic)

- **Zustand State / Props:**
    - `store.championData`: `useChampionStore`에서 제공하는 전체 챔피언 리스트.
    - `store.filters`: 현재 적용된 필터 조건 객체 (e.g., `{ tags: ['Fighter'], search: '가렌' }`).
    - `store.sortBy`: 현재 적용된 정렬 기준 (e.g., `'name-asc'`, `'difficulty-desc'`).
- **사용 데이터 (API):**
    - `champion.id`, `champion.name`, `champion.title`
    - `champion.image` (아이콘)
    - `champion.tags` (필터링용)
    - `champion.info.difficulty` (정렬용)
    - `champion.stats.attackrange`, `champion.stats.hp` (정렬용)
- **핵심 로직/공식:**
    - **Filtering:** `championData`를 기준으로 `filters.tags`와 `filters.search` 조건을 모두 만족하는 배열을 반환.
        - Tag: `tags.some(t => filters.tags.includes(t))`
        - Search: `name.includes(filters.search) || id.toLowerCase().includes(filters.search.toLowerCase())`
    - **Sorting:** 필터링된 결과를 `sortBy` 기준에 따라 `Array.prototype.sort()`로 정렬.
- **필요한 파일/훅:**
    - `pages/ExplorerPage.tsx`: 페이지 전체 레이아웃 및 컴포넌트 조합.
    - `components/ChampionGrid.tsx`: 필터/정렬된 챔피언 목록을 Grid 형태로 렌더링.
    - `components/ChampionCard.tsx`: 개별 챔피언의 아이콘, 이름, 칭호를 표시하는 카드.
    - `components/FilterBar.tsx`: 태그(역할군) 필터 버튼 그룹.
    - `components/SearchBar.tsx`: 이름/ID 검색을 위한 입력창.
    - `components/SortDropdown.tsx`: 정렬 기준을 선택하는 드롭다운 메뉴.
    - `store/useExplorerStore.ts`: 필터 및 정렬 상태를 관리하는 Zustand Store.

## 3. UI/UX 상세 (Design Spec)

- **레이아웃:**
    - **Filter/Sort Section:** `flex`, `justify-between`, `items-center`.
    - **Champion Grid:** `grid`, `grid-cols-auto-fill` (반응형). 최소 카드 너비 지정 (e.g., `minmax(100px, 1fr)`).
- **스타일(Tailwind):**
    - **Card:** `bg-hextech-blue-900`, `border border-hextech-gold-400`, `rounded-lg`, `hover:shadow-lg`, `hover:border-hextech-teal`.
    - **Filter Button:** `bg-hextech-blue-500`, `text-hextech-gold-100`. `clsx` 사용, 활성화 시 `bg-hextech-gold-400`, `text-hextech-black`.
- **인터랙션:**
    - **Default:** 필터/정렬 없이 전체 챔피언이 이름(가나다)순으로 표시.
    - **Hover:** 챔피언 카드에 마우스 오버 시 테두리 색상 변경 및 약간 확대되는 효과.
    - **Click/Action:**
        - **Champion Card:** 클릭 시 해당 챔피언의 상세 정보 페이지(`/champions/{id}`)로 이동.
        - **Filter Button:** 클릭 시 `useExplorerStore`의 `tags` 상태 변경 및 그리드 리렌더링 (다중 선택 가능).
        - **Search Input:** 입력 시 실시간으로 `search` 상태 변경 및 그리드 리렌더링.
        - **Sort Dropdown:** 기준 선택 시 `sortBy` 상태 변경 및 그리드 리렌더링.

## 4. 테스트 시나리오 (QA Checklist)

- [ ] 모든 챔피언이 그리드에 정상적으로 표시되는가?
- [ ] 챔피언 카드에 아이콘, 이름, 칭호가 올바르게 표시되는가?
- [ ] 태그 필터 버튼 클릭 시 리스트가 실시간으로 필터링되는가? (다중 선택 및 해제 포함)
- [ ] 검색창에 한글 이름 또는 영문 ID 입력 시 리스트가 실시간으로 필터링되는가?
- [ ] 정렬 기준(이름, 난이도, 사거리 등) 변경 시 리스트가 올바르게 재정렬되는가?
- [ ] 챔피언 카드 클릭 시 올바른 상세 페이지 URL로 이동하는가?
- [ ] 필터링과 정렬 기능이 중첩되어 올바르게 동작하는가?
