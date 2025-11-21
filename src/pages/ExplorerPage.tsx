// src/pages/ExplorerPage.tsx
import React from 'react';
import ChampionGrid from '../components/champions/ChampionGrid';
import FilterBar from '../components/champions/FilterBar';
import SortDropdown from '../components/champions/SortDropdown';
import SearchBar from '../components/common/SearchBar';
import { useFilteredChampions } from '../hooks/useFilteredChampions';

/**
 * 챔피언 탐색기 메인 페이지.
 * 필터링, 정렬, 검색 UI와 챔피언 그리드를 조합하여 표시합니다.
 */
const ExplorerPage: React.FC = () => {
  const filteredChampions = useFilteredChampions();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* 컨트롤 섹션: 검색, 필터, 정렬 */}
      <section className="mb-8 space-y-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <SearchBar />
            <SortDropdown />
        </div>
        <FilterBar />
      </section>

      {/* 챔피언 그리드 섹션 */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="border-l-4 border-hextech-teal pl-3 text-xl font-bold text-hextech-gold-100">
            전체 챔피언{' '}
            <span className="ml-1 text-hextech-gold-400">
              {filteredChampions.length}
            </span>
          </h2>
          <div className="text-xs text-hextech-gold-500">Ver 15.23.1</div>
        </div>
        <ChampionGrid champions={filteredChampions} />
      </section>
    </div>
  );
};

export default ExplorerPage;