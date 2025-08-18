# 🌍 Guide du Système de Traduction - DigitalStore React

## 📋 Vue d'ensemble

Ce projet utilise un **système de traduction personnalisé** avec Zustand pour la gestion de l'état et un hook `useTranslation` optimisé.

## 🚀 Utilisation

### 1. Import du Hook

```tsx
import { useTranslation } from '@/hooks/useTranslation';

function MonComposant() {
  const { t, language } = useTranslation();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>Langue actuelle: {language}</p>
    </div>
  );
}
```

### 2. Changement de Langue

```tsx
import { useUIStore } from '@/stores/useUIStore';

function LanguageSwitcher() {
  const { setLanguage } = useUIStore();
  
  return (
    <div>
      <button onClick={() => setLanguage('fr')}>Français</button>
      <button onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('ar')}>العربية</button>
    </div>
  );
}
```

## 📚 Structure des Messages

### Format des Clés

Les clés de traduction suivent le format `section.element` :

```tsx
// Navigation
'nav.home' → 'Accueil'
'nav.categories' → 'Catégories'

// Hero Section  
'hero.title' → 'Produits Digitaux Premium'
'hero.subtitle' → 'Livraison instantanée • Garantie 100% • Support 24/7'

// Product
'product.addToCart' → 'Ajouter au panier'
'product.features' → 'Caractéristiques'
```

### Clés Imbriquées

Pour les éléments complexes, utilisez la notation point :

```tsx
'hero.features.instantDelivery.title' → 'Livraison Instantanée'
'hero.features.instantDelivery.description' → 'Téléchargez vos produits immédiatement après achat'
```

## 🌍 Langues Supportées

### 🇫🇷 Français (fr) - Langue par défaut
- Langue principale de l'application
- Support complet de tous les textes

### 🇬🇧 Anglais (en)
- Traduction complète en anglais
- Fallback automatique si une clé manque

### 🇩🇿 Arabe (ar)
- Traduction complète en arabe
- Support RTL automatique
- Direction du texte inversée automatiquement

## ⚙️ Configuration

### Store Zustand

```tsx
// src/stores/useUIStore.ts
interface UIState {
  language: Language;        // 'fr' | 'en' | 'ar'
  currency: Currency;        // 'DZD' | 'EUR' | 'USD'
  isRTL: boolean;           // true pour l'arabe
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
}
```

### Persistance

- La langue est sauvegardée automatiquement dans le localStorage
- Récupération automatique au rechargement de la page
- Support RTL automatique pour l'arabe

## 🔧 Ajout de Nouvelles Traductions

### 1. Ajouter la Clé dans messages.ts

```tsx
// src/i18n/messages.ts
export const messages = {
  fr: {
    // Nouvelle section
    'newSection.title': 'Nouveau Titre',
    'newSection.description': 'Nouvelle description',
  },
  en: {
    'newSection.title': 'New Title',
    'newSection.description': 'New description',
  },
  ar: {
    'newSection.title': 'عنوان جديد',
    'newSection.description': 'وصف جديد',
  }
};
```

### 2. Utiliser dans le Composant

```tsx
function NewComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2>{t('newSection.title')}</h2>
      <p>{t('newSection.description')}</p>
    </div>
  );
}
```

## ✅ Bonnes Pratiques

### ❌ À ÉVITER

```tsx
// ❌ Texte hardcodé
<h1>Mon Titre</h1>
<p>Description en français</p>

// ❌ Traduction conditionnelle manuelle
{language === 'fr' ? 'Français' : 'English'}
```

### ✅ À UTILISER

```tsx
// ✅ Utilisation du hook de traduction
<h1>{t('section.title')}</h1>
<p>{t('section.description')}</p>

// ✅ Clés de traduction cohérentes
'nav.home'           // Navigation
'hero.title'         // Section hero
'product.features'   // Produit
'footer.company'     // Footer
```

## 🧪 Test des Traductions

### 1. Vérification Visuelle

1. Ouvrir l'application dans le navigateur
2. Cliquer sur l'icône 🌍 dans l'en-tête
3. Changer de langue (FR/EN/AR)
4. Vérifier que tous les textes changent

### 2. Vérification RTL

1. Changer vers l'arabe
2. Vérifier que la direction du texte est inversée
3. Vérifier que l'interface s'adapte correctement

### 3. Vérification des Clés Manquantes

Si une clé n'existe pas, le système :
1. Retourne la clé elle-même (ex: `'missing.key'`)
2. Fallback vers l'anglais si disponible
3. Log une erreur en mode développement

## 🐛 Dépannage

### Problème : Texte non traduit

**Cause possible :** Clé de traduction manquante
**Solution :** Ajouter la clé dans `messages.ts` pour toutes les langues

### Problème : Direction RTL incorrecte

**Cause possible :** État RTL non mis à jour
**Solution :** Vérifier que `setLanguage` met à jour `isRTL`

### Problème : Traductions non persistées

**Cause possible :** Problème avec Zustand persist
**Solution :** Vérifier la configuration du store dans `useUIStore.ts`

## 📊 Statistiques

- **Total des clés de traduction :** 146
- **Langues supportées :** 3 (FR, EN, AR)
- **Support RTL :** ✅ Automatique
- **Persistance :** ✅ LocalStorage
- **Fallback :** ✅ Anglais

## 🔗 Fichiers Clés

- `src/hooks/useTranslation.ts` - Hook de traduction
- `src/stores/useUIStore.ts` - Gestion de l'état de la langue
- `src/i18n/messages.ts` - Fichier des traductions
- `src/types/index.ts` - Types TypeScript

---

**💡 Conseil :** Utilisez toujours le hook `useTranslation` et évitez le texte hardcodé pour maintenir la cohérence du système de traduction.
