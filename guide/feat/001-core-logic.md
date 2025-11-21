# [FEAT-001] Core Logic: 데이터 핸들링 및 공통 로직

## 1. 개요 (Overview)

- **목표:** 앱 전역에서 사용될 `champion.json` 데이터를 불러와 가공하고, 상태 관리 및 공통 유틸리티 함수(이미지 경로, 스탯 계산)를 제공하여 일관되고 효율적인 데이터 흐름을 구축합니다.
- **우선순위:** P0 (필수)
- **관련 페이지:** 앱 전역

## 2. 데이터 및 로직 설계 (Data & Logic)

- **Zustand State / Props:**
    - `store.championData`: Riot CDN에서 Fetch한 원본 데이터 또는 가공된 챔피언 객체 배열.
    - `store.isLoading`: 데이터 로딩 상태 (true/false).
    - `store.error`: 데이터 로딩 중 발생한 에러 객체 또는 메시지.
- **사용 데이터 (API):**
    - Riot Games CDN: `champion.json`
- **핵심 로직/공식:**
    - **Data Fetching:** Axios 인스턴스를 사용하여 비동기 GET 요청. `try...catch` 구문으로 에러 핸들링.
    - **Image Mapping:**
        - 아이콘: `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/{image.full}`
        - 로딩 이미지: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/{id}_0.jpg`
    - **Stat Calculator:**
        - `calculatedStat = baseStat + (statPerLevel * (level - 1))`
- **필요한 파일/훅:**
    - `store/useChampionStore.ts`: 챔피언 데이터, 로딩/에러 상태를 관리하는 Zustand Store.
    - `hooks/useChampionData.ts`: 앱 실행 시 데이터를 Fetch하고 Store에 저장하는 로직을 담은 커스텀 훅.
    - `utils/statCalculator.ts`: 레벨별 스탯을 계산하는 순수 함수.
    - `utils/imageMapper.ts`: 챔피언 데이터와 이미지 종류를 받아 CDN URL을 반환하는 함수.

## 3. UI/UX 상세 (Design Spec)

- **레이아웃:** 특정 UI 없음 (백그라운드 로직).
- **스타일(Tailwind):**
    - **Loading Spinner:** 앱 초기 로딩 시 화면 중앙에 표시될 스피너.
    - **Error Toast:** 데이터 로딩 실패 시 화면 우측 상단에 표시될 알림창 (`bg-hextech-red`, `text-hextech-gold-100`).
- **인터랙션:**
    - **Default:** 앱 시작 시 자동으로 데이터 로딩 시작.
    - **Loading:** `isLoading`이 true일 때 페이지 컨텐츠 대신 스피너 표시.
    - **Error:** `error` 상태가 존재할 경우 토스트 팝업으로 사용자에게 실패 사실을 알림.

## 4. 테스트 시나리오 (QA Checklist)

- [ ] 앱 실행 시 `champion.json`을 성공적으로 가져오는가?
- [ ] API 호출 중 `isLoading` 상태가 `true`로 변경되고, 로딩 스피너가 표시되는가?
- [ ] API 호출 실패 시 `error` 상태가 업데이트되고, 에러 토스트가 표시되는가?
- [ ] 가져온 데이터가 Zustand Store (`championData`)에 정상적으로 저장되는가?
- [ ] `imageMapper` 유틸리티가 규칙에 맞는 이미지 URL을 정확히 생성하는가?
- [ ] `statCalculator` 유틸리티가 레벨(1~18) 변경 시 스탯을 공식에 맞게 정확히 계산하는가?
