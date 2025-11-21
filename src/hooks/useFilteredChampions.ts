// src/hooks/useFilteredChampions.ts
import { useMemo } from 'react';
import { useChampionStore } from '../store/useChampionStore';
import useExplorerStore from '../store/useExplorerStore';
import type { Champion } from '../types/champion';

/**
 * 전역 챔피언 목록을 가져와 Explorer 스토어의 필터 및 정렬 조건에 따라
 * 동적으로 필터링/정렬된 챔피언 목록을 반환하는 커스텀 훅.
 *
 * @returns {Champion[]} 필터링 및 정렬이 적용된 챔피언 배열
 */
export const useFilteredChampions = (): Champion[] => {
  // 원본 챔피언 데이터
  const allChampions = useChampionStore((state) => state.champions);

  // 필터 및 정렬 조건
  const searchTerm = useExplorerStore((state) => state.searchTerm);
  const selectedTags = useExplorerStore((state) => state.selectedTags);
  const sortBy = useExplorerStore((state) => state.sortBy);
  const sortOrder = useExplorerStore((state) => state.sortOrder);

  // 필터링과 정렬 로직을 useMemo로 래핑하여, 의존성이 변경될 때만 재계산합니다.
  const filteredAndSortedChampions = useMemo(() => {
    let filtered = [...allChampions];

    // 1. 검색어 필터링 (한글 이름 또는 영문 ID)
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (champ) =>
          champ.name.includes(searchTerm) ||
          champ.id.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // 2. 태그 필터링 (선택된 모든 태그를 포함해야 함 - AND 조건)
    if (selectedTags.length > 0) {
      filtered = filtered.filter((champ) =>
        selectedTags.every((tag) => champ.tags.includes(tag))
      );
    }
    
    // 3. 정렬 로직
    filtered.sort((a, b) => {
        let compareA: string | number;
        let compareB: string | number;

        switch (sortBy) {
            case 'difficulty':
                compareA = a.info.difficulty;
                compareB = b.info.difficulty;
                break;
            case 'attackrange':
                compareA = a.stats.attackrange;
                compareB = b.stats.attackrange;
                break;
            case 'hp':
                compareA = a.stats.hp;
                compareB = b.stats.hp;
                break;
            case 'name':
            default:
                compareA = a.name;
                compareB = b.name;
                break;
        }
        
        if (typeof compareA === 'string' && typeof compareB === 'string') {
            return sortOrder === 'asc' 
                ? compareA.localeCompare(compareB) 
                : compareB.localeCompare(compareA);
        } else {
            return sortOrder === 'asc' 
                ? (compareA as number) - (compareB as number)
                : (compareB as number) - (compareA as number);
        }
    });

    return filtered;
  }, [allChampions, searchTerm, selectedTags, sortBy, sortOrder]);

  return filteredAndSortedChampions;
};
