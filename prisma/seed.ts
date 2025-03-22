import { PrismaClient, TeamType } from '@prisma/client';

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

  // Exemple de création d'un rôle
  const chasseur = await prisma.role.upsert({
    where: { slug: 'chasseur' },
    update: {
      name: 'Le Chasseur',
      description: 'Peut éliminer un joueur en mourant',
      team: TeamType.village,
      color: 'BLEU',
      objectif: 'Éliminer tous les loups',
    },
    create: {
      name: 'Le Chasseur',
      slug: 'chasseur',
      description: 'Peut éliminer un joueur en mourant',
      team: TeamType.village,
      color: 'BLEU',
      objectif: 'Éliminer tous les loups',
      isUnique: true,
    },
  });

  // Exemple d'association rôle-hook
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