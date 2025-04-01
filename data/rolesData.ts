import { Role, TeamType } from '@prisma/client';

type RoleData = Omit<Role, 'id' | 'createdAt' | 'updatedAt' | 'roleHooks'>

// Fonction pour convertir les données en objets Role complets pour les tests
export const createMockRole = (
  roleData: RoleData,
  id: number
): Role => {
  return {
    id,
    ...roleData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

export const rolesData: Record<string, RoleData> = {
  // Rôles de base (niveau 1)
  villageois: {
    name: "Le Villageois",
    slug: "villageois",
    description: "Un simple villageois qui doit identifier et éliminer les loups.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: false,
    shortName: "Villageois",
    level: 1
  },
  loup: {
    name: "Le Loup",
    slug: "loup",
    description: "Un loup qui se réveille chaque nuit avec la meute pour choisir une victime.",
    team: TeamType.loup,
    color: "ROUGE",
    isUnique: false,
    shortName: "Loup",
    level: 1
  },
  boulet: {
    name: "Le Boulet",
    slug: "boulet",
    description: "Ne sert à rien.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Boulet",
    level: 1
  },
  // Rôles simples (niveau 2)
  medecin: {
    name: "Le Médecin",
    slug: "medecin",
    description: "II dispose d'une seule guérison et d'une seule élimination durant toute la partie. À chaque tour, il connaitra la victime des Loups et décidera d'utiliser ou non ses compétences.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Médecin",
    level: 2
  },
  chasseur: {
    name: "Le Chasseur",
    slug: "chasseur",
    description: "Peut éliminer un joueur en mourant",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Chasseur",
    level: 2
  },
  protecteur: {
    name: "Le Protecteur",
    slug: "protecteur",
    description: "Il protège la personne de son choix de l'attaque des loups pendant la nuit. Mais pas deux fois de suite le même joueur.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Protecteur",
    level: 2
  },
  espion: {
    name: "L'Espion",
    slug: "espion",
    description: "Chaque nuit, il peut savoir si le joueur de son choix est Loup ou non.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Espion",
    level: 2
  },
  loup_bleu: {
    name: "Le Loup Bleu",
    slug: "loup-bleu",
    description: "II se réveille chaque nuit avec la meute de loups. Ila la possibilité d'échapper a l'espion, il verra en lui un Villageois Boulet.",
    team: TeamType.loup,
    color: "ROUGE",
    isUnique: true,
    shortName: "Loup Bleu",
    level: 2
  },
  // Rôles moyens (niveau 3)
  juge: {
    name: "Le Juge",
    slug: "juge",
    description: "Il peut, une fois dans la partie, toussoter pour provoquer un second vote journalier.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Juge",
    level: 3
  },
  contagieux: {
    name: "Le Contagieux",
    slug: "contagieux",
    description: "Il peut, deux fois dans la partie, toussoter pour annuler le vote journalier.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Contagieux",
    level: 3
  },
  serveur: {
    name: "Le Serveur",
    slug: "serveur",
    description: "Chaque nuit, il offre un verre au joueur de son choix autre que lui-même empêchant ainsi de voter le lendemain",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Serveur",
    level: 3
  },
  corbeau: {
    name: "Le Corbeau",
    slug: "corbeau",
    description: "Il peut désigner un joueur autre que lui-même chaque nuit pour lui ajouter deux votes dès le lever du jour. Mais pas deux fois de suite la même personne.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Corbeau",
    level: 3
  },
  veilleur: {
    name: "Le Veilleur",
    slug: "veilleur",
    description: "Chaque nuit, il peut demander au meneur de jeu si la personne de son choix s'est réveillée cette nuit ou non.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Veilleur",
    level: 3
  },
  detective: {
    name: "Le Détective",
    slug: "detective",
    description: "Chaque nuit, il désigne deux joueurs, et peut savoir s'ils appartiennent au méme camp, ou non, au moment de la question.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Détective",
    level: 3
  },
  loup_blanc: {
    name: "Le Loup Blanc",
    slug: "loup-blanc",
    description: "II se réveille chaque nuit avec la meute de loups. Il gagne la partie s'il parvient à être le dernier survivant.",
    team: TeamType.loup,
    color: "ROUGE",
    isUnique: true,
    shortName: "Loup Blanc",
    level: 3
  },
  raciste: {
    name: "Le Raciste",
    slug: "raciste",
    description: "Le village sera séparé en début de partie en deux clans distincts. Si seuls des membres du clan du raciste sont en vie, celui-ci gagne la partie.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Raciste",
    level: 3
  },
  // Rôles avancés (niveau 4)
  regent: {
    name: "Le Régent",
    slug: "regent",
    description: "Il augmente son vote d'une voix si un loup est à côté de lui.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Régent",
    level: 4
  },
  boulanger: {
    name: "Le Boulanger",
    slug: "boulanger",
    description: "Lorsque le narrateur dit « les loups se rendorment », le boulanger peut ouvrir les yeux pour observer les loups retardataires.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Boulanger",
    level: 4
  },
  barbier: {
    name: "Le Barbier",
    slug: "barbier",
    description: "Le barbier peut intervenir en journée en annonçant son rôle, et en éliminant la personne de son choix, ce qui prendra effet immédiatement. Si un loup est éliminé, il reste en jeu, en simple villageois désormais. S'il n'élimine pas de loup, il quitte la partie également.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Barbier",
    level: 4
  },
  chevalier: {
    name: "Le Chevalier",
    slug: "chevalier",
    description: "À son élimination, il élimine le joueur assis à sa droite s'il s'agit d'un loup. Sinon, celui à sa gauche. II quitte la partie seul si aucun loup n'est à ses côtés.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Chevalier",
    level: 4
  },
  jumeau: {
    name: "Le Jumeau",
    slug: "jumeau",
    description: "Il peut ouvrir les yeux la nuit avec son autre jumeau. Le second Jumeau est choisi en début de partie par le narrateur en face du joueur Jumeau.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Jumeau",
    level: 4
  },
  // Rôles complexes (niveau 5)
  renard: {
    name: "Le Renard",
    slug: "renard",
    description: "Chaque nuit, il saura si parmi le joueur de son choix et les deux qui l'entourent se cache un loup. S'il flaire un loup, il pourra à nouveau chercher la nuit suivante. Sinon, il s'endormira définitivement en ayant innocenté trois personnes d'un coup.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Renard",
    level: 5
  },
  troubadour: {
    name: "Le Troubadour",
    slug: "troubadour",
    description: "Chaque nuit, il peut échanger la place de deux joueurs de son choix, y compris lui.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Troubadour",
    level: 5
  },
  geolier: {
    name: "Le Geôlier",
    slug: "geolier",
    description: "Si le Médecin n'a plus de pouvoir, il se réveille après lui pour choisir de prolonger ou non d'une nuit la victime des loups. Une personne prolongée en même temps.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Geôlier",
    level: 5
  },
  petit_loup: {
    name: "Le Petit Loup",
    slug: "petit-loup",
    description: "Ne se réveille pas avec la meute de loups. Il est immunisé à l'attaque des loups. Il se réveille, et parmi les loups restants que le narrateur lui désigne, il peut soit annuler la protection du Protecteur soit immuniser un loup à l'Espion. Jamais deux fois de suite le même loup.",
    team: TeamType.loup,
    color: "ROUGE",
    isUnique: true,
    shortName: "Petit Loup",
    level: 5
  },
  grand_mechant_loup: {
    name: "Le Grand Méchant Loup",
    slug: "grand-mechant-loup",
    description: "Il se réveille chaque nuit avec la meute de loups. La nuit suivant l'élimination d'un Loup, la meute peut faire appel au Grand Méchant Loup, qui se réveillera en fin de nuit pour faire une unique seconde victime.",
    team: TeamType.loup,
    color: "ROUGE",
    isUnique: true,
    shortName: "Grand Méchant Loup",
    level: 5
  },
  ermite: {
    name: "L'Ermite",
    slug: "ermite",
    description: "Il évite toute offre du médecin et du serveur, et échappe au chasseur. Il survivra également à la première attaque des loups sur sa personne.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Ermite",
    level: 5
  },
  avocat: {
    name: "L'avocat",
    slug: "avocat",
    description: "Il choisit en début de partie deux clients que seul lui connaitra. Il gagnera sa partie seulement si au moins un des deux clients désignés est survivant en fin de partie.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Avocat",
    level: 5
  },
  // Rôles très complexes (niveau 6)
  joker: {
    name: "Le Joker",
    slug: "joker",
    description: "À son élimination, il choisira de renaitre en tant que Joker ou en tant que Loup. Choisir de devenir Loup est définitif.",
    team: TeamType.multi,
    color: "VIOLET",
    isUnique: true,
    shortName: "Joker",
    level: 6
  },
  unique: {
    name: "L'Unique",
    slug: "unique",
    description: "Le but du villageois Unique est de se faire éliminer au cours du premier vote journalier. S'il y parvient, il gagne la partie seul. Sinon il devient Villageois Boulet.",
    team: TeamType.multi,
    color: "VIOLET",
    isUnique: true,
    shortName: "Unique",
    level: 6
  },
  servante_devouee: {
    name: "La Servante dévouée",
    slug: "servante-devouee",
    description: "Elle peut choisir de récupérer le rôle d'un éliminé, en intervenant juste avant que sa carte ne soit révélée. L'éliminé quitte la partie sous le rôle Servante Dévouée. Une seule utilisation dans la partie.",
    team: TeamType.multi,
    color: "VIOLET",
    isUnique: true,
    shortName: "Servante dévouée",
    level: 6
  },
  interprete: {
    name: "L'Interprète",
    slug: "interprete",
    description: "Il prend le rôle de la première personne qu'il a éliminé, par contribution de vote. L'éliminé quitte la partie sous le rôle Interprète.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Interprète",
    level: 6
  },
  marieur: {
    name: "Le Marieur",
    slug: "marieur",
    description: "Il crée en tout début de partie un nouveau clan : Le Couple. II choisit parmi les autres joueurs les deux membres du couple, qui se découvrent juste après. Si l'un des deux se fait éliminer : l'autre est éliminé aussitôt. Les membres du Couple ne peuvent pas voter un contre l'autre. Le Marieur peut décider ou non de gagner avec le Couple.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Marieur",
    level: 6
  },
  fanatique: {
    name: "Le Fanatique",
    slug: "fanatique",
    description: "S'il est en couple, il devient Loup. S'il contribue à éliminer le couple par vote journalier, il devient Loup",
    team: TeamType.multi,
    color: "VIOLET",
    isUnique: true,
    shortName: "Fanatique",
    level: 6
  },
  chien_loup: {
    name: "Le Chien-Loup",
    slug: "chien-loup",
    description: "Si le Maire oublie de dire dès le lever du jour : « Je nourri le chien. », le Chien-Loup devient Loup, se réveille avec les loups, et élimine les villageois.",
    team: TeamType.loup,
    color: "ROUGE",
    isUnique: true,
    shortName: "Chien-Loup",
    level: 6
  },
  voleur: {
    name: "Le Voleur",
    slug: "voleur",
    description: "En début de partie, il choisit parmi trois rôles non-distribués celui qu'il sera pendant le reste de la partie. Les deux rôles restants seront posés faces visibles avec la carte Voleur pendant le premier tour.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Voleur",
    level: 6
  },
  pere_des_loups: {
    name: "Le Père des loups",
    slug: "pere-des-loups",
    description: "Il se réveille chaque nuit avec la meute de loups. Il se réveille une fois de plus après la meute pour décider ou non d'ajouter la victime des loups à la meute. La victime devient Loup et conserve en plus ses compétences initiales. Une fois cet ajout effectué, le Père des Loups ne se réveille plus en solitaire.",
    team: TeamType.loup,
    color: "ROUGE",
    isUnique: true,
    shortName: "Père des loups",
    level: 6
  },
  grande_louve: {
    name: "La Grande Louve",
    slug: "grande-louve",
    description: "Ne se réveille pas avec la meute de loups. Quand un Loup est éliminé, elle peut ouvrir les yeux discrètement pour apercevoir les rôles de villageois actifs durant la nuit suivante.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Grande Louve",
    level: 6
  },
  marchand_de_sable: {
    name: "Le Marchand de sable",
    slug: "marchand-de-sable",
    description: "Chaque nuit il ensommeille deux personnes. Après cette action, les personnes ciblées depuis le début de la partie se réveillent ensemble. Si tous les joueurs en vie sont ensommeillés, il gagne la partie. Le marchand de sable ne peut évidemment pas s'ensommeiller lui-même.",
    team: TeamType.independant,
    color: "VERT",
    isUnique: true,
    shortName: "Marchand de sable",
    level: 6
  },
  agent: {
    name: "L'Agent",
    slug: "agent",
    description: "II choisit en début de partie une mission : protéger un joueur pendant 3 tours, ou éliminer un joueur avant 3 tours. Il meurt si sa mission échoue. Une fois sa mission remplie gagne sa partie.",
    team: TeamType.independant,
    color: "VERT",
    isUnique: true,
    shortName: "Agent",
    level: 6
  },
  livreur: {
    name: "Le Livreur",
    slug: "livreur",
    description: "Il choisit chaque nuit une action entre : Doubler le vote du Corbeau ou le décaler. Ajouter une flèche au chasseur ou y être immunisé. Ajouter la potion de son choix au médecin. Une fois ses choix épuisés, il choisit entre éliminer la personne de son choix dans deux tours, ou immuniser au vote journalier la personne de son choix pendant deux tours. Il gagne la partie s'il parvient à être le dernier survivant.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Livreur",
    level: 6
  },
  traitre: {
    name: "Le Traitre",
    slug: "traitre",
    description: "Lorsque tous les loups sont éliminés, le Traître se réveille chaque nuit pour faire une victime. Les rôles intervenants face aux Loups sont inefficaces face à lui. Il gagne la partie s'il parvient à être le dernier survivant.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Traitre",
    level: 6
  }
};

// Conversion en tableau pour faciliter les itérations
export const rolesArray = Object.values(rolesData);

// Création d'un objet avec tous les rôles mockés pour les tests
export const mockRoles: Role[] = rolesArray.map((role, index) =>
  createMockRole(role, index + 1)
); 