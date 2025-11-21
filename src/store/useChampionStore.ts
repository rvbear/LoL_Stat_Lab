// src/store/useChampionStore.ts
import { create } from 'zustand';
import type { ChampionDetail } from '../types/champion';

/**
 * 챔피언 관련 전역 상태를 관리하는 Zustand Store
 */

// 1. 스토어의 상태(State) 타입을 정의합니다.
interface ChampionState {
  championMap: Map<string, ChampionDetail>;
  champions: ChampionDetail[];
  isLoading: boolean;
  error: Error | null;
}

// 2. 스토어의 액션(Actions) 타입을 정의합니다.
// 액션은 상태를 변경하는 함수들입니다.
interface ChampionActions {
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setChampionData: (data: ChampionDetail[]) => void;
}

// 3. create 함수를 사용하여 스토어를 생성합니다.
// 스토어의 초기 상태와 액션을 정의합니다.
export const useChampionStore = create<ChampionState & ChampionActions>((set) => ({
  // 초기 상태 (Initial State)
  championMap: new Map(),
  champions: [],
  isLoading: false,
  error: null,

  // 액션 구현 (Actions Implementation)
  /**
   * 로딩 상태를 업데이트합니다.
   * @param isLoading 로딩 여부
   */
  setIsLoading: (isLoading) => set({ isLoading }),

  /**
   * 에러 상태를 업데이트합니다.
   * @param error 발생한 에러 객체 또는 null
   */
  setError: (error) => set({ error }),

  /**
   * API로부터 받아온 챔피언 데이터를 가공하여 상태에 저장합니다.
   * @param data championFull.json에서 변환된 ChampionDetail 배열
   */
  setChampionData: (data) => {
    const championMap = new Map(data.map((champion) => [champion.id, champion]));
    const champions = [...data].sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));
    set({ championMap, champions, isLoading: false, error: null });
  },
}));
