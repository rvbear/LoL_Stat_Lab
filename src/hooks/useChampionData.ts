// src/hooks/useChampionData.ts
import { useEffect } from 'react';
import { useChampionStore } from '../store/useChampionStore';
import apiClient from '../services/apiClient';
import type { ChampionDataResponse } from '../types/champion';

/**
 * 챔피언 데이터를 API로부터 비동기적으로 가져와 전역 스토어에 저장하는 커스텀 훅.
 * 이 훅은 애플리케이션의 최상위 컴포넌트에서 한 번만 호출되어야 합니다.
 * 데이터가 스토어에 이미 존재하는 경우 중복으로 API를 호출하지 않습니다.
 */
export const useChampionData = (): void => {
  // 1. 데이터 변경에 따라 effect를 재실행할지 결정하기 위해 데이터 개수만 선택합니다.
  const championsCount = useChampionStore((state) => state.champions.length);

  // 2. 스토어의 액션들만 선택합니다. Zustand는 액션의 참조(identity)를 안정적으로 유지해줍니다.
  // 객체로 묶지 않고 각각 가져오면 불필요한 리렌더링을 막고 'Argument' 에러를 해결합니다.
  const setChampionData = useChampionStore((state) => state.setChampionData);
  const setIsLoading = useChampionStore((state) => state.setIsLoading);
  const setError = useChampionStore((state) => state.setError);

  useEffect(() => {
    // 데이터가 이미 스토어에 존재하면 API 호출을 건너뜁니다.
    if (championsCount > 0) {
      return;
    }

    const fetchChampionData = async () => {
      setIsLoading(true);
      try {
        const data = await apiClient.get<ChampionDataResponse>(
          '/data/ko_KR/championFull.json'
        ) as unknown as ChampionDataResponse;
        // championFull.json은 데이터 구조가 { Aatrox: {}, Ahri: {} } 형태이므로 Object.values()를 사용해 배열로 변환합니다.
        const championArray = Object.values(data.data);
        setChampionData(championArray);
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error('An unknown error occurred while fetching champion data.');
        setError(error);
        console.error('Failed to fetch champion data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChampionData();
    // 의존성 배열에는 effect가 의존하는 값(championsCount)과 안정적인 액션들을 명시합니다.
  }, [championsCount, setChampionData, setIsLoading, setError]);
};
