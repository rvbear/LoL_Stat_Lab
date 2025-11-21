// src/components/common/TabNav.tsx
import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface TabNavProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNav: React.FC<TabNavProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="w-full border-b border-hextech-gold-900">
      <nav className="-mb-px flex justify-center space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={twMerge(
              clsx(
                'whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium transition-colors',
                {
                  'border-hextech-gold-400 text-hextech-gold-200': activeTab === tab,
                  'border-transparent text-hextech-gold-600 hover:border-hextech-gold-700 hover:text-hextech-gold-400':
                    activeTab !== tab,
                }
              )
            )}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNav;
