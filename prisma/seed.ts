import { PrismaClient } from '@prisma/client';
import { rolesData, rolesArray } from '../data/rolesData';

const prisma = new PrismaClient();

async function main() {
  // Création des hooks de jeu de base
  const gameHooks = [
    { name: '🎬 Début de partie', slug: 'debut_partie', sentence:'La nuit tombe sur le village. Les villageois s’endorment paisiblement… mais dans l’ombre, les loups se réveillent.', orderIndex: 0 },
    { name: '🌙 Début de la nuit', slug: 'debut_nuit', sentence: 'Loups, réveillez-vous. Cherchez-vous du regard et désignez ensemble une victime.', orderIndex: 1 },
    { name: '🌙 Fin de la nuit', slug: 'fin_nuit', sentence: 'C’est noté. Loups-garous, rendormez-vous.', orderIndex: 2 },
    { name: '☀️ Réveil', slug: 'reveil', sentence:"Tout le monde peut se réveiller, le jour se lève sur le village. Cette nuit, le village a été attaqué. {joueur}, tu as été dévoré par les loups. Tu es éliminé et ne peux plus participer aux discussions.", orderIndex: 3 },
    { name: '🗣️ Débat', slug: 'debat', sentence:'Les villageois se réunissent pour débattre. Qui, parmi vous, est un loup ? Discutez entre vous et désignez quelqu’un à éliminer.', orderIndex: 4 },
    { name: '🗳️ Vote', slug:'vote', sentence:'Il est temps de voter. À 3, vous pointez du doigt la personne que vous souhaitez éliminer. 1… 2… 3… Votez !', orderIndex: 5 },
    { name: '🔪 Élimination', slug: 'elimination', sentence:'{joueur} a été éliminé. Veux-tu dire un dernier mot avant ? Maintenant, tu ne peux plus participer aux discussions.', orderIndex: 6 },
    { name: '🏁 Fin de partie', slug: 'fin_partie', sentence:'La partie est terminée. Les {gagnants} ont gagné. Les {perdants} ont été éliminés.', orderIndex: 7 },
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