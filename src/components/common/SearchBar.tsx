// src/components/common/SearchBar.tsx
import React from 'react';
import useExplorerStore from '../../store/useExplorerStore';

/**
 * 검색어 입력을 위한 공용 검색창 컴포넌트.
 * 입력된 값은 useExplorerStore와 동기화됩니다.
 */
const SearchBar: React.FC = () => {
  const searchTerm = useExplorerStore((state) => state.searchTerm);
  const setSearchTerm = useExplorerStore((state) => state.setSearchTerm);

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="챔피언 이름 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded border border-hextech-gold-500 bg-hextech-blue-500 px-4 py-2 text-hextech-gold-100 placeholder-hextech-gold-500/70 transition-all focus:border-hextech-gold-400 focus:outline-none focus:ring-1 focus:ring-hextech-gold-400"
      />
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-hextech-gold-500">
        🔍
      </div>
    </div>
  );
};

export default SearchBar;
