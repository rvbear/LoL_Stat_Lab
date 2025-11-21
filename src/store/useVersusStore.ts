// src/store/useVersusStore.ts
import { create } from 'zustand';
import type { Champion } from '../types/champion';

interface VersusState {
  championA: Champion | null;
  championB: Champion | null;
  level: number;
}

interface VersusActions {
  setChampionA: (champion: Champion | null) => void;
  setChampionB: (champion: Champion | null) => void;
  setLevel: (level: number) => void;
  reset: () => void;
}

const initialState: VersusState = {
  championA: null,
  championB: null,
  level: 1,
};

const useVersusStore = create<VersusState & VersusActions>((set) => ({
  ...initialState,

  setChampionA: (champion) => set({ championA: champion }),
  setChampionB: (champion) => set({ championB: champion }),
  setLevel: (level) => set({ level }),
  
  reset: () => set(initialState),
}));

export default useVersusStore;
