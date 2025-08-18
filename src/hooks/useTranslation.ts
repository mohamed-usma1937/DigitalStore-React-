import { useUIStore } from '@/stores/useUIStore';
import { messages } from '@/i18n/messages';

export function useTranslation() {
  const { language } = useUIStore();
  
  const t = (key: string): string => {
    // Ensure language is valid and messages exist
    if (!language || !messages[language]) {
      console.warn(`Translation: Invalid language "${language}", falling back to French`);
      return messages.fr[key] || key;
    }
    
    // Simple direct key access first
    if (messages[language][key]) {
      return messages[language][key];
    }
    
    // Handle nested keys with dots (e.g., "navigation.allCategories")
    const keys = key.split('.');
    let value: any = messages[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to French
        value = messages.fr;
        for (const fallbackK of keys) {
          if (value && typeof value === 'object' && fallbackK in value) {
            value = value[fallbackK];
          } else {
            console.warn(`Translation key not found: "${key}" for language "${language}"`);
            return key;
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return { t, language: language || 'fr' };
}