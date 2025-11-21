// src/components/versus/StatTable.tsx
import React from 'react';
import useVersusStore from '../../store/useVersusStore';
import type { ChampionStats } from '../../types/champion';
import { getChampionStatsAtLevel } from '../../utils/statCalculator';
import clsx from 'clsx';

const STAT_ROWS: { key: keyof ChampionStats; label: string }[] = [
  { key: 'hp', label: '체력 (HP)' },
  { key: 'mp', label: '마나 (MP)' },
  { key: 'attackdamage', label: '공격력' },
  { key: 'armor', label: '방어력' },
  { key: 'spellblock', label: '마법 저항력' },
  { key: 'attackspeed', label: '공격 속도' },
  { key: 'movespeed', label: '이동 속도' },
  { key: 'attackrange', label: '사거리' },
];

const StatRow: React.FC<{
  label: string;
  valueA?: number;
  valueB?: number;
}> = ({ label, valueA, valueB }) => {
  const isA_Winning = valueA !== undefined && valueB !== undefined && valueA > valueB;
  const isB_Winning = valueA !== undefined && valueB !== undefined && valueB > valueA;

  return (
    <tr className="border-b border-hextech-blue-500">
      <td
        className={clsx('py-3 px-4 text-center font-mono', {
          'text-hextech-teal font-bold': isA_Winning,
          'text-hextech-red': isB_Winning,
        })}
      >
        {valueA?.toFixed(2) ?? '-'}
      </td>
      <td className="py-3 px-2 text-center font-bold text-hextech-gold-400">{label}</td>
      <td
        className={clsx('py-3 px-4 text-center font-mono', {
          'text-hextech-teal font-bold': isB_Winning,
          'text-hextech-red': isA_Winning,
        })}
      >
        {valueB?.toFixed(2) ?? '-'}
      </td>
    </tr>
  );
};

const StatTable: React.FC = () => {
  const championA = useVersusStore((state) => state.championA);
  const championB = useVersusStore((state) => state.championB);
  const level = useVersusStore((state) => state.level);

  const statsA = championA ? getChampionStatsAtLevel(championA.stats, level) : undefined;
  const statsB = championB ? getChampionStatsAtLevel(championB.stats, level) : undefined;

  return (
    <div className="w-full overflow-hidden rounded-lg border border-hextech-gold-500 bg-hextech-blue-900">
      <table className="w-full">
        <thead>
          <tr className="bg-hextech-blue-500">
            <th className="py-2 px-4 text-left font-lol text-hextech-gold-100">
              {championA?.name ?? '챔피언 A'}
            </th>
            <th className="py-2 px-2 text-center font-lol text-hextech-gold-400">스탯</th>
            <th className="py-2 px-4 text-right font-lol text-hextech-gold-100">
              {championB?.name ?? '챔피언 B'}
            </th>
          </tr>
        </thead>
        <tbody>
          {STAT_ROWS.map((row) => (
            <StatRow
              key={row.key}
              label={row.label}
              valueA={statsA?.[row.key]}
              valueB={statsB?.[row.key]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatTable;
