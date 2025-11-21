// src/utils/statCalculator.ts
import type { ChampionStats } from '../types/champion';

/**
 * 특정 레벨에 해당하는 스탯을 계산하는 유틸리티 함수
 * 공식: Stat_Level = Base + (Growth * (Level - 1))
 * @param baseStat 1레벨 기본 스탯
 * @param growthStat 레벨당 성장 스탯
 * @param level 계산하고자 하는 레벨 (1-18)
 * @returns {number} 계산된 스탯 값
 */
export const calculateStatAtLevel = (
  baseStat: number,
  growthStat: number,
  level: number
): number => {
  if (level <= 1) {
    return baseStat;
  }
  // 소수점 계산 오차를 피하기 위해 toFixed 사용 후 숫자로 변환
  const calculatedValue = baseStat + growthStat * (level - 1);
  return Number(calculatedValue.toFixed(4));
};

/**
 * 챔피언의 모든 스탯을 특정 레벨 기준으로 계산하여 새로운 스탯 객체를 반환합니다.
 * @param baseStats 챔피언의 기본 스탯 객체 (ChampionStats)
 * @param level 계산하고자 하는 레벨 (1-18)
 * @returns {ChampionStats} 특정 레벨에 맞게 모든 스탯이 계산된 새로운 ChampionStats 객체
 */
export const getChampionStatsAtLevel = (
  baseStats: ChampionStats,
  level: number
): ChampionStats => {
  return {
    ...baseStats,
    hp: calculateStatAtLevel(baseStats.hp, baseStats.hpperlevel, level),
    mp: calculateStatAtLevel(baseStats.mp, baseStats.mpperlevel, level),
    armor: calculateStatAtLevel(baseStats.armor, baseStats.armorperlevel, level),
    spellblock: calculateStatAtLevel(
      baseStats.spellblock,
      baseStats.spellblockperlevel,
      level
    ),
    hpregen: calculateStatAtLevel(
      baseStats.hpregen,
      baseStats.hpregenperlevel,
      level
    ),
    mpregen: calculateStatAtLevel(
      baseStats.mpregen,
      baseStats.mpregenperlevel,
      level
    ),
    crit: calculateStatAtLevel(baseStats.crit, baseStats.critperlevel, level),
    attackdamage: calculateStatAtLevel(
      baseStats.attackdamage,
      baseStats.attackdamageperlevel,
      level
    ),
    // 공격 속도는 별도 공식이 필요하지만, 1차 구현에서는 기본 공식을 적용합니다.
    // 기본 공식: BaseAttackSpeed * (1 + (AttackSpeedPerLevel * (Level - 1) / 100))
    // 여기서는 기획서의 단순화된 공식을 우선 따릅니다.
    attackspeed: calculateStatAtLevel(
      baseStats.attackspeed,
      baseStats.attackspeedperlevel / 100, // 성장 공격속도는 %이므로 100으로 나눠서 적용
      level
    ),
  };
};
