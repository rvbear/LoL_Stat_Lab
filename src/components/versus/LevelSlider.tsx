// src/components/versus/LevelSlider.tsx
import React from 'react';
import useVersusStore from '../../store/useVersusStore';

const LevelSlider: React.FC = () => {
  const level = useVersusStore((state) => state.level);
  const setLevel = useVersusStore((state) => state.setLevel);

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-lg border border-hextech-gold-500 bg-hextech-blue-900 p-4">
      <div className="flex w-full items-center justify-between">
        <label htmlFor="level-slider" className="font-lol text-lg text-hextech-gold-100">
          CHAMPION LEVEL
        </label>
        <span className="rounded-full bg-hextech-black px-4 py-1 font-mono text-xl font-bold text-hextech-gold-400">
          {level}
        </span>
      </div>
      <input
        id="level-slider"
        type="range"
        min="1"
        max="18"
        value={level}
        onChange={(e) => setLevel(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-hextech-blue-500 accent-hextech-gold-400"
      />
    </div>
  );
};

export default LevelSlider;
