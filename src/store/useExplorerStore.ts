// src/store/useExplorerStore.ts
import { create } from 'zustand';
import type { ChampionTag } from '../types/champion';

export type SortKey =
  | 'name'
  | 'difficulty'
  | 'attackrange'
  | 'hp';

interface ExplorerState {
  searchTerm: string;
  selectedTags: ChampionTag[];
  sortBy: SortKey;
  sortOrder: 'asc' | 'desc';
  isLoading: boolean;
}

interface ExplorerActions {
  setSearchTerm: (term: string) => void;
  toggleTag: (tag: ChampionTag) => void;
  setSort: (key: SortKey) => void;
  clearFilters: () => void;
  setLoading: (isLoading: boolean) => void;
}

const useExplorerStore = create<ExplorerState & ExplorerActions>((set) => ({
  // Initial State
  searchTerm: '',
  selectedTags: [],
  sortBy: 'name',
  sortOrder: 'asc',
  isLoading: false,

  // Actions
  setSearchTerm: (term) => set({ searchTerm: term }),

  toggleTag: (tag) =>
    set((state) => {
      const newTags = state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag];
      return { selectedTags: newTags };
    }),

  setSort: (key) =>
    set((state) => {
      // If the same key is clicked, toggle the order
      if (state.sortBy === key) {
        return { sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' };
      }
      // If a new key is clicked, default to ascending order
      return { sortBy: key, sortOrder: 'asc' };
    }),
  
  clearFilters: () => set({ searchTerm: '', selectedTags: [] }),

  setLoading: (isLoading) => set({ isLoading }),
}));

export default useExplorerStore;
