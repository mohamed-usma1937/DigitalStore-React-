import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState, CartItem, Product, Coupon } from '@/types';
import couponsData from '@/data/coupons.json';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      appliedCoupon: undefined,

      addItem: (product: Product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          const newItem: CartItem = {
            id: product.id,
            product,
            quantity,
          };
          set({ items: [...items, newItem] });
        }
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      clearCart: () => {
        set({ items: [], appliedCoupon: undefined });
      },

      getTotalPrice: () => {
        const { items, appliedCoupon } = get();
        const subtotal = items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );

        if (!appliedCoupon) return subtotal;

        let discount = 0;
        if (appliedCoupon.type === 'percentage') {
          discount = (subtotal * appliedCoupon.value) / 100;
          if (appliedCoupon.maxDiscount) {
            discount = Math.min(discount, appliedCoupon.maxDiscount);
          }
        } else {
          discount = appliedCoupon.value;
        }

        return Math.max(subtotal - discount, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      applyCoupon: (code: string) => {
        const coupon = couponsData.find(
          (c) => c.code.toLowerCase() === code.toLowerCase() && c.isActive
        ) as Coupon | undefined;

        if (!coupon) return false;

        // Check expiration
        if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
          return false;
        }

        // Check usage limit
        if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
          return false;
        }

        // Check minimum amount
        const subtotal = get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );

        if (coupon.minAmount && subtotal < coupon.minAmount) {
          return false;
        }

        set({ appliedCoupon: coupon });
        return true;
      },

      removeCoupon: () => {
        set({ appliedCoupon: undefined });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);