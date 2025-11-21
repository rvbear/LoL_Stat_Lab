/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hextech: {
          black: '#010A13',       // 배경
          blue: {
            900: '#091428',       // 카드/패널 배경
            500: '#0A323C',       // 입력창/보조 배경
          },
          gold: {
            100: '#F0E6D2',       // 메인 텍스트
            400: '#C8AA6E',       // 테두리/강조 (Primary)
            500: '#785A28',       // 어두운 골드
          },
          teal: '#0AC8B9',        // 긍정 수치 (Win)
          red: '#E84057',         // 부정 수치 (Lose)
        }
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace'], // 수치 표기용
      }
    },
  },
  plugins: [],
}
