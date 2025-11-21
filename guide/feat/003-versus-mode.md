# [FEAT-003] Versus Mode: 1:1 비교 시뮬레이터

## 1. 개요 (Overview)

- **목표:** 사용자가 두 챔피언을 선택하고 특정 레벨에서의 스탯을 비교하여 어느 챔피언이 우위에 있는지 직관적으로 파악할 수 있도록 한다.
- **우선순위:** P1 (중요)
- **관련 페이지:** `pages/VersusPage.tsx`

## 2. 데이터 및 로직 설계 (Data & Logic)

- **Zustand State / Props:**
    - `store.championA`: 비교할 첫 번째 챔피언 객체.
    - `store.championB`: 비교할 두 번째 챔피언 객체.
    - `store.level`: 1부터 18까지의 레벨 값.
- **사용 데이터 (API):**
    - `champion.stats`: `hp`, `mp`, `attackdamage`, `armor`, `spellblock`, `attackrange`, `movespeed` 등 기본 스탯.
    - `champion.stats`: `hpperlevel`, `mpperlevel`, `attackdamageperlevel` 등 레벨당 성장 스탯.
- **핵심 로직/공식:**
    - **Stat Calculation:** `calculatedStat = baseStat + (statPerLevel * (level - 1))`. `statCalculator` 유틸리티 재사용.
    - **Comparison:** 챔피언 A와 B의 계산된 스탯을 비교하여 더 높은 값을 가진 쪽을 판별.
- **필요한 파일/훅:**
    - `pages/VersusPage.tsx`: 비교 페이지의 전체 레이아웃.
    - `components/ChampionSelector.tsx`: 자동 완성 검색 기능이 포함된 챔피언 선택 컴포넌트.
    - `components/LevelSlider.tsx`: 1-18 레벨을 조절하는 Range Input 슬라이더.
    - `components/StatTable.tsx`: 두 챔피언의 스탯을 나란히 보여주는 테이블.
    - `store/useVersusStore.ts`: `championA`, `championB`, `level` 상태를 관리하는 Zustand Store.
    - `utils/statCalculator.ts`: Core Logic의 스탯 계산기 재사용.

## 3. UI/UX 상세 (Design Spec)

- **레이아웃:**
    - **Top:** 2개의 `ChampionSelector`를 `flex`, `justify-around`로 배치.
    - **Middle:** `LevelSlider`를 중앙에 배치.
    - **Bottom:** `StatTable`을 중앙에 배치.
- **스타일(Tailwind):**
    - **Selector:** `bg-hextech-blue-900`, `border-hextech-gold-400`.
    - **Slider:** `accent-hextech-gold-400` (슬라이더 핸들 및 트랙 색상).
    - **Table:** `divide-y`, `divide-hextech-blue-500`. 테이블 헤더는 `bg-hextech-blue-500`.
    - **Highlight:** 스탯이 더 높은 쪽에 `text-hextech-teal`과 `font-bold` 적용. 낮은 쪽은 `text-hextech-red` 적용.
- **인터랙션:**
    - **Default:** 챔피언이 선택되지 않았을 경우, "챔피언을 선택하세요"와 같은 플레이스홀더 표시.
    - **Champion Select:** `ChampionSelector`에서 챔피언 검색 및 선택. 선택 시 `useVersusStore` 상태 업데이트.
    - **Level Slide:** 슬라이더를 드래그하면 `level` 상태가 실시간으로 변경되고, `StatTable`의 모든 수치가 재계산되어 리렌더링됨.

## 4. 테스트 시나리오 (QA Checklist)

- [ ] 챔피언 A와 B를 각각 검색하여 선택할 수 있는가?
- [ ] 최대 2명의 챔피언만 선택 가능한가?
- [ ] 레벨 슬라이더를 조작(드래그, 클릭)하면 레벨 값이 정상적으로 변경되는가?
- [ ] 레벨 변경 시 스탯 테이블의 모든 수치가 공식에 맞게 실시간으로 업데이트되는가?
- [ ] 스탯 테이블에서 두 챔피언의 스탯을 비교하여 더 높은 쪽에 `hextech-teal` 색상 강조가 적용되는가?
- [ ] 챔피언 중 한 명을 변경하거나 제거했을 때 테이블이 즉시 업데이트되는가?
- [ ] 동일한 챔피언을 A와 B에 모두 선택했을 때, 모든 스탯이 동일하며 하이라이트가 없는지 확인.
