import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";
import { getProductById } from "@/data/products";

const FREE_SHIPPING_THRESHOLD = 3000;
const SHIPPING_COST = 150;

interface PromoState {
  code: string | null;
  discountPercent: number;
}

const PROMO_CODES: Record<string, number> = {
  ОКЕАН10: 10,
  ІКРА15: 15,
};

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  promo: PromoState;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (productId: string, packWeight: number, quantity?: number) => void;
  removeItem: (productId: string, packWeight: number) => void;
  setQuantity: (productId: string, packWeight: number, quantity: number) => void;
  changePack: (productId: string, oldWeight: number, newWeight: number) => void;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promo: { code: null, discountPercent: 0 },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (productId, packWeight, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === productId && i.packWeight === packWeight
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }
          return {
            items: [...state.items, { productId, packWeight, quantity }],
          };
        });
        set({ isOpen: true });
      },

      removeItem: (productId, packWeight) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.packWeight === packWeight)
          ),
        }));
      },

      setQuantity: (productId, packWeight, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, packWeight);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.packWeight === packWeight
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      changePack: (productId, oldWeight, newWeight) => {
        set((state) => {
          const product = getProductById(productId);
          if (!product) return state;
          const hasNew = state.items.some(
            (i) => i.productId === productId && i.packWeight === newWeight
          );
          if (hasNew) {
            return {
              items: state.items
                .map((i) => {
                  if (i.productId === productId && i.packWeight === oldWeight) {
                    return null;
                  }
                  if (i.productId === productId && i.packWeight === newWeight) {
                    const oldItem = state.items.find(
                      (x) => x.productId === productId && x.packWeight === oldWeight
                    );
                    return { ...i, quantity: i.quantity + (oldItem?.quantity ?? 0) };
                  }
                  return i;
                })
                .filter((i): i is CartItem => i !== null),
            };
          }
          return {
            items: state.items.map((i) =>
              i.productId === productId && i.packWeight === oldWeight
                ? { ...i, packWeight: newWeight }
                : i
            ),
          };
        });
      },

      applyPromo: (code) => {
        const normalized = code.trim().toUpperCase();
        const discount = PROMO_CODES[normalized];
        if (discount) {
          set({ promo: { code: normalized, discountPercent: discount } });
          return true;
        }
        return false;
      },

      clearPromo: () => set({ promo: { code: null, discountPercent: 0 } }),

      clearCart: () => set({ items: [], promo: { code: null, discountPercent: 0 } }),
    }),
    {
      name: "okeanarium-cart",
      partialize: (state) => ({ items: state.items, promo: state.promo }),
    }
  )
);

export function getCartLineTotal(item: CartItem): number {
  const product = getProductById(item.productId);
  if (!product) return 0;
  const pack = product.packs.find((p) => p.weight === item.packWeight);
  if (!pack) return 0;
  return pack.price * item.quantity;
}

export function useCartTotals() {
  const items = useCartStore((s) => s.items);
  const promo = useCartStore((s) => s.promo);

  const subtotal = items.reduce((sum, item) => sum + getCartLineTotal(item), 0);
  const discount = Math.round((subtotal * promo.discountPercent) / 100);
  const afterDiscount = subtotal - discount;
  const shipping =
    afterDiscount === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = afterDiscount + shipping;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - afterDiscount);
  const itemsCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return {
    subtotal,
    discount,
    shipping,
    total,
    amountToFreeShipping,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    itemsCount,
  };
}
