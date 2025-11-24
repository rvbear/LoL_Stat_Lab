// src/components/champions/detail/SkillViewer.tsx
import React, { useState, useMemo, useEffect } from 'react';
import type { ChampionDetail, ChampionSpell, ChampionPassive } from '../../../types/champion';
import { getChampionImage } from '../../../utils/imageMapper';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type DisplaySkill = ChampionSpell | (ChampionPassive & { id: string });

interface SkillViewerProps {
  champion: ChampionDetail;
}

const SkillViewer: React.FC<SkillViewerProps> = ({ champion }) => {
  const [selectedSkill, setSelectedSkill] = useState<DisplaySkill | null>(null);

  const skills = useMemo<DisplaySkill[]>(() => {
    if (!champion) return [];

    // 패시브에 id 추가
    const passiveWithId: DisplaySkill = {
      ...champion.passive,
      id: 'passive',
    };

    return [passiveWithId, ...champion.spells];
  }, [champion]);

  // skills가 준비되면 첫 번째 스킬(P)을 선택
  useEffect(() => {
    if (skills.length > 0 && !selectedSkill) {
      setSelectedSkill(skills[0]);
    }
  }, [skills, selectedSkill]);

  const skillKeys = ['P', 'Q', 'W', 'E', 'R'];

  const handleSkillSelect = (skill: DisplaySkill) => {
    setSelectedSkill(skill);
  };

  const isSpell = (skill: DisplaySkill): skill is ChampionSpell => 'cost' in skill;

  if (!selectedSkill) return null; // 초기 로딩 가드

  return (
    <div className="w-full">
      <h3 className="mb-4 text-2xl font-bold text-hextech-gold-100">스킬</h3>

      {/* Skill Tab Bar */}
      <div className="mb-4 flex justify-center gap-3">
        {skills.map((skill, index) => (
          <button
            key={skill.id}
            onClick={() => handleSkillSelect(skill)}
            className={twMerge(
              clsx(
                'group relative rounded-md border-2 border-hextech-blue-800 p-1 transition-all duration-200',
                {
                  'border-hextech-gold-400 scale-110': selectedSkill.id === skill.id,
                  'grayscale opacity-60 hover:opacity-100 hover:grayscale-0':
                    selectedSkill.id !== skill.id,
                }
              )
            )}
          >
            <img
              src={
                isSpell(skill)
                  ? getChampionImage.skill(skill.image.full)
                  : getChampionImage.passive(skill.image.full)
              }
              alt={skill.name}
              className="h-14 w-14 rounded-sm"
            />
            <span className="absolute -top-2 -right-2 rounded-full bg-hextech-black px-2 py-0.5 text-xs font-bold text-hextech-gold-300">
              {skillKeys[index]}
            </span>
          </button>
        ))}
      </div>

      {/* Skill Description Panel */}
      <div className="rounded-md bg-hextech-blue-900/50 p-4">
        <p className="mb-2 text-xl font-bold text-hextech-gold-100">
          {selectedSkill.name}
        </p>

        {isSpell(selectedSkill) && (
          <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-hextech-gold-300">
            {selectedSkill.cooldown.some((cd) => cd > 0) && (
              <p>
                <strong className="font-semibold text-hextech-gold-400">재사용 대기시간:</strong>{' '}
                {selectedSkill.cooldown.join(' / ')}
                <span className="text-xs">초</span>
              </p>
            )}

            {selectedSkill.cost.some((c) => c > 0) && (
              <p>
                <strong className="font-semibold text-hextech-gold-400">
                  {champion.partype.includes('마나') ? '마나' : '소모값'}:
                </strong>{' '}
                {selectedSkill.cost.join(' / ')}
              </p>
            )}
          </div>
        )}

        <div
          className="space-y-2 text-sm text-hextech-gold-100/90"
          dangerouslySetInnerHTML={{ __html: selectedSkill.description }}
        />
      </div>
    </div>
  );
};

export default SkillViewer;
