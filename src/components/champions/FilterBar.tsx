// src/components/champions/FilterBar.tsx
import React from 'react';
import useExplorerStore from '../../store/useExplorerStore';
import type { ChampionTag } from '../../types/champion';
import clsx from 'clsx';

const ALL_TAGS: ChampionTag[] = [
  'Fighter',
  'Tank',
  'Mage',
  'Assassin',
  'Marksman',
  'Support',
];

const FilterBar: React.FC = () => {
  const selectedTags = useExplorerStore((state) => state.selectedTags);
  const toggleTag = useExplorerStore((state) => state.toggleTag);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 rounded-md border border-hextech-gold-500 bg-hextech-blue-900/50 p-4">
      {ALL_TAGS.map((tag) => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={clsx(
            'rounded px-3 py-1.5 text-xs font-bold transition-all',
            'border border-transparent', // Base border
            {
              'bg-hextech-gold-400 text-hextech-black shadow-md':
                selectedTags.includes(tag),
              'bg-hextech-blue-500 text-hextech-gold-100 hover:border-hextech-gold-400':
                !selectedTags.includes(tag),
            }
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
