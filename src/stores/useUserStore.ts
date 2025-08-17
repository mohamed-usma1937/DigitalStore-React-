import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserState, User, Order } from '@/types';

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,

      login: (email: string) => {
        const newUser: User = {
          id: crypto.randomUUID(),
          email,
          name: email.split('@')[0],
          preferredLanguage: 'fr',
          preferredCurrency: 'DZD',
          isAuthenticated: true,
          orders: [],
        };
        set({ user: newUser });
      },

      logout: () => {
        set({ user: null });
      },

      updateUser: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...updates },
          });
        }
      },

      addOrder: (order: Order) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              orders: [order, ...user.orders],
            },
          });
        }
      },
    }),
    {
      name: 'user-storage',
    }
  )
);