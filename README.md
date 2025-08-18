# 🛍️ DigitalStore React

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

> **Une plateforme e-commerce moderne et performante construite avec React, TypeScript et les dernières technologies web.**

## ✨ Caractéristiques

- 🚀 **Performance optimisée** avec Vite et React 18
- 🎨 **Design moderne** avec Tailwind CSS et shadcn/ui
- 🌍 **Support multilingue** (Français/Anglais) avec système i18n
- 📱 **Responsive design** adapté à tous les appareils
- 🔒 **Authentification sécurisée** avec gestion des sessions
- 🛒 **Gestion complète du panier** et des listes de souhaits
- 💳 **Processus de commande** intuitif et sécurisé
- 🔍 **Recherche avancée** avec filtres et catégorisation
- 🎯 **Gestion des catégories** et navigation intuitive
- ⚡ **Lazy loading** pour une expérience utilisateur fluide

## 🛠️ Technologies utilisées

### Frontend
- **React 18** - Bibliothèque UI moderne avec hooks et suspense
- **TypeScript** - Typage statique pour un code robuste
- **Vite** - Build tool ultra-rapide pour le développement
- **React Router** - Navigation SPA avec lazy loading

### UI/UX
- **Tailwind CSS** - Framework CSS utilitaire moderne
- **shadcn/ui** - Composants React accessibles et personnalisables
- **Radix UI** - Composants primitifs sans style
- **Framer Motion** - Animations fluides et transitions
- **Lucide React** - Icônes vectorielles élégantes

### State Management
- **Zustand** - Gestion d'état légère et performante
- **React Query** - Gestion des données serveur et cache
- **React Hook Form** - Formulaires performants avec validation

### Internationalisation
- **Système i18n personnalisé** - Support multilingue complet
- **Traductions dynamiques** - Changement de langue en temps réel

## 🚀 Installation et démarrage

### Prérequis
- **Node.js** 18+ ou **Bun** 1.0+
- **Git** pour cloner le repository

### 1. Cloner le repository
```bash
git clone https://github.com/mohamed-usma1937/DigitalStore-React-.git
cd DigitalStore-React-
```

### 2. Installer les dépendances
```bash
# Avec npm
npm install

# Avec Bun (recommandé)
bun install
```

### 3. Démarrer le serveur de développement
```bash
# Avec npm
npm run dev

# Avec Bun
bun run dev
```

L'application sera accessible à l'adresse : [http://localhost:5173](http://localhost:5173)

## 📁 Structure du projet

```
DigitalStore-React-/
├── 📁 src/
│   ├── 🎨 components/          # Composants réutilisables
│   │   ├── 🏗️ layout/         # Composants de mise en page
│   │   ├── 🛍️ product/        # Composants produits
│   │   └── 🎯 ui/             # Composants UI (shadcn/ui)
│   ├── 🌍 i18n/               # Fichiers de traduction
│   ├── 📱 pages/              # Pages de l'application
│   ├── 🧠 stores/             # Gestion d'état (Zustand)
│   ├── 🪝 hooks/              # Hooks React personnalisés
│   ├── 📊 types/              # Définitions TypeScript
│   └── 🛠️ utils/              # Fonctions utilitaires
├── 📁 public/                  # Assets statiques
├── 📁 docs/                    # Documentation
└── 📄 Configuration files      # Vite, Tailwind, ESLint, etc.
```

## 🎯 Fonctionnalités principales

### 🏠 Page d'accueil
- Présentation des produits vedettes
- Navigation par catégories
- Recherche rapide
- Interface moderne et attrayante

### 🛍️ Gestion des produits
- Affichage détaillé des produits
- Galerie d'images
- Informations techniques complètes
- Système de notation et avis

### 🛒 Panier et commande
- Ajout/suppression de produits
- Gestion des quantités
- Calcul automatique des prix
- Processus de commande sécurisé

### 👤 Gestion des comptes
- Inscription et connexion
- Profil utilisateur personnalisé
- Historique des commandes
- Gestion des adresses

### 🔍 Recherche et filtres
- Recherche textuelle avancée
- Filtrage par catégories
- Tri par prix, popularité, etc.
- Navigation intuitive

## 🌍 Support multilingue

L'application supporte actuellement :
- 🇫🇷 **Français** (langue par défaut)
- 🇬🇧 **Anglais**

Le système de traduction permet de :
- Changer de langue en temps réel
- Personnaliser tous les textes de l'interface
- Ajouter facilement de nouvelles langues

## 🎨 Personnalisation

### Thèmes et couleurs
- Système de thèmes clair/sombre
- Palette de couleurs personnalisable
- Composants adaptatifs au thème

### Composants UI
- Bibliothèque shadcn/ui complète
- Composants accessibles et personnalisables
- Support des composants Radix UI

## 📱 Responsive Design

- **Mobile First** - Optimisé pour les appareils mobiles
- **Tablette** - Interface adaptée aux écrans moyens
- **Desktop** - Expérience complète sur grands écrans
- **Touch-friendly** - Interactions tactiles optimisées

## 🚀 Scripts disponibles

```bash
# Développement
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualisation du build

# Qualité du code
npm run lint         # Vérification ESLint
npm run type-check   # Vérification TypeScript

# Avec Bun
bun run dev          # Serveur de développement
bun run build        # Build de production
```

## 🔧 Configuration

### Variables d'environnement
Créez un fichier `.env.local` à la racine du projet :

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=DigitalStore
VITE_DEFAULT_LANGUAGE=fr
```

### Tailwind CSS
Configuration personnalisée dans `tailwind.config.ts` avec :
- Couleurs personnalisées
- Animations et transitions
- Composants typographiques

## 📊 Performance

- **Lazy Loading** - Chargement différé des composants
- **Code Splitting** - Division automatique du bundle
- **Optimisation des images** - Formats modernes et compression
- **Cache intelligent** - Gestion optimisée des données

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests d'intégration
npm run test:integration

# Couverture de code
npm run test:coverage
```

## 📚 Documentation

- **Guide de traduction** - `TRANSLATION_GUIDE.md`
- **Schéma des couleurs** - `COLOR_SCHEME.md`
- **Démo des couleurs** - `COLOR_DEMO.md`
- **Checklist de tests** - `TRANSLATION_TEST_CHECKLIST.md`

## 🤝 Contribution

Nous accueillons les contributions ! Voici comment participer :

1. **Fork** le projet
2. **Créez** une branche pour votre fonctionnalité
3. **Commitez** vos changements
4. **Poussez** vers la branche
5. **Ouvrez** une Pull Request

### Standards de code
- **TypeScript strict** - Typage strict activé
- **ESLint** - Règles de qualité du code
- **Prettier** - Formatage automatique
- **Conventional Commits** - Messages de commit standardisés

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Mohamed Usma** - [GitHub](https://github.com/mohamed-usma1937)

## 🙏 Remerciements

- **shadcn/ui** pour les composants UI exceptionnels
- **Vite** pour l'outil de build ultra-rapide
- **Tailwind CSS** pour le framework CSS utilitaire
- **React Team** pour la bibliothèque React

---

<div align="center">

**⭐ Si ce projet vous plaît, n'oubliez pas de le star sur GitHub ! ⭐**

[![GitHub stars](https://img.shields.io/github/stars/mohamed-usma1937/DigitalStore-React-?style=social)](https://github.com/mohamed-usma1937/DigitalStore-React-/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/mohamed-usma1937/DigitalStore-React-?style=social)](https://github.com/mohamed-usma1937/DigitalStore-React-/network/members)

</div>
