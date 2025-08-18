import { messages } from '@/i18n/messages';

export function TestMessages() {
  return (
    <div className="fixed top-32 right-4 bg-green-800 text-white p-4 rounded-lg z-50 text-xs max-w-xs">
      <h3 className="font-bold mb-2">✅ Test Messages</h3>
      <div className="space-y-1">
        <div>Messages FR: <span className="text-yellow-400">{messages.fr ? '✅ Chargé' : '❌ Non chargé'}</span></div>
        <div>Messages EN: <span className="text-yellow-400">{messages.en ? '✅ Chargé' : '❌ Non chargé'}</span></div>
        <div>Messages AR: <span className="text-yellow-400">{messages.ar ? '✅ Chargé' : '❌ Non chargé'}</span></div>
        <div>Clé test: <span className="text-yellow-400">{messages.fr['nav.home']}</span></div>
        <div>Navigation: <span className="text-yellow-400">{messages.fr['navigation.allCategories']}</span></div>
        <div>Total clés FR: <span className="text-yellow-400">{Object.keys(messages.fr).length}</span></div>
      </div>
    </div>
  );
}
