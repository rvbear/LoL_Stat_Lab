// src/types/champion.ts

/**
 * Riot API에서 반환하는 개별 챔피언의 상세 정보
 */
export interface Champion {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: ChampionInfo;
  image: ChampionImage;
  tags: ChampionTag[];
  partype: string;
  stats: ChampionStats;
}

/**
 * 챔피언의 공격, 방어, 마법, 난이도 정보
 */
export interface ChampionInfo {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

/**
 * 챔피언 이미지 정보 (파일명, 스프라이트)
 */
export interface ChampionImage {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * 챔피언의 역할군 태그
 */
export type ChampionTag =
  | 'Fighter'
  | 'Tank'
  | 'Mage'
  | 'Assassin'
  | 'Marksman'
  | 'Support';

/**
 * 챔피언의 레벨별 스탯 정보
 */
export interface ChampionStats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}

/**
 * champion.json API의 최상위 응답 구조
 */
export interface ChampionDataResponse {
  type: string;
  format: string;
  version: string;
  data: {
    [championId: string]: ChampionDetail;
  };
}

// championFull.json에서 추가로 제공하는 상세 정보 타입들

/**
 * 챔피언의 스킬(Q, W, E, R) 정보
 */
export interface ChampionSpell {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  image: ChampionImage;
  cooldown: number[];
  cost: number[];
  range: number[];
}

/**
 * 챔피언의 패시브 스킬 정보
 */
export interface ChampionPassive {
  name: string;
  description: string;
  image: ChampionImage;
}

/**
 * 챔피언의 개별 스킨 정보
 */
export interface ChampionSkin {
  id: string;
  num: number;
  name: string;
  chromas: boolean;
}

/**
 * championFull.json의 개별 챔피언 데이터 타입
 */
export interface ChampionDetail extends Champion {
  lore: string;
  spells: ChampionSpell[];
  passive: ChampionPassive;
  skins: ChampionSkin[];
}
