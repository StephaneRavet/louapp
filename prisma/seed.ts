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

  // Création des rôles
  const roles = [
    // Rôles de base (niveau 1)
    {
      name: "Le Villageois",
      slug: "villageois",
      description: "Un simple villageois qui doit identifier et éliminer les loups.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: false,
    },
    {
      name: "Le Loup",
      slug: "loup",
      description: "Un loup qui se réveille chaque nuit avec la meute pour choisir une victime.",
      team: TeamType.loups,
      color: "ROUGE",
      isUnique: false,
    },
    {
      name: "Le Boulet",
      slug: "boulet",
      description: "Ne sert a rien.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },

    // Rôles simples (niveau 2)
    {
      name: "Le Loup",
      slug: "loup",
      description: "II se réveille chaque nuit avec la meute de loups.",
      team: TeamType.loups,
      color: "ROUGE",
      isUnique: true,
    },
    {
      name: "Le Juge",
      slug: "juge",
      description: "Il peut, une fois dans la partie, toussoter pour provoquer un second vote journalier.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Contagieux",
      slug: "contagieux",
      description: "Il peut, deux fois dans la partie, toussoter pour annuler le vote journaler.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Régent",
      slug: "regent",
      description: "Il augmente son vote d'une voix si un loup est 4 cété de lui.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },

    // Rôles moyens (niveau 3)
    {
      name: "Le Serveur",
      slug: "serveur",
      description: "Chaque nuit, il offre un verre au joueur de son choix autre que lui-méme 'empéchant ainsi de voter le lendemain",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Corbeau",
      slug: "corbeau",
      description: "II peut désigner un joueur autre que lui-méme chaque nuit pour lui ajouter deux votes das le lever du jour. Mais pas deux fois de suite la méme personne.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Protecteur",
      slug: "protecteur",
      description: "Il protage la personne de son choix de I'attaque des loups pendant la nuit. Mais pas deux fois de suite le méme joueur.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Espion",
      slug: "espion",
      description: "Chaque nuit, il peut savoir si le joueur de son choix est Loup ou non.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Veilleur",
      slug: "veilleur",
      description: "Chaque nuit, il peut demander au meneur de jeu si la personne de son choix s'est réveillée cette nuit ou non.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Détective",
      slug: "detective",
      description: "Chaque nuit, il désigne deux joueurs, et peut savoir s'ils appartiennent au méme camp, ou non, au moment de la question.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },

    // Rôles avancés (niveau 4)
    {
      name: "Le Médecin",
      slug: "medecin",
      description: "II dispose d'une seule guérison et d'une seule élimination durant toute la partie. A chaque tour, il connaitra la victime des Loups et décidera dlutiliser ou non ses compétences.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Boulanger",
      slug: "boulanger",
      description: "Lorsque le narrateur dit « les loups se rendorment », le boulanger peut ouvrir les yeux pour observer les loups retardataires.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Barbier",
      slug: "barbier",
      description: "Le barbier peut intervenir en journée en annongant son réle, et en éliminant la personne de son choix, ce qui prendra effet immédiatement. Si un loup est éliming, il reste en jeu, en simple villageois désormais. Sill il n'élimine pas de loup, il quitte la partie également.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Chevalier",
      slug: "chevalier",
      description: "Ason élimination, il élimine le joueur assis a sa droite s'il s'agit d'un loup. Sinon, celui a sa gauche. II quitte la partie seul si aucun loup n'est a ses cétés.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Jumeau",
      slug: "jumeau",
      description: "Il peut ouvrir les yeux la nuit avec son autre jumeau. Le second Jumeau est choisi en début de partie par le narrateur en face du joueur Jumeau.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },

    // Rôles complexes (niveau 5)
    {
      name: "Le Renard",
      slug: "renard",
      description: "Chaque nui, il saura si parmi le joueur de son choix et les deux qui 'entourent se cache un loup. Sil flaire un loup, il pourra 4 nouveau chercher la nuit suivante. Sinon, il s'endormira définitivement en ayant innocenté trois personnes d'un coup.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Troubadour",
      slug: "troubadour",
      description: "Chaque nuit, il peut échanger la place de deux joueurs de son choix, y compris lui.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Gedlier",
      slug: "gedlier",
      description: "Si le Médecin n'a plus de pouvoir, il se réveille aprés lui pour choisir de prolonger ou non d'une nuit la victime des loups. Une personne prolongée en méme temps.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Loup Bleu",
      slug: "loup-bleu",
      description: "II se réveille chaque nuit avec la meute de loups. Ila la possibilité d'échapper a l'espion, il verra en lui un Villageois Boulet.",
      team: TeamType.loups,
      color: "ROUGE",
      isUnique: true,
    },
    {
      name: "Le Petit Loup",
      slug: "petit-loup",
      description: "Ne se réveille pas avec la meute de loups. Il est immunisé a l'attaque des loups. Ilse réveille, et parmi les loups restants que le narrateur lui désigne, il peut soit annuler la protection du Protecteur soit immuniser un loup a I'Espion. Jamais deux fois de suite le méme loup.",
      team: TeamType.loups,
      color: "ROUGE",
      isUnique: true,
    },
    {
      name: "Le Grand Méchant Loup",
      slug: "grand-mechant-loup",
      description: "Il se réveille chaque nuit avec la meute de loups. La nuit suivant Iélimination d'un Loup, la meute peut faire appel au Grand Méchant Loup, qui se réveillera en fin de nuit pour faire une unique seconde victime.",
      team: TeamType.loups,
      color: "ROUGE",
      isUnique: true,
    },
    {
      name: "L'Ermite",
      slug: "ermite",
      description: "Il 6vite toute offre du médecin et du serveur, et échappe au chasseur. Il survivra également a la premiare attaque des loups sur sa personne.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Loup Blanc",
      slug: "loup-blanc",
      description: "II se réveille chaque nuit avec la meute de loups. Il gagne la partie s'il parvient a étre le demier survivant.",
      team: TeamType.loups,
      color: "ROUGE",
      isUnique: true,
    },
    {
      name: "Le Raciste",
      slug: "raciste",
      description: "Le village sera séparé en début de partie en deux clans distincts. Si seuls des membres du clan du raciste sont en vie, celui-ci gagne la partie.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "L'avocat",
      slug: "avocat",
      description: "Ii choisit en début de partie deux clients que seul lui connaitra. Il gagnera sa partie seulement si au moins un des deux clients désignés est survivant en fin de partie.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },

    // Rôles très complexes (niveau 6)
    {
      name: "Le Joker",
      slug: "joker",
      description: "Assn élimination, il choisira de renaitre en tant que Joker ou en tant que Loup. Choisir de devenir Loup est définitf.",
      team: TeamType.multi,
      color: "VIOLET",
      isUnique: true,
    },
    {
      name: "L'Unique",
      slug: "unique",
      description: "Le but du villageois Unique est de se faire éliminer au cours du premier vote journalier. Sil y parvient, il gagne la partie seul. Sinon il devient Villageois Boulet.",
      team: TeamType.multi,
      color: "VIOLET",
      isUnique: true,
    },
    {
      name: "La Servante dévouée",
      slug: "servante-devouee",
      description: "Elle peut choisir de récupérer le réle d'un éliminé, en intervenant juste avant que sa carte ne soit révélée. L'éliminé quitte la partie sous le réle Servante Dévouée. Une seule utilisation dans la partie.",
      team: TeamType.multi,
      color: "VIOLET",
      isUnique: true,
    },
    {
      name: "Linterpréte",
      slug: "interprete",
      description: "Il prend le réle de la premiére personne quiil a éliminé, par contribution de vote. L'éliminé quitte la partie sous le réle Interpréte.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Marieur",
      slug: "marieur",
      description: "Il crée en tout début de partie un nouveau clan : Le Couple. II choisit parmi les autres joueurs les deux membres du couple, qui se découvrent juste aprés. Si 'un des deux se fait éliminer : autre est éliming aussitét. Les membres du Couple ne peuvent pas voter un contre l'autre. Le Marieur peut décider ou non de gagner avec le Couple.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Fanatique",
      slug: "fanatique",
      description: "Sillest en couple, il devient Loup. Sil contribue a éliminer le couple par vote journaler, il devient Loup",
      team: TeamType.multi,
      color: "VIOLET",
      isUnique: true,
    },
    {
      name: "Le Chien-Loup",
      slug: "chien-loup",
      description: "Si le Maire oublie de dire dés le lever du jour : « Je nourrile chien. », le Chien-Loup devient Loup, se réveille avec les loups, et élimine les villageois.",
      team: TeamType.loups,
      color: "ROUGE",
      isUnique: true,
    },
    {
      name: "Le Voleur",
      slug: "voleur",
      description: "En début de partie, il choisit parmi trois réles non-distribués celui qu'il sera pendant le reste de la partie. Les deux réles restants seront posés faces visibles avec la carte Voleur pendant le premier tour.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Pére des loups",
      slug: "pere-des-loups",
      description: "Il se réveille chaque nuit avec la meute de loups. Ilse réveille une fois de plus aprés la meute pour décider ou non d'ajouter la victime des loups a la meute. La victime devient Loup et conserve en plus ses compétences initiales. Une fois cet ajout effectué, le Pare des Loups ne se réveille plus en solitaire.",
      team: TeamType.loups,
      color: "ROUGE",
      isUnique: true,
    },
    {
      name: "La Grande Louve",
      slug: "grande-louve",
      description: "Ne se réveille pas avec la meute de loups. Quand un Loup est éliminé, elle peut ouvrir les yeux discrétement pour apercevoir les réles de villageois actifs durant la nuit suivante.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Marchand de sable",
      slug: "marchand-de-sable",
      description: "Chaque nuit il ensommeille deux personnes. Aprés cette action, les personnes ciblées depuis le début de la partie se réveillent ensemble. Si tous les joueurs en vie sont ensommeillés, il gagne la partie. Le marchand de sable ne peut évidemment pas s'ensommeiller lui-méme.",
      team: TeamType.independant,
      color: "VERT",
      isUnique: true,
    },
    {
      name: "L'Agent",
      slug: "agent",
      description: "II choisit en début de partie une mission : protéger un joueur pendant 3 tours, ou éliminer un joueur avant 3 tours. Il meurt si sa mission échoue. Une fois sa mission rempli gagne sa partie.",
      team: TeamType.independant,
      color: "VERT",
      isUnique: true,
    },
    {
      name: "Le Livreur",
      slug: "livreur",
      description: "Il choisi chaque nuit une action entre : Doubler le vote du Corbeau ou le décaler. Ajouter une fléche au chasseur ou y étre immunisé. Ajouter la potion de son choix au médecin. Une fois ses choix épuisés, il choisi entre éliminer la personne de son choix dans deux tours, ou immuniser au vote journalier la personne de son choix pendant deux tours. Il gagne la partie sil parvient a étre le demier survivant.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    },
    {
      name: "Le Traitre",
      slug: "traitre",
      description: "Lorsque tous les loups sont éliminés, le Traftre se réveille chaque nuit pour faire une victime. Les réles intervenants face aux Loups sont inefficaces face a lui. Il gagne la partie s'il parvient a étre le dernier survivant.",
      team: TeamType.village,
      color: "BLEU",
      isUnique: true,
    }
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { slug: role.slug },
      update: role,
      create: role,
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