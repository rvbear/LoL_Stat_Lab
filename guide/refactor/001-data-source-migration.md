# [REFACTOR-001] Data Source Migration to championFull.json

## 1. 개요 (Overview)

- **목표:** 기존의 `champion.json` 데이터 소스를 상세 정보가 모두 포함된 `championFull.json`으로 교체합니다. 이를 통해, 앱 초기 로딩 시 모든 챔피언의 스킬, 스토리 등 상세 정보를 한 번에 가져와 상세 페이지 진입 시 발생하는 추가 API 호출을 제거하고, 전반적인 데이터 처리 효율성과 사용자 경험을 개선합니다.
- **우선순위:** P1 (High)
- **관련 페이지:** 앱 전역 (`useChampionData.ts`, `useChampionStore.ts`, `DetailPage.tsx` 등)

## 2. 데이터 및 로직 설계 (Data & Logic)

- **Zustand State / Props:**
    - `store.championData`: 내부 데이터 타입이 `Champion`에서 모든 정보가 포함된 `ChampionDetail`로 변경됩니다.
    - `store.fetchChampionDetail(id)`: 더 이상 API를 호출하지 않고, `championData` 상태에서 ID를 키로 챔피언을 찾는 동기식 로직으로 변경됩니다.
    - `store.championMap` / `store.champions`: `championFull.json`의 `data`는 객체이므로, `Object.values()`를 사용해 배열로 변환하는 과정이 필요합니다.
- **사용 데이터 (API):**
    - **AS-IS:** `https://.../champion.json`
    - **TO-BE:** `https://ddragon.leagueoflegends.com/cdn/15.23.1/data/ko_KR/championFull.json`
- **핵심 로직/공식:**
    - **Data Fetching:** `useChampionData` 훅에서 `championFull.json`을 요청하도록 URL을 수정합니다.
    - **Data Transformation:** API 응답은 `{ "data": { "Aatrox": {...}, "Ahri": {...} } }` 형태이므로, `Object.values(response.data.data)`를 통해 챔피언 객체의 배열을 만들어 스토어에 저장합니다.
    - **State Access:** `DetailPage` 등에서 개별 챔피언 데이터를 가져오기 위해 스토어에 저장된 `championData`를 `id`로 검색하는 로직으로 변경합니다.
- **필요한 파일/훅:**
    - `hooks/useChampionData.ts`: 데이터 fetch URL 및 변환 로직 수정.
    - `store/useChampionStore.ts`: `fetchChampionDetail` 액션의 내부 로직을 API 호출에서 동기식 검색으로 변경. 상태 타입 업데이트.
    - `pages/DetailPage.tsx`: 비동기 로직 대신 스토어에서 바로 데이터를 가져오도록 수정.

## 3. UI/UX 상세 (Design Spec)

- **레이아웃:** UI 변경 사항 없음. 데이터 흐름 리팩토링입니다.
- **스타일(Tailwind):** 변경 사항 없음.
- **인터랙션:**
    - **AS-IS:** 상세 페이지 진입 시 로딩 스피너 표시 후 데이터 출력.
    - **TO-BE:** 앱 초기 로딩 시간은 미세하게 증가할 수 있으나, 상세 페이지 진입 시에는 로딩 없이 데이터가 즉시 표시되어야 합니다.

## 4. 테스트 시나리오 (QA Checklist)

- [ ] 앱 시작 시 `championFull.json`을 성공적으로 가져오는가?
- [ ] API 응답의 `data` 객체가 배열 형태로 정상적으로 변환되어 `championData` 스토어에 저장되는가?
- [ ] 챔피언 탐색기 페이지(`ExplorerPage`)가 기존과 동일하게 모든 챔피언을 표시하는가?
- [ ] 챔피언 상세 페이지(`DetailPage`) 진입 시, 별도의 로딩 없이 스킬과 스토리 정보가 즉시 표시되는가?
- [ ] `VersusPage`, `StatSimulator` 등 기존 기능들이 변경된 데이터 구조에서도 올바르게 작동하는가?
- [ ] 불필요해진 `fetchChampionDetail`의 비동기 API 호출 관련 코드가 제거되었는지 확인.
- [ ] 네트워크 탭에서 상세 페이지 진입 시 `/champion/{id}.json` 요청이 발생하지 않는지 확인.
