import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WishlistState, WishlistItem } from '@/types';

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId: string) => {
        const { items } = get();
        const exists = items.find((item) => item.productId === productId);

        if (!exists) {
          const newItem: WishlistItem = {
            id: crypto.randomUUID(),
            productId,
            addedAt: new Date().toISOString(),
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item) => item.productId !== productId),
        });
      },

      isInWishlist: (productId: string) => {
        return get().items.some((item) => item.productId === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);