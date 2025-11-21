// src/components/champions/detail/StatSimulator.tsx
import React from 'react';
import { getChampionStatsAtLevel } from '../../../utils/statCalculator';
import type { ChampionStats } from '../../../types/champion';

interface StatSimulatorProps {
  baseStats: ChampionStats;
  level: number;
  onLevelChange: (level: number) => void;
}

const STAT_ROWS: { key: keyof ChampionStats; label: string, growthKey: keyof ChampionStats }[] = [
  { key: 'hp', label: '체력', growthKey: 'hpperlevel' },
  { key: 'mp', label: '자원', growthKey: 'mpperlevel' },
  { key: 'attackdamage', label: '공격력', growthKey: 'attackdamageperlevel' },
  { key: 'armor', label: '방어력', growthKey: 'armorperlevel' },
  { key: 'spellblock', label: '마법 저항력', growthKey: 'spellblockperlevel' },
  { key: 'attackspeed', label: '공격 속도', growthKey: 'attackspeedperlevel' },
];

const StatSimulator: React.FC<StatSimulatorProps> = ({
  baseStats,
  level,
  onLevelChange,
}) => {
  const calculatedStats = getChampionStatsAtLevel(baseStats, level);

  return (
    <div className="w-full space-y-6">
      {/* Level Slider */}
      <div>
        <div className="flex w-full items-center justify-between mb-2">
            <label htmlFor="level-slider" className="font-lol text-lg text-hextech-gold-100">
            레벨 시뮬레이터
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
            onChange={(e) => onLevelChange(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-hextech-blue-500 accent-hextech-gold-400"
        />
      </div>

      {/* Stats Table */}
      <div className="overflow-hidden rounded-lg border border-hextech-gold-500 bg-hextech-blue-900">
        <table className="w-full">
            <tbody>
                {STAT_ROWS.map(row => {
                    const finalValue = calculatedStats[row.key];
                    const growthValue = baseStats[row.growthKey];
                    
                    // 마나가 0이고 성장 마나도 0인 경우 (자원 없는 챔피언) 해당 행을 렌더링하지 않음
                    if (row.key === 'mp' && baseStats.mp === 0 && baseStats.mpperlevel === 0) {
                        return null;
                    }

                    return (
                        <tr key={row.key} className="border-b border-hextech-blue-500 last:border-none">
                            <td className="p-3 font-bold text-hextech-gold-400">{row.label}</td>
                            <td className="p-3 text-right font-mono text-hextech-gold-100">
                                {finalValue.toFixed(2)}
                                <span className="ml-2 text-hextech-gold-500">(+{growthValue.toFixed(2)})</span>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatSimulator;
