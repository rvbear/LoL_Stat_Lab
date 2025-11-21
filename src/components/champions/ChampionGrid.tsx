// src/components/champions/ChampionGrid.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import type { Champion } from '../../types/champion';
import ChampionCard from './ChampionCard';
import useExplorerStore from '../../store/useExplorerStore';

interface ChampionGridProps {
  champions: Champion[];
}

const ChampionGrid: React.FC<ChampionGridProps> = ({ champions }) => {
  const clearFilters = useExplorerStore((state) => state.clearFilters);
  const isLoading = useExplorerStore((state) => state.isLoading);

  if (champions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-hextech-gold-500 bg-hextech-blue-900/50 py-20">
        <p className="mb-2 text-lg font-bold text-hextech-red">
          {isLoading ? '로딩 중...' : '표시할 챔피언이 없습니다.'}
        </p>
        {!isLoading && (
          <button
            onClick={clearFilters}
            className="rounded border border-hextech-gold-400 bg-hextech-blue-500 px-4 py-2 text-sm text-hextech-gold-400 transition-colors hover:bg-hextech-gold-400 hover:text-hextech-black"
          >
            필터 초기화
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {champions.map((champion) => (
        <Link to={`/champions/${champion.id}`} key={champion.id}>
          <ChampionCard champion={champion} />
        </Link>
      ))}
    </div>
  );
};

export default ChampionGrid;
