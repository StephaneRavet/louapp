# Le jeu du Loup

Application d'aide pour les maîtres du jeu du Loup : rôles, étapes de jeu et difficultés.

## Démarrer en local

### Prérequis

- [Node.js](https://nodejs.org/) 20 ou plus récent
- `pnpm` ; Corepack est inclus avec les versions récentes de Node.js

### Installation

```bash
git clone <URL_DU_DEPOT>
cd louapp
corepack enable
pnpm install
```

### Configuration

Créer un fichier `.env` à la racine :

```dotenv
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_API_URL=""
```

La base SQLite locale est stockée dans `prisma/dev.db`.

### Lancer l'application

```bash
pnpm dev
```

Cette commande génère automatiquement le client Prisma requis, puis démarre Next.js. Ouvrir ensuite [http://localhost:3000](http://localhost:3000).

Si les données locales doivent être réinitialisées, utiliser :

```bash
pnpm db:seed
```

Attention : cette commande remet à zéro la base locale avant de la remplir avec les données de démonstration.

## Vérifier le projet

```bash
pnpm lint
pnpm test
pnpm build
```

## Scripts utiles

| Commande | Usage |
| --- | --- |
| `pnpm dev` | Génère Prisma et lance le serveur de développement |
| `pnpm build` | Génère Prisma et construit l'application de production |
| `pnpm start` | Lance le build de production |
| `pnpm lint` | Vérifie le code avec ESLint |
| `pnpm test` | Lance les tests Jest |
| `pnpm db:seed` | Réinitialise et peuple la base locale |
| `pnpm db:studio` | Ouvre Prisma Studio pour consulter la base |
| `pnpm docker:up` | Construit et démarre le conteneur Docker |
| `pnpm docker:down` | Arrête le conteneur Docker |
| `pnpm docker:logs` | Affiche les journaux Docker |

## Structure du projet

| Dossier | Contenu |
| --- | --- |
| `src/app` | Pages et routes API Next.js |
| `src/components` | Composants React réutilisables |
| `src/lib` | Utilitaires et accès Prisma |
| `src/store` | État de l'application |
| `prisma` | Schéma, base SQLite locale et script de seed |
| `data` | Données de démonstration |
| `public` | Fichiers statiques |

## Technologies

- Next.js 15 et React 19
- Prisma avec SQLite
- TypeScript
- Tailwind CSS et shadcn/ui
