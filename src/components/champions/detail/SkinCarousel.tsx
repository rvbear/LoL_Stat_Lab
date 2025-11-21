// src/components/champions/detail/SkinCarousel.tsx
import React, { useRef } from 'react';
import type { ChampionDetail, ChampionSkin } from '../../../types/champion';
import { getChampionImage } from '../../../utils/imageMapper';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SkinCarouselProps {
  champion: ChampionDetail;
  selectedSkinNum: number;
  onSkinSelect: (skinNum: number) => void;
}

const SkinCarousel: React.FC<SkinCarouselProps> = ({
  champion,
  selectedSkinNum,
  onSkinSelect,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <h3 className="mb-4 text-2xl font-bold text-hextech-gold-100">스킨</h3>
      <div className="relative flex items-center">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 z-10 h-2/3 rounded-r-lg bg-hextech-black/50 px-2 text-hextech-gold-200 transition-colors hover:bg-hextech-black/80 hover:text-hextech-gold-100"
          aria-label="Scroll left"
        >
          &#10094;
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex-1 overflow-x-auto whitespace-nowrap py-2"
        >
          <div className="inline-flex gap-4 px-12">
            {champion.skins.map((skin) => (
              <SkinCard
                key={skin.id}
                championId={champion.id}
                skin={skin}
                isSelected={skin.num === selectedSkinNum}
                onClick={() => onSkinSelect(skin.num)}
              />
            ))}
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 z-10 h-2/3 rounded-l-lg bg-hextech-black/50 px-2 text-hextech-gold-200 transition-colors hover:bg-hextech-black/80 hover:text-hextech-gold-100"
          aria-label="Scroll right"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

interface SkinCardProps {
  championId: string;
  skin: ChampionSkin;
  isSelected: boolean;
  onClick: () => void;
}

const SkinCard: React.FC<SkinCardProps> = ({ championId, skin, isSelected, onClick }) => {
  const loadingSplashUrl = getChampionImage.loading(championId, skin.num);
  const skinName = skin.name === 'default' ? '기본 스킨' : skin.name;

  return (
    <div
      className={twMerge(
        clsx(
          'flex w-32 shrink-0 cursor-pointer flex-col gap-2 rounded-md border-2 border-transparent p-1 transition-all duration-200 hover:border-hextech-gold-300/50 hover:brightness-105',
          {
            'border-hextech-gold-400 brightness-110': isSelected,
          }
        )
      )}
      onClick={onClick}
    >
      <img
        src={loadingSplashUrl}
        alt={skinName}
        className="h-48 w-full rounded-sm object-cover object-top"
      />
      <p className="truncate text-center text-sm text-hextech-gold-100/80">{skinName}</p>
    </div>
  );
};

export default SkinCarousel;
