// src/pages/DetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useChampionStore } from '../store/useChampionStore';
import type { ChampionDetail } from '../types/champion';

// Import sub-components
import HeroSection from '../components/champions/detail/HeroSection';
import StatSimulator from '../components/champions/detail/StatSimulator';
import ResourceInfo from '../components/champions/detail/ResourceInfo';
import RadarChart from '../components/charts/RadarChart';
import Spinner from '../components/common/Spinner';
import SkinCarousel from '../components/champions/detail/SkinCarousel';
import SkillViewer from '../components/champions/detail/SkillViewer';

import TabNav from '../components/common/TabNav';

const DetailPage: React.FC = () => {
  const { championId } = useParams<{ championId: string }>();
  const navigate = useNavigate();

  const championMap = useChampionStore((state) => state.championMap);
  const championsLoading = useChampionStore((state) => state.isLoading);

  const [champion, setChampion] = useState<ChampionDetail | null>(null);
  const [level, setLevel] = useState(1);
  const [selectedSkinNum, setSelectedSkinNum] = useState(0);
  const [activeTab, setActiveTab] = useState('개요');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [championId]);

  useEffect(() => {
    if (championMap.size === 0 && !championsLoading) return;

    const foundChampion = championMap.get(championId || '');
    if (foundChampion) {
      setChampion(foundChampion);
    } else if (!championsLoading) {
      navigate('/404', { replace: true });
    }
  }, [championId, championMap, championsLoading, navigate]);

  if (!champion) {
    return <Spinner />;
  }

  const tabs = ['개요', '스킬', '스킨'];

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 pt-4 pb-8">
      <Link
        to="/"
        className="flex w-full text-m text-hextech-gold-400 hover:text-hextech-gold-100"
      >
        &larr; 챔피언 목록으로
      </Link>

      <HeroSection champion={champion} skinNum={selectedSkinNum} />

      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="w-full pt-4">
        {activeTab === '개요' && (
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-8">
              <RadarChart championA={champion} />
              <ResourceInfo champion={champion} />
            </div>
            <div className="space-y-8">
              <StatSimulator
                baseStats={champion.stats}
                level={level}
                onLevelChange={setLevel}
              />
            </div>
          </div>
        )}

        {activeTab === '스킬' && <SkillViewer champion={champion} />}

        {activeTab === '스킨' && (
          <SkinCarousel
            champion={champion}
            selectedSkinNum={selectedSkinNum}
            onSkinSelect={setSelectedSkinNum}
          />
        )}
      </div>
    </div>
  );
};

export default DetailPage;

