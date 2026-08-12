import { create } from "zustand";

interface QuickOrderTarget {
  productId: string;
  packWeight: number;
}

interface UIState {
  callbackOpen: boolean;
  setCallbackOpen: (open: boolean) => void;

  quickOrderTarget: QuickOrderTarget | null;
  openQuickOrder: (target: QuickOrderTarget) => void;
  closeQuickOrder: () => void;

  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  callbackOpen: false,
  setCallbackOpen: (open) => set({ callbackOpen: open }),

  quickOrderTarget: null,
  openQuickOrder: (target) => set({ quickOrderTarget: target }),
  closeQuickOrder: () => set({ quickOrderTarget: null }),

  checkoutOpen: false,
  setCheckoutOpen: (open) => set({ checkoutOpen: open }),
}));
