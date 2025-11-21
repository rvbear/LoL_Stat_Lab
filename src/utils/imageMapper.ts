// src/utils/imageMapper.ts

const CDN_BASE_URL = 'https://ddragon.leagueoflegends.com/cdn';
const VERSION = '15.23.1';

/**
 * 챔피언 데이터의 이미지 파일명을 완전한 CDN URL로 변환합니다.
 */
export const getChampionImage = {
  /**
   * 챔피언 아이콘 이미지 URL을 반환합니다. (e.g., 120x120px)
   * @param championId - 챔피언의 영문 ID (e.g., 'Aatrox')
   * @returns {string} 챔피언 아이콘 이미지 URL
   */
  icon: (imageFile: string): string => {
    return `${CDN_BASE_URL}/${VERSION}/img/champion/${imageFile}`;
  },

  /**
   * 챔피언 로딩 스크린 이미지 URL을 반환합니다. (세로가 긴 이미지)
   * @param championId - 챔피언의 영문 ID (e.g., 'Aatrox')
   * @param skinNum - 스킨 번호 (e.g., 0, 1, 2...)
   * @returns {string} 챔피언 로딩 이미지 URL
   */
  loading: (championId: string, skinNum = 0): string => {
    return `${CDN_BASE_URL}/img/champion/loading/${championId}_${skinNum}.jpg`;
  },

  /**
   * 챔피언 스플래시 아트 이미지 URL을 반환합니다. (가로가 긴 이미지)
   * @param championId - 챔피언의 영문 ID (e.g., 'Aatrox')
   * @param skinNum - 스킨 번호 (e.g., 0, 1, 2...)
   * @returns {string} 챔피언 스플래시 아트 URL
   */
  splash: (championId: string, skinNum = 0): string => {
    return `${CDN_BASE_URL}/img/champion/splash/${championId}_${skinNum}.jpg`;
  },

  /**
   * 챔피언 스킬 이미지 URL을 반환합니다.
   * @param skillFile - 스킬 이미지 파일명 (e.g., 'AatroxQ.png')
   * @returns {string} 챔피언 스킬 이미지 URL
   */
  skill: (skillFile: string): string => {
    return `${CDN_BASE_URL}/${VERSION}/img/spell/${skillFile}`;
  },

  /**
   * 패시브 스킬 이미지 URL을 반환합니다.
   * @param passiveFile - 패시브 이미지 파일명 (e.g., 'Aatrox_Passive.png')
   * @returns {string} 패시브 스킬 이미지 URL
   */
  passive: (passiveFile: string): string => {
    return `${CDN_BASE_URL}/${VERSION}/img/passive/${passiveFile}`;
  },
};
