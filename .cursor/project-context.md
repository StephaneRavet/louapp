# Contexte du projet : Application d'aide au maître du jeu du Loup

Cette application vise à aider les maîtres du jeu du Loup à gérer leurs parties.

## Technologies utilisées
- Next.js 15 avec React 19 et Turbopack
- Prisma 6.5.0 comme ORM avec SQLite
- TailwindCSS 4 pour le styling
- TypeScript 5 pour le typage statique
- Jest 29 pour les tests
- Radix UI pour les composants d'interface accessibles
- Zustand 5 pour la gestion d'état

## Structure de l'application
- `/src/app` : Pages et routes de l'application Next.js avec App Router
  - `/src/app/actions` : Actions serveur
  - `/src/app/api` : Routes API
  - `/src/app/game` : Pages liées au jeu
  - `/src/app/store` : Magasins Zustand
  - `/src/app/providers` : Providers React
- `/src/components` : Composants React réutilisables
  - `/src/components/ui` : Composants UI de base (button, card, checkbox, input)
- `/src/lib` : Utilitaires et fonctions partagées
  - `/src/lib/__tests__` : Tests unitaires
- `/src/types` : Types TypeScript
- `/prisma` : Schéma de base de données et migrations

## Conventions de codage
- Indentation : 2 espaces
- Guillemets simples
- Pas de points-virgules
- Composants React fonctionnels avec hooks
- Pas de gestionnaire d'état global (utilisation de Zustand pour l'état local)

## Gestionnaire de paquets
- **TOUJOURS utiliser pnpm** et jamais npm ou yarn
- Version de pnpm utilisée : 10.6.5
- Installer les dépendances avec : `pnpm add [package]`
- Installer les dépendances de développement avec : `pnpm add -D [package]`

## Modèle de données
Le modèle de données principal comprend trois entités :

1. `Role` : Représente les rôles du jeu (Loup, Chasseur, etc.)
   - Attributs : id, name, shortName, slug, description, team, level, isUnique
   - Les équipes sont définies par l'enum `TeamType` : village, loup, independant, multi

2. `GameStep` : Représente les étapes d'une partie (nuit, réveil, vote, etc.)
   - Attributs : id, name, slug, orderIndex

3. `RoleHook` : Table d'association entre un rôle et un hook
   - Attributs : id, roleId, hookId, action
   - Contient les actions spécifiques que chaque rôle doit effectuer à chaque étape

Cette structure permet de définir de manière flexible le comportement de chaque rôle pendant les différentes phases du jeu.

## API et Server Actions
- Les routes API sont définies dans `/src/app/api` en utilisant le modèle de route.ts de Next.js
- Utiliser des fonctions séparées pour GET, POST, PUT, DELETE
- Toujours utiliser try/catch pour gérer les erreurs
- Les Server Actions doivent inclure 'use server' en haut du fichier
- Retourner toujours un objet avec `{ success: boolean, data?: any, error?: string }`

## Gestion des erreurs
- Utiliser des try/catch pour les opérations asynchrones
- Logger les erreurs côté serveur avec console.error()
- Gérer gracieusement les erreurs côté client avec des états d'erreur
- Éviter d'exposer des détails sensibles dans les messages d'erreur

## Déploiement
- L'application est conçue pour être déployée sur mon VPS ovh dockerisé.
- Variables d'environnement gérées via le fichier `.env` à la racine 

## Commandes utiles
- `pnpm dev` : Lance le serveur de développement avec Turbopack
- `pnpm build` : Construit l'application pour la production
- `pnpm seed` : Initialise la base de données avec les données de test
- `pnpm studio` : Lance Prisma Studio
- `pnpm migrate` : Crée une nouvelle migration Prisma
- `pnpm generate` : Génère le client Prisma après modification du schéma
- `pnpm test` : Lance les tests avec Jest
- `pnpm lint` : Vérifie le code avec ESLint

## Bonnes pratiques
- Créer des composants petits et réutilisables
- Utiliser les hooks React plutôt que les classes
- Séparer la logique métier de l'interface utilisateur
- Respecter les conventions de nommage (PascalCase pour les composants, camelCase pour les fonctions)
- Documenter les fonctions complexes et les composants principaux
- Utiliser les Server Actions de Next.js pour les opérations de mutation
- Préférer les composants UI de Radix pour l'accessibilité 