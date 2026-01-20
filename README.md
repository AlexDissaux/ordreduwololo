# L'Ordre du Wololo - Monorepo

Monorepo NX contenant le site vitrine et l'application de challenge de l'Ordre du Wololo.

## 🏗️ Structure du Projet

```
ordreduwololo/
├── apps/
│   ├── frontend/          # Application React principale (site vitrine + routing)
│   └── backend/           # API NestJS
├── libs/
│   ├── wololo-challenge/  # Lib React de l'app événement (réutilisable)
│   └── shared-types/      # Types partagés entre front et back
```

## 🚀 Commandes

### Développement

```bash
# Lancer le frontend (site vitrine + app événement)
npm run dev
# ou
nx serve frontend

# Lancer le backend
npm run serve:backend
# ou
nx serve backend
```

### Build & Déploiement

```bash
# Build du frontend pour production
npm run build

# Déployer sur GitHub Pages
npm run deploy

# Build du backend
npm run build:backend
```

### Tests & Linting

```bash
# Tester tous les projets
npm test

# Linter tous les projets
npm lint

# Tester un projet spécifique
nx test frontend
nx test backend
nx test wololo-challenge
```

## 📦 Applications

### Frontend (`apps/frontend`)

Application React principale avec routing :
- **`/`** : Page d'accueil du site vitrine
- **`/event`** : Application de challenge (wololo-challenge lib)

Stack : React 19, React Router, Tailwind CSS, Vite

### Backend (`apps/backend`)

API REST NestJS pour le site vitrine et les futurs besoins.

Stack : NestJS, TypeScript

## 📚 Librairies

### Wololo Challenge (`libs/wololo-challenge`)

Librairie React contenant toute l'application de challenge de l'événement. **Réutilisable** pour les prochaines éditions.

Contient :
- Composants (Leaderboard, Stats, Countdown, etc.)
- Hooks custom (usePlayers, useTeams, etc.)
- Services API
- Styles

### Shared Types (`libs/shared-types`)

Types TypeScript partagés entre le frontend et le backend pour garantir la cohérence des données.

## 🎯 Utilisation de la Lib Wololo Challenge

```tsx
import { WololoChallengeApp } from '@ordreduwololo-nx/wololo-challenge';

// Dans votre app
<Route path="/event" element={<WololoChallengeApp />} />
```

## 🌐 GitHub Pages

Le frontend est configuré pour être déployé sur GitHub Pages avec le script `npm run deploy`.

Le fichier `public/CNAME` est préservé pour le domaine personnalisé.

## 🔧 Technologies

- **Monorepo** : NX 22
- **Frontend** : React 19, React Router, Tailwind CSS, Vite
- **Backend** : NestJS 11
- **TypeScript** : 5.9
- **Tests** : Jest, Playwright
- **Linting** : ESLint, Prettier

## 📝 Notes

- Le projet utilise npm workspaces
- Les builds sont centralisés dans `dist/apps/`
- La lib wololo-challenge est indépendante et peut être réutilisée dans d'autres projets
