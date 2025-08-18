import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserState, User, Order } from '@/types';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,

      login: async (email: string, password: string): Promise<boolean> => {
        set({ isLoading: true });
        
        try {
          // Simulation d'une API de connexion sécurisée
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // TODO: Remplacer par un vrai appel API avec validation des credentials
          // Pour l'instant, on simule une connexion réussie
          const newUser: User = {
            id: crypto.randomUUID(),
            email,
            firstName: email.split('@')[0],
            lastName: '',
            name: email.split('@')[0],
            preferredLanguage: 'fr',
            preferredCurrency: 'DZD',
            isAuthenticated: true,
            orders: [],
            createdAt: new Date().toISOString(),
          };
          
          set({ user: newUser, isLoading: false });
          return true;
        } catch (error) {
          console.error('Login failed:', error);
          set({ isLoading: false });
          return false;
        }
      },

      register: async (userData: RegisterData): Promise<boolean> => {
        set({ isLoading: true });
        
        try {
          // Simulation d'une API d'inscription sécurisée
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // TODO: Remplacer par un vrai appel API
          // Vérifier que l'email n'existe pas déjà
          const existingUser = get().user;
          if (existingUser && existingUser.email === userData.email) {
            set({ isLoading: false });
            return false; // Email déjà utilisé
          }
          
          const newUser: User = {
            id: crypto.randomUUID(),
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            name: `${userData.firstName} ${userData.lastName}`,
            preferredLanguage: 'fr',
            preferredCurrency: 'DZD',
            isAuthenticated: true,
            orders: [],
            createdAt: new Date().toISOString(),
          };
          
          set({ user: newUser, isLoading: false });
          return true;
        } catch (error) {
          console.error('Registration failed:', error);
          set({ isLoading: false });
          return false;
        }
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

      // Méthode pour vérifier si l'utilisateur est connecté
      isAuthenticated: () => {
        const { user } = get();
        return user?.isAuthenticated || false;
      },

      // Méthode pour obtenir les informations de l'utilisateur
      getUser: () => {
        return get().user;
      },
    }),
    {
      name: 'user-storage',
      // Ne pas persister isLoading
      partialize: (state) => ({ user: state.user }),
    }
  )
);