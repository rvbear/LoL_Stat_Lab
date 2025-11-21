// src/components/champions/detail/ResourceInfo.tsx
import React from 'react';
import type { Champion } from '../../../types/champion';

interface ResourceInfoProps {
  champion: Champion;
}

const InfoBadge: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="flex flex-col items-center justify-center rounded-md border border-hextech-gold-500 bg-hextech-blue-900 p-3 text-center">
        <p className="text-xs text-hextech-gold-400">{label}</p>
        <p className="font-lol text-2xl font-bold text-hextech-gold-100">{value}</p>
    </div>
);

const ResourceInfo: React.FC<ResourceInfoProps> = ({ champion }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
        <InfoBadge label="사거리" value={champion.stats.attackrange} />
        <InfoBadge label="이동 속도" value={champion.stats.movespeed} />
        <InfoBadge label="자원" value={champion.partype === 'None' ? '없음' : champion.partype} />
    </div>
  );
};

export default ResourceInfo;
