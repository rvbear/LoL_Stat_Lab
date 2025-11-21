// src/components/common/Spinner.tsx
import React from 'react';

/**
 * 전역 로딩 상태를 표시하는 스피너 컴포넌트.
 * 화면 중앙에 위치하며, Hextech 테마의 색상을 사용합니다.
 */
const Spinner: React.FC = () => (
  <div className="flex h-screen w-full flex-col items-center justify-center bg-hextech-black gap-4">
    <div
      className="h-16 w-16 animate-spin rounded-full border-4 border-hextech-blue-500 border-t-hextech-gold-400"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
    <p className="text-hextech-gold-400 font-mono animate-pulse">
      Loading Data...
    </p>
  </div>
);

export default Spinner;