# Règles pour l'utilisation des composants UI

## Installation des composants
- Utiliser shadcn pour installer les composants manquants
- Commande : `pnpm dlx shadcn@latest add [component-name]`
- Exemple : `pnpm dlx shadcn@latest add badge`

## Liste des composants déjà installés
- button
- card
- form
- input
- select
- switch
- data-table
- badge

## Structure des composants
- Les composants UI sont stockés dans `src/components/ui/`
- Chaque composant a son propre fichier (ex: `button.tsx`)
- Les composants utilisent Tailwind CSS pour le style 