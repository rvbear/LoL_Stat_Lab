// src/components/versus/ChampionSelector.tsx
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useChampionStore } from '../../store/useChampionStore';
import type { Champion } from '../../types/champion';
import { getChampionImage } from '../../utils/imageMapper';

interface ChampionSelectorProps {
  selectedChampion: Champion | null;
  onSelect: (champion: Champion) => void;
  onClear: () => void;
  placeholder: string;
}

const ChampionSelector: React.FC<ChampionSelectorProps> = ({
  selectedChampion,
  onSelect,
  onClear,
  placeholder,
}) => {
  const allChampions = useChampionStore((state) => state.champions);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredChampions = useMemo(() => {
    if (!searchTerm) return [];
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return allChampions.filter(
      (champ) =>
        champ.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        champ.id.toLowerCase().includes(lowerCaseSearchTerm)
    ).slice(0, 5); // Show top 5 results
  }, [searchTerm, allChampions]);

  const handleSelect = (champion: Champion) => {
    onSelect(champion);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  if (selectedChampion) {
    return (
      <div className="relative flex w-full max-w-sm items-center gap-4 rounded-lg border border-hextech-gold-400 bg-hextech-blue-900 p-3">
        <img
          src={getChampionImage.icon(selectedChampion.image.full)}
          alt={selectedChampion.name}
          className="h-16 w-16 rounded-md"
        />
        <div className="flex-grow">
          <p className="text-lg font-bold text-hextech-gold-100">{selectedChampion.name}</p>
          <p className="text-xs text-hextech-gold-400">{selectedChampion.title}</p>
        </div>
        <button
          onClick={onClear}
          className="absolute top-2 right-2 text-hextech-gold-500 hover:text-hextech-red"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsDropdownOpen(true)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-hextech-gold-500 bg-hextech-blue-900 p-3 text-hextech-gold-100 placeholder-hextech-gold-500/70 focus:border-hextech-gold-400 focus:outline-none"
      />
      {isDropdownOpen && filteredChampions.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-hextech-gold-400 bg-hextech-black py-1 text-base shadow-lg">
          {filteredChampions.map((champ) => (
            <li
              key={champ.id}
              onClick={() => handleSelect(champ)}
              className="flex cursor-pointer items-center gap-3 p-2 text-hextech-gold-100 hover:bg-hextech-blue-900"
            >
              <img src={getChampionImage.icon(champ.image.full)} alt={champ.name} className="h-8 w-8 rounded-full" />
              <span>{champ.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChampionSelector;
