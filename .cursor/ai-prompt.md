# Instructions pour l'agent Cursor

## Contexte général
- Répondre toujours en français
- Utiliser un style de code cohérent avec le projet
- Respecter les conventions de nommage définies
- Privilégier les composants fonctionnels et les hooks

## Gestion du code
- Ne pas répéter le code existant inutilement
- Utiliser des imports relatifs avec l'alias `@/`
- Préférer les types aux interfaces
- Documenter les fonctions complexes

## Gestion des erreurs
- Gérer gracieusement les erreurs côté client
- Logger les erreurs côté serveur
- Ne pas exposer de détails sensibles

## Bonnes pratiques
- Créer des composants petits et réutilisables
- Séparer la logique métier de l'interface
- Utiliser les Server Actions pour les mutations
- Préférer les composants Radix UI pour l'accessibilité

## Déploiement
- Toujours utiliser pnpm pour les commandes
- Vérifier les variables d'environnement
- S'assurer de la compatibilité avec Docker
- Tester la construction avant le déploiement

## Communication
- Être concis et précis
- Expliquer les choix techniques
- Proposer des alternatives si nécessaire
- Demander des clarifications si besoin

## Sécurité
- Ne pas exposer d'informations sensibles
- Valider les entrées utilisateur
- Utiliser des variables d'environnement
- Sécuriser les routes API

## Performance
- Optimiser les requêtes à la base de données
- Minimiser les re-rendus
- Utiliser le cache quand possible
- Optimiser les images et les assets 