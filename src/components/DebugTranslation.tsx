import { useTranslation } from '@/hooks/useTranslation';
import { useUIStore } from '@/stores/useUIStore';

export function DebugTranslation() {
  const { t, language } = useTranslation();
  const { language: storeLanguage } = useUIStore();
  
  return (
    <div className="fixed top-20 right-4 bg-black text-white p-4 rounded-lg z-50 text-xs">
      <h3 className="font-bold mb-2">🐛 Debug Traduction</h3>
      <div className="space-y-1">
        <div>Hook Language: <span className="text-yellow-400">{language}</span></div>
        <div>Store Language: <span className="text-yellow-400">{storeLanguage}</span></div>
        <div>Test Key: <span className="text-yellow-400">{t('nav.home')}</span></div>
        <div>Navigation Test: <span className="text-yellow-400">{t('navigation.allCategories')}</span></div>
        <div>Raw Messages: <span className="text-yellow-400">{JSON.stringify(import.meta.env.DEV ? 'DEV' : 'PROD')}</span></div>
      </div>
    </div>
  );
}
