# aoe4.fr

**aoe4.fr** est le site de la communauté française d'Age of Empires IV.

Retrouvez en un seul endroit le classement des joueurs français, le suivi des parties en cours, et tout le contenu autour de la scène compétitive AoE4 France.

---

## ✨ Fonctionnalités

- **Leaderboard** — Classement des joueurs français avec leurs stats (ELO, victoires, ratio W/L, etc.), synchronisé depuis l'API officielle AoE4.
- **Parties en cours** — Suivi en temps réel des games actives des joueurs de la communauté.
- **Contenu communautaire** — Informations et actualités autour de la scène française.
- **Autres évènements** — Application dédiée aux événements et challenges organisés par la communauté.

---

## 🏗️ Architecture

Monorepo NX structuré en applications et librairies :

```
aoe4.fr/
├── apps/
│   ├── frontend/          # Application React (site vitrine + routing)
│   └── backend/           # API NestJS (leaderboard, parties en cours, joueurs)
├── libs/
│   ├── wololo-challenge/  # Lib React pour les événements/challenges (réutilisable)
│   └── shared-types/      # Types TypeScript partagés front/back
```

### Backend — modules principaux

| Module | Rôle |
|---|---|
| `leaderboard` | Récupération et mise en cache du classement joueurs |
| `current-games` | Synchronisation et exposition des parties en cours |
| `player` | Gestion des profils joueurs et synchronisation |

### Frontend — routes

| Route | Contenu |
|---|---|
| `/` | Page d'accueil — présentation de la communauté |
| `/leaderboard` | Classement des joueurs français |
| `/current-games` | Parties en cours |
| `/event/*` | Application Wololo Challenge |

---

## 🔧 Stack technique

| Couche | Technologies |
|---|---|
| Frontend | React 19, React Router, Tailwind CSS, Vite |
| Backend | NestJS 11, TypeScript |
| Monorepo | NX 22, npm workspaces |
| Tests | Jest, Playwright |
| Linting | ESLint, Prettier |

---

## 🚀 Lancer le projet en local

**Prérequis** : Node.js ≥ 18, npm

```bash
# Installer les dépendances
npm install

# Lancer le frontend
npm run dev
# ou : nx serve frontend

# Lancer le backend
npm run serve:backend
# ou : nx serve backend
```

### Build & déploiement

```bash
# Build frontend (production)
npm run build

# Déployer sur GitHub Pages
npm run deploy

# Build backend
npm run build:backend
```

### Tests & lint

```bash
# Tous les projets
npm test
npm lint

# Par projet
nx test frontend
nx test backend
nx test wololo-challenge
```

---

## 📦 La lib Wololo Challenge

`libs/wololo-challenge` est une librairie React **autonome et réutilisable** pour les événements organisés par la communauté. Elle embarque ses propres composants, hooks, et services.

```tsx
import { WololoChallengeApp } from '@aoe4.fr/wololo-challenge';

<Route path="/event/*" element={<WololoChallengeApp />} />
```

---
