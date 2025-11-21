// src/components/champions/SortDropdown.tsx
import React from 'react';
import useExplorerStore from '../../store/useExplorerStore';
import type { SortKey } from '../../store/useExplorerStore';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'name', label: '이름' },
  { key: 'difficulty', label: '난이도' },
  { key: 'attackrange', label: '사거리' },
  { key: 'hp', label: '기본 체력' },
];

const SortDropdown: React.FC = () => {
  const sortBy = useExplorerStore((state) => state.sortBy);
  const sortOrder = useExplorerStore((state) => state.sortOrder);
  const setSort = useExplorerStore((state) => state.setSort);

  return (
    <div className="relative">
        <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
                const [key] = e.target.value.split('-') as [SortKey];
                setSort(key);
            }}
            className="appearance-none rounded border border-hextech-gold-500 bg-hextech-blue-500 px-4 py-2 pr-8 text-hextech-gold-100 transition-colors hover:border-hextech-gold-400 focus:outline-none"
        >
        {SORT_OPTIONS.map(opt => (
            <React.Fragment key={opt.key}>
                <option value={`${opt.key}-asc`}>{opt.label} (오름차순)</option>
                <option value={`${opt.key}-desc`}>{opt.label} (내림차순)</option>
            </React.Fragment>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-hextech-gold-400">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.516 7.548c.436-.446 1.043-.481 1.576 0L10 10.405l2.908-2.857c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615l-3.712 3.667c-.456.446-1.192.446-1.648 0L5.516 9.163c-.408-.418-.436-1.17 0-1.615z" />
        </svg>
      </div>
    </div>
  );
};

export default SortDropdown;
