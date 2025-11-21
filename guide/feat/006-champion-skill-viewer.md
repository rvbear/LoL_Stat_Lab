# [FEAT-006] Champion Detail Enhancement: 스킬 & 스킨 뷰어

## 1. 개요 (Overview)

- **목표:** 챔피언 상세 페이지에 스킬 정보와 더불어, 보유한 모든 스킨을 시각적으로 탐색할 수 있는 '스킨 뷰어' 기능을 추가합니다. 사용자는 스킬의 상세 정보와 함께 다양한 스킨의 일러스트를 한 곳에서 확인할 수 있습니다.
- **우선순위:** P1 (High)
- **관련 페이지:** `pages/DetailPage.tsx`

## 2. 데이터 및 로직 설계 (Data & Logic)

- **Zustand State / Props:**
    - `store.championMap`: `championFull.json`에서 로드된 전체 챔피언 상세 정보 맵.
    - `useState` (in `DetailPage`): `selectedSkinNum` 상태를 추가하여 현재 선택된 스킨의 번호(`skin.num`)를 관리합니다.
- **사용 데이터 (API):**
    - `champion.spells`: 챔피언 스킬(Q,W,E,R) 배열
    - `champion.passive`: 챔피언 패시브 스킬 객체
    - `champion.skins`: 챔피언의 모든 스킨 정보가 담긴 배열
- **핵심 로직/공식:**
    - **Skin Image URL:** `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/{championId}_{skinNum}.jpg` 공식을 사용하여 스킨 스플래시 아트 URL을 생성합니다.
    - **State Management:** `DetailPage`에서 `selectedSkinNum` 상태를 관리하고, 이를 `HeroSection`과 `SkinCarousel` 컴포넌트에 props로 전달합니다.
    - **HTML Parsing:** 스킬 설명(`description`, `tooltip`)에 포함된 HTML 태그를 React 노드로 변환합니다.
- **필요한 파일/훅:**
    - `pages/DetailPage.tsx`: `SkinCarousel`을 추가하고, `selectedSkinNum` 상태를 관리합니다.
    - `components/champions/detail/HeroSection.tsx`: `skinNum` prop을 받아 배경 이미지를 동적으로 변경하도록 수정합니다.
    - `components/champions/detail/SkillViewer.tsx`: (기존) 스킬 탭 및 설명 패널.
    - `components/champions/detail/SkinCarousel.tsx`: (신규) 스킨 목록을 보여주는 캐러셀 컴포넌트.
    - `utils/htmlParser.tsx`: (기존) HTML 문자열 파싱 유틸리티.

## 3. UI/UX 상세 (Design Spec)

### 3.1. 스킬 뷰어 (Skill Viewer)

- **레이아웃:** 패시브, Q, W, E, R 아이콘을 가로로 나열 (`flex`, `gap-4`). 하단에 설명 패널 배치.
- **스타일(Tailwind):**
    - **Active Tab:** `border-hextech-gold-400`, `scale-110`.
    - **Inactive Tab:** `filter grayscale`, `opacity-60`.
- **인터랙션:** 아이콘 클릭 시 해당 스킬 정보를 표시.

### 3.2. 스킨 뷰어 (Skin Carousel)

- **레이아웃:** 수평 스크롤이 가능한 캐러셀 형태. 양쪽에 네비게이션 버튼(좌/우 화살표)을 배치합니다.
- **스타일(Tailwind):**
    - 각 스킨은 세로형 썸네일 이미지와 하단의 스킨 이름으로 구성됩니다.
    - **Selected Skin:** 현재 선택된 스킨 썸네일은 `border-2 border-hextech-gold-400`과 `brightness-110` 효과로 강조합니다.
    - **Navigation Buttons:** `bg-hextech-blue-800/50` 배경에 `text-hextech-gold-300` 색상의 아이콘을 사용하며, `hover` 시 아이콘이 밝아집니다.
- **인터랙션:**
    - **Default:** 페이지 로드 시 기본 스킨(skin.num === 0)이 선택됩니다.
    - **Click/Action:** 스킨 썸네일을 클릭하면 `DetailPage`의 `selectedSkinNum` 상태가 업데이트되고, `HeroSection`의 배경이 해당 스킨의 스플래시 아트로 즉시 변경됩니다.
    - **Navigation:** 좌/우 버튼 클릭 시 캐러셀이 스크롤됩니다.

## 4. 테스트 시나리오 (QA Checklist)

### 스킬 뷰어
- [ ] 패시브, Q, W, E, R 스킬 아이콘이 모두 표시되는가?
- [ ] 스킬 아이콘 클릭 시 해당 스킬 정보(이름, 쿨타임, 소모값, 설명)가 올바르게 표시되는가?
- [ ] 스킬 설명의 HTML(`br`, `font`)이 올바르게 파싱되어 출력되는가?

### 스킨 뷰어
- [ ] 챔피언의 모든 스킨(기본 스킨 포함)이 캐러셀에 정상적으로 표시되는가?
- [ ] 페이지 최초 로드 시, 기본 스킨이 '선택됨' 상태로 표시되고 `HeroSection` 배경도 기본 스킨 이미지인가?
- [ ] 다른 스킨 썸네일 클릭 시 `HeroSection`의 배경 이미지가 해당 스킨의 스플래시 아트로 즉시 변경되는가?
- [ ] 클릭된 썸네일에 선택 상태 스타일(골드 테두리, 밝기 증가)이 올바르게 적용되는가?
- [ ] 캐러셀의 좌/우 네비게이션 버튼이 정상적으로 동작하는가?
- [ ] 스킨 이름이 썸네일 하단에 올바르게 표시되는가? ('기본' 스킨의 경우 'default' 대신 '기본'으로 표시)
