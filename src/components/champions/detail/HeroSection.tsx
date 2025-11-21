// src/components/champions/detail/HeroSection.tsx
import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ChampionDetail } from '../../../types/champion';
import { getChampionImage } from '../../../utils/imageMapper';

interface HeroSectionProps {
  champion: ChampionDetail;
  skinNum: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ champion, skinNum }) => {
  const splashUrl = getChampionImage.splash(champion.id, skinNum);
  const [isExpanded, setIsExpanded] = useState(false);

  // A character count check is still a good heuristic to decide if the button should be shown.
  const isLongLore = champion.lore.length > 200;

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg border border-hextech-gold-500 bg-cover bg-top p-8 pt-12"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(6, 13, 34, 0.8), rgba(6, 13, 34, 0.5)), url(${splashUrl})`,
      }}
    >
      <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:items-stretch">
        {/* Left Column: Text Info */}
        <div className="flex flex-1 flex-col justify-end text-center md:text-left">
          <div>
            <p className="font-lol text-5xl font-bold text-hextech-gold-100 drop-shadow-lg">
              {champion.name}
            </p>
            <p className="pt-2 text-xl text-hextech-gold-100/80">{champion.title}</p>
            <div className="my-4 flex flex-wrap justify-center gap-2 md:justify-start">
              {champion.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-hextech-blue-500 px-3 py-1 text-xs font-bold text-hextech-teal"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div
              className={twMerge(
                clsx('prose prose-sm max-w-2xl leading-relaxed text-hextech-gold-100/90', {
                  'line-clamp-3': !isExpanded,
                })
              )}
              dangerouslySetInnerHTML={{ __html: champion.lore }}
            />
            {isLongLore && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-3 text-sm font-bold text-hextech-gold-300 hover:text-hextech-gold-100"
              >
                {isExpanded ? '간략히' : '더 보기'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
