import { PrismaClient } from '@prisma/client';
import { rolesData, rolesArray } from '../src/data/rolesData';

const prisma = new PrismaClient();

async function main() {
  // Création des hooks de jeu de base
  const gameHooks = [
    { name: 'Début de partie', slug: 'debut_partie', orderIndex: 0 },
    { name: 'Nuit', slug: 'nuit', orderIndex: 1 },
    { name: 'Réveil', slug: 'reveil', orderIndex: 2 },
    { name: 'Vote journalier', slug: 'vote_journalier', orderIndex: 3 },
    { name: 'Élimination', slug: 'elimination', orderIndex: 4 },
    { name: 'Fin de partie', slug: 'fin_partie', orderIndex: 5 },
  ];

  for (const hook of gameHooks) {
    await prisma.gameHook.upsert({
      where: { slug: hook.slug },
      update: hook,
      create: hook,
    });
  }

  // Création de tous les rôles à partir des données centralisées
  for (const role of rolesArray) {
    await prisma.role.upsert({
      where: { slug: role.slug },
      update: role,
      create: role,
    });
  }

  // Exemple d'association rôle-hook
  const chasseur = await prisma.role.findUnique({
    where: { slug: rolesData.chasseur.slug },
  });

  if (chasseur) {
    await prisma.roleHook.upsert({
      where: { 
        roleId_hookId: {
          roleId: chasseur.id,
          hookId: (await prisma.gameHook.findUnique({ where: { slug: 'elimination' }}))!.id
        }
      },
      update: {
        action: 'Le Chasseur élimine immédiatement un autre joueur de son choix.',
      },
      create: {
        roleId: chasseur.id,
        hookId: (await prisma.gameHook.findUnique({ where: { slug: 'elimination' }}))!.id,
        action: 'Le Chasseur élimine immédiatement un autre joueur de son choix.',
      },
    });
  }

  console.log('Base de données initialisée avec succès');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 