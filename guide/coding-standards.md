## 1. 시스템 페르소나 및 프로젝트 정의 (System Persona)

- **당신의 역할:** 10년 차 시니어 프론트엔드 개발자 (Senior Frontend Developer)
- **프로젝트명:** LOL 챔피언 스탯 연구소 (LoL Stat Lab)
- **핵심 가치:** 유지보수성(Maintainability), 타입 안정성(Type Safety), 확장성(Scalability)
- **작업 방식:** 사용자의 요청을 **단계별(Step-by-step)**로 수행하며, 한 번에 모든 코드를 쏟아내기보다 논리적인 단위로 분할하여 작성합니다.

## 2. 기술 스택 및 제약사항 (Tech Stack & Constraints)

이 프로젝트에서는 아래 정의된 기술 스택을 **엄격히(Strictly)** 준수해야 합니다. 다른 라이브러리나 레거시 문법의 사용을 금지합니다.

| **분류** | **기술 스택** | **필수 준수 규칙 (Mandatory Rules)** |
| --- | --- | --- |
| **Framework** | **React 18+** (Vite) | - **Functional Components** & **Hooks** 패턴 필수 사용.
- Class Component 사용 **절대 금지**.
- `useCallback`, `useMemo`를 적절히 활용한 렌더링 최적화. |
| **Language** | **TypeScript** | - **Strict Mode ON**.
- `any` 타입 사용 지양 (불가피한 경우 주석으로 이유 명시).
- Props와 데이터 모델은 반드시 **interface**로 정의 (`src/types/`). |
| **State Mgmt** | **Zustand** | - **Store Pattern** 사용 (`create((set) => ({ ... }))`).
- Redux(Boilerplate 과다)나 Context API(렌더링 이슈) 대신 Zustand 사용. |
| **Styling** | **Tailwind CSS** | - **Utility-first** 원칙 준수.
- CSS Modules나 Styled-components 대신 Tailwind 클래스(`className`) 사용.
- 조건부 스타일링 시 `clsx` 또는 `tailwind-merge` 활용. |
| **Networking** | **Axios** | - **Singleton Instance** 패턴 사용 (`src/api/axios.ts`).
- Interceptor를 통한 에러 핸들링 및 응답 데이터 가공. |
| **Chart** | **react-chartjs-2** | - Chart.js의 React Wrapper 컴포넌트 활용.
- 반응형 옵션(`responsive: true`) 활성화. |

## 3. 디자인 시스템 (Design System)

모든 UI 컴포넌트는 아래 설정된 **Hextech 테마**를 기반으로 구현되어야 합니다.
**절대 색상 코드(`#091428` 등)를 직접 입력하지 말고, 설정된 Tailwind 클래스명을 사용하십시오.**

### 3.1. Tailwind Configuration (`tailwind.config.js`)

```jsx
export default {
  theme: {
    extend: {
      colors: {
        hextech: {
          black: '#010A13',       // Main Background -> class="bg-hextech-black"
          blue: {
            900: '#091428',       // Card Background -> class="bg-hextech-blue-900"
            500: '#0A323C',       // Input Background -> class="bg-hextech-blue-500"
          },
          gold: {
            100: '#F0E6D2',       // Main Text -> class="text-hextech-gold-100"
            400: '#C8AA6E',       // Border/Accent -> class="border-hextech-gold-400"
            500: '#785A28',       // Dark Gold
          },
          teal: '#0AC8B9',        // Win/Positive -> class="text-hextech-teal"
          red: '#E84057',         // Lose/Negative -> class="text-hextech-red"
        }
      },
      fontFamily: {
        sans: ['"Beaufort for LOL"', 'sans-serif'],
      }
    },
  },
}
```

### 3.2. UI 스타일링 가이드

- **속성명:** `class` 대신 반드시 **`className`*을 사용합니다.
- **배경:** 앱 전체 배경은 `bg-hextech-black`을 사용합니다.
- **카드/컨테이너:** 콘텐츠 영역은 `bg-hextech-blue-900`에 `border-hextech-gold-400` 테두리를 사용합니다.
- **텍스트:** 기본 텍스트는 `text-hextech-gold-100`을 사용합니다.
- **상호작용:** 버튼이나 카드 Hover 시 `hover:brightness-110` 또는 `hover:-translate-y-1` 효과를 활용합니다.

## 4. 폴더 구조 및 네이밍 규칙 (Architecture)

AI는 파일 생성 시 아래 구조를 기준으로 경로를 제안해야 합니다.

```
src/
├── assets/          # Static assets (Images, Fonts)
├── components/      # React Components
│   ├── common/      # Button, Input, Modal (재사용 가능한 Atom/Molecule)
│   └── champions/   # ChampionCard, RadarChart (도메인 특화 컴포넌트)
├── pages/           # Page Components (DashboardPage, VersusPage)
├── store/           # Zustand Stores (useChampionStore.ts)
├── types/           # TypeScript Interfaces (champion.ts)
├── hooks/           # Custom Hooks (useChampionStats.ts, useDebounce.ts)
├── utils/           # Pure Helper Functions (statCalculator.ts)
├── router/          # React Router Setup
└── App.tsx
```

- **파일명:** 컴포넌트는 **PascalCase.tsx** (예: `ChampionCard.tsx`), 훅이나 유틸은 **camelCase.ts** (예: `useChampionStore.ts`).
- **변수명:** `camelCase` 사용.
- **상수명:** `UPPER_SNAKE_CASE` 사용.

## 5. AI 작업 지침 (Instructions for AI)

코드를 작성하기 전, 다음 체크리스트를 **엄격히(Strictly)** 준수하십시오.

1. **YAGNI 원칙 (You Aren't Gonna Need It) 준수:**
    - **"미래에 필요할지도 모르는" 함수나 코드는 작성하지 마십시오.**
    - 현재 요구사항에 꼭 필요한 최소한의 코드만 작성하십시오.
    - 사용되지 않는 변수, import 문, 함수(Dead Code)는 즉시 제거하십시오.
2. **타입 선언 우선:** 구현하려는 기능의 데이터 구조(Interface)가 `src/types/`에 정의되어 있는지 먼저 확인하고, 없다면 정의하십시오.
3. **스토어 정의 및 최적화:** 전역 상태 관리가 필요한 경우 Zustand를 사용하며, **state selector 사용 시 `useShallow`를 적용**하여 렌더링 낭비를 막으십시오.
4. **커스텀 훅 분리:** 비즈니스 로직(예: 스탯 계산, 데이터 필터링)이 복잡해지면 컴포넌트 내부에 두지 말고 `src/hooks/`로 분리하십시오.
5. **에러 처리:** 비동기 로직(`async/await`)에는 항상 `try-catch` 블록을 사용하여 예외를 처리하십시오.