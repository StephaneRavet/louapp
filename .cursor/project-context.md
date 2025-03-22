# Contexte du projet : Application d'aide au maître du jeu du Loup-Garou

Cette application vise à aider les maîtres du jeu du Loup-Garou à gérer leurs parties.

## Technologies utilisées
- Next.js 15 avec React 19
- Prisma comme ORM avec SQLite
- TailwindCSS pour le styling
- TypeScript pour le typage statique

## Structure de l'application
- `/src/app` : Pages et routes de l'application Next.js
- `/src/components` : Composants React réutilisables
- `/src/lib` : Utilitaires et fonctions partagées
- `/prisma` : Schéma de base de données et migrations

## Conventions de codage
- Indentation : 2 espaces
- Guillemets simples
- Pas de points-virgules
- Composants React fonctionnels avec hooks
- Pas de gestionnaire d'état global

## Modèle de données
Le modèle de données principal comprend trois entités :

1. `Role` : Représente les rôles du jeu (Loup-Garou, Chasseur, etc.)
   - Attributs : nom, slug, description, équipe, couleur, objectif, etc.
   - Les équipes sont définies par l'enum `TeamType` : village, loups, independant, multi

2. `GameHook` : Représente les étapes d'une partie (nuit, réveil, vote, etc.)
   - Attributs : nom, slug, index d'ordre d'exécution

3. `RoleHook` : Table d'association entre un rôle et un hook
   - Contient les actions spécifiques que chaque rôle doit effectuer à chaque étape

Cette structure permet de définir de manière flexible le comportement de chaque rôle pendant les différentes phases du jeu.

## Commandes utiles
- `pnpm seed` : Initialise la base de données avec les données de test
- `npx prisma generate` : Génère le client Prisma après modification du schéma
- `npx prisma db push` : Met à jour la base de données selon le schéma 