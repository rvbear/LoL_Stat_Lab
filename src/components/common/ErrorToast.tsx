// src/components/common/ErrorToast.tsx
import React from 'react';

interface ErrorToastProps {
  message: string;
  onClose: () => void;
}

/**
 * 에러 발생 시 사용자에게 알림을 표시하는 토스트 컴포넌트.
 * Hextech 디자인 시스템에 맞춰 스타일링되었습니다.
 */
const ErrorToast: React.FC<ErrorToastProps> = ({ message, onClose }) => {
  return (
    <div
      className="fixed top-4 right-4 z-50 flex items-center rounded-lg border bg-hextech-blue-900 border-hextech-red p-4 text-hextech-gold-100 shadow-lg"
      role="alert"
    >
      <span className="mr-2 text-hextech-red">⚠️</span>
      <p className="text-sm">{message}</p>
      <button
        onClick={onClose}
        className="ml-4 text-hextech-gold-400 hover:text-hextech-gold-100"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
};

export default ErrorToast;