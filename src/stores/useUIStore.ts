import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UIState, Language, Currency } from '@/types';

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      language: 'fr',
      currency: 'DZD',
      isRTL: false,

      setLanguage: (language: Language) => {
        const isRTL = language === 'ar';
        
        // Update document direction
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
        
        set({ language, isRTL });
      },

      setCurrency: (currency: Currency) => {
        set({ currency });
      },
    }),
    {
      name: 'ui-storage',
      onRehydrateStorage: () => (state) => {
        // Set initial RTL state on hydration
        if (state?.language === 'ar') {
          document.documentElement.dir = 'rtl';
          document.documentElement.lang = 'ar';
        } else {
          document.documentElement.dir = 'ltr';
          document.documentElement.lang = state?.language || 'fr';
        }
      },
    }
  )
);