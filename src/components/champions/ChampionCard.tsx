// src/components/champions/ChampionCard.tsx
import React from 'react';
import type { Champion } from '../../types/champion';
import { getChampionImage } from '../../utils/imageMapper';

interface ChampionCardProps {
  champion: Champion;
}

/**
 * 개별 챔피언의 요약 정보를 표시하는 카드 컴포넌트.
 * Hextech 디자인 시스템에 맞춰 스타일링되었습니다.
 */
const ChampionCard: React.FC<ChampionCardProps> = ({ champion }) => {
  return (
    <div className="group relative flex flex-col items-center rounded-md border border-hextech-gold-400 bg-hextech-blue-900 p-4 transition-all duration-300 hover:-translate-y-2 hover:border-hextech-gold-100 hover:shadow-[0_0_15px_rgba(200,170,110,0.4)]">
      {/* 챔피언 이미지 */}
      <div className="relative mb-3">
        <img
          src={getChampionImage.icon(champion.image.full)}
          alt={champion.name}
          className="h-20 w-20 rounded-full border-2 border-hextech-gold-500 transition-colors group-hover:border-hextech-teal"
          loading="lazy"
        />
        <div className="absolute -bottom-2 -right-2 rounded border border-hextech-gold-500 bg-hextech-black px-1.5 py-0.5 text-xs text-hextech-gold-400">
          {champion.info.difficulty}
        </div>
      </div>

      {/* 텍스트 정보 */}
      <h3 className="text-lg font-bold text-hextech-gold-100 transition-colors group-hover:text-hextech-gold-400">
        {champion.name}
      </h3>
      <p className="mb-3 w-full truncate text-center text-xs text-hextech-gold-500">
        {champion.title}
      </p>

      {/* 태그 정보 */}
      <div className="flex w-full flex-wrap justify-center gap-1">
        {champion.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-hextech-blue-500 px-2 py-0.5 text-[10px] text-hextech-teal"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ChampionCard;
