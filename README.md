# Le jeu du Loup

Application d'aide pour les maîtres du jeu du Loup. Cette application permet de gérer facilement les rôles, les phases de jeu et les actions des joueurs.

## Pour commencer

Lancez le serveur de développement :

```bash
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

## Technologies utilisées

- Next.js 15
- Prisma
- TailwindCSS
- shadcn/ui
- TypeScript

## Scripts disponibles

- `pnpm dev` : Lance le serveur de développement
- `pnpm build` : Construit l'application pour la production
- `pnpm start` : Lance l'application en production
- `pnpm lint` : Vérifie le code avec ESLint
- `pnpm test` : Lance les tests
- `pnpm db:seed` : Initialise la base de données avec les données de test
- `pnpm db:studio` : Lance Prisma Studio pour visualiser la base de données

## Structure du projet

- `/src/app` : Pages et routes de l'application
- `/src/components` : Composants React réutilisables
- `/src/lib` : Utilitaires et configurations
- `/prisma` : Schéma et migrations de la base de données
- `/public` : Fichiers statiques

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
