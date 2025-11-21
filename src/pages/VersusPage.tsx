// src/pages/VersusPage.tsx
import React, { useEffect } from 'react';
import useVersusStore from '../store/useVersusStore';
import ChampionSelector from '../components/versus/ChampionSelector';
import LevelSlider from '../components/versus/LevelSlider';
import StatTable from '../components/versus/StatTable';
import RadarChart from '../components/charts/RadarChart';

/**
 * 1:1 비교 시뮬레이터 페이지.
 * 두 명의 챔피언을 선택하고 레벨을 조절하며 스탯을 비교합니다.
 */
const VersusPage: React.FC = () => {
  // Zustand의 shallow 없이 개별 상태를 선택하여 렌더링 최적화
  const championA = useVersusStore((state) => state.championA);
  const championB = useVersusStore((state) => state.championB);
  const setChampionA = useVersusStore((state) => state.setChampionA);
  const setChampionB = useVersusStore((state) => state.setChampionB);
  const reset = useVersusStore((state) => state.reset);

  // 페이지가 언마운트될 때 스토어 상태를 초기화합니다.
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-8">
      {/* 1. 챔피언 선택 섹션 */}
      <section className="flex w-full flex-col items-center justify-center gap-8 md:flex-row md:justify-around">
        <ChampionSelector
          selectedChampion={championA}
          onSelect={(champion) => {
            if (champion.id === championB?.id) return;
            setChampionA(champion);
          }}
          onClear={() => setChampionA(null)}
          placeholder="첫 번째 챔피언 검색..."
        />
        <span className="font-lol text-4xl text-hextech-gold-500">VS</span>
        <ChampionSelector
          selectedChampion={championB}
          onSelect={(champion) => {
            if (champion.id === championA?.id) return;
            setChampionB(champion);
          }}
          onClear={() => setChampionB(null)}
          placeholder="두 번째 챔피언 검색..."
        />
      </section>

      {/* 챔피언이 한 명이라도 선택된 경우에만 나머지 UI를 표시 */}
      {(championA || championB) && (
        <>
          {/* 2. 성향 분석 레이더 차트 */}
          <section className="w-full max-w-2xl">
            <RadarChart championA={championA} championB={championB} />
          </section>

          {/* 3. 레벨 조절 섹션 */}
          <section className="w-full max-w-4xl">
            <LevelSlider />
          </section>

          {/* 4. 스탯 비교 테이블 섹션 */}
          <section className="w-full max-w-4xl">
            <StatTable />
          </section>
        </>
      )}
    </div>
  );
};

export default VersusPage;