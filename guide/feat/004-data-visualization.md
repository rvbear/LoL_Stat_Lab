# [FEAT-004] Data Visualization: 데이터 시각화

## 1. 개요 (Overview)

- **목표:** 수치로만 표현된 스탯 데이터를 직관적인 차트(레이더, 산점도)로 변환하여, 사용자가 챔피언의 성향과 전체 챔피언 중에서의 위치를 시각적으로 쉽게 파악할 수 있도록 돕는다.
- **우선순위:** P2 (권장)
- **관련 페이지:** `pages/VersusPage.tsx`, 챔피언 상세 모달 등

## 2. 데이터 및 로직 설계 (Data & Logic)

- **Zustand State / Props:**
    - `props.championA`: 시각화할 챔피언 A 데이터.
    - `props.championB`: (선택) 비교 시각화할 챔피언 B 데이터.
    - `store.allChampionData`: (산점도용) `useChampionStore`에서 가져온 전체 챔피언 데이터.
- **사용 데이터 (API):**
    - `champion.info`: `attack`, `defense`, `magic`, `difficulty` (레이더 차트용).
    - `champion.stats`: `attackrange`, `attackdamage` (산점도용).
- **핵심 로직/공식:**
    - **Data Transformation:** 원본 챔피언 데이터를 `react-chartjs-2`가 요구하는 `datasets` 및 `labels` 형식으로 변환.
    - **Radar Chart:**
        - `labels`: ['Attack', 'Defense', 'Magic', 'Difficulty']
        - `datasets`: `info` 객체의 값을 데이터로 사용. 비교 시에는 2개의 `dataset`을 배열에 담아 전달.
    - **Scatter Plot:**
        - `datasets`: `allChampionData`를 순회하며 `{ x: champion.stats.attackrange, y: champion.stats.attackdamage }` 형태의 좌표 배열 생성.
- **필요한 파일/훅:**
    - `components/charts/RadarChart.tsx`: 레이더 차트 컴포넌트.
    - `components/charts/ScatterPlot.tsx`: 산점도 차트 컴포넌트.
    - **Library:** `react-chartjs-2`, `chart.js` (사전 설치 필요: `npm install react-chartjs-2 chart.js`)

## 3. UI/UX 상세 (Design Spec)

- **레이아웃:**
    - 차트는 부모 컨테이너에 반응하여 크기가 조절되어야 함 (`responsive: true`).
- **스타일(Tailwind):**
    - **Radar Chart (Single):** `borderColor`와 `backgroundColor`를 `theme.colors.hextech.teal` (투명도 적용)로 설정.
    - **Radar Chart (Compare):**
        - 챔피언 A: `hextech.teal`
        - 챔피언 B: `hextech.red`
        - 두 `backgroundColor`에 `opacity-50`과 같은 투명도를 적용하여 겹치는 영역을 보여줌.
    - **Scatter Plot:**
        - 기본 점: `hextech.blue.500`
        - 선택된 챔피언 점: `hextech.gold.400` (크기를 더 키우거나 다른 모양으로 강조).
- **인터랙션:**
    - **Default:** 챔피언 데이터가 주어지면 차트가 즉시 렌더링됨.
    - **Hover:** 차트의 각 데이터 포인트(레이더 차트의 꼭짓점, 산점도의 점)에 마우스를 올리면 툴팁으로 해당 챔피언의 이름과 정확한 수치를 표시.

## 4. 테스트 시나리오 (QA Checklist)

- [ ] 레이더 차트가 `info` 객체의 4개 축(Attack, Defense, Magic, Difficulty)에 맞춰 정상적으로 그려지는가?
- [ ] 챔피언 2명을 비교할 때, 두 챔피언의 레이더 차트가 서로 다른 색상으로 겹쳐서 표시되는가?
- [ ] 산점도에 모든 챔피언의 분포가 점으로 표시되는가?
- [ ] 산점도에서 현재 선택된 챔피언의 위치가 특별한 색상이나 크기로 강조되어 표시되는가?
- [ ] 차트의 각 데이터 포인트에 마우스 오버 시, 상세 정보가 담긴 툴팁이 나타나는가?
- [ ] `chart.js` 라이브러리 관련 에러가 브라우저 콘솔에 없는지 확인.
