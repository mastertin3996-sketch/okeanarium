import { create } from "zustand";

interface AppReadyState {
  ready: boolean;
  setReady: () => void;
}

export const useAppReadyStore = create<AppReadyState>((set) => ({
  ready: false,
  setReady: () => set({ ready: true }),
}));
