import { Role, TeamType } from '@prisma/client';

// Création d'un type pour les données de base des rôles
// qui sera utilisé sans les champs auto-générés par Prisma
export type RoleData = {
  name: string;
  shortName: string;
  slug: string;
  description: string;
  team: TeamType;
  color: string;
  objectif?: string;
  isUnique: boolean;
};

// Fonction pour convertir les données en objets Role complets pour les tests
export const createMockRole = (
  roleData: RoleData, 
  id: number
): Role => {
  return {
    id,
    ...roleData,
    objectif: roleData.objectif || null,
    color: roleData.color,
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

// Données des rôles de base
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
  },
  loup: {
    name: "Le Loup",
    slug: "loup",
    description: "Un loup qui se réveille chaque nuit avec la meute pour choisir une victime.",
    team: TeamType.loup,
    color: "ROUGE",
    isUnique: false,
    shortName: "Loup",
  },
  boulet: {
    name: "Le Boulet",
    slug: "boulet",
    description: "Ne sert à rien.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Boulet",
  },

  // Rôles simples (niveau 2)
  juge: {
    name: "Le Juge",
    slug: "juge",
    description: "Il peut, une fois dans la partie, toussoter pour provoquer un second vote journalier.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Juge",
  },
  contagieux: {
    name: "Le Contagieux",
    slug: "contagieux",
    description: "Il peut, deux fois dans la partie, toussoter pour annuler le vote journalier.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Contagieux",
  },
  regent: {
    name: "Le Régent",
    slug: "regent",
    description: "Il augmente son vote d'une voix si un loup est à côté de lui.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Régent",
  },

  // Rôles moyens (niveau 3)
  serveur: {
    name: "Le Serveur",
    slug: "serveur",
    description: "Chaque nuit, il offre un verre au joueur de son choix autre que lui-même empêchant ainsi de voter le lendemain",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Serveur",
  },
  corbeau: {
    name: "Le Corbeau",
    slug: "corbeau",
    description: "Il peut désigner un joueur autre que lui-même chaque nuit pour lui ajouter deux votes dès le lever du jour. Mais pas deux fois de suite la même personne.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Corbeau",
  },
  protecteur: {
    name: "Le Protecteur",
    slug: "protecteur",
    description: "Il protège la personne de son choix de l'attaque des loups pendant la nuit. Mais pas deux fois de suite le même joueur.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Protecteur",
  },
  espion: {
    name: "L'Espion",
    slug: "espion",
    description: "Chaque nuit, il peut savoir si le joueur de son choix est Loup ou non.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Espion",
  },
  veilleur: {
    name: "Le Veilleur",
    slug: "veilleur",
    description: "Chaque nuit, il peut demander au meneur de jeu si la personne de son choix s'est réveillée cette nuit ou non.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Veilleur",
  },
  detective: {
    name: "Le Détective",
    slug: "detective",
    description: "Chaque nuit, il désigne deux joueurs, et peut savoir s'ils appartiennent au méme camp, ou non, au moment de la question.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Détective",
  },
  voyante: {
    name: "La Voyante",
    slug: "voyante",
    description: "Voit le rôle d'un joueur chaque nuit",
    team: TeamType.village,
    color: "VIOLET",
    objectif: "Aider le village à identifier les loups",
    isUnique: true,
    shortName: "Voyante",
  },
  
  // Rôles avancés (niveau 4)
  medecin: {
    name: "Le Médecin",
    slug: "medecin",
    description: "II dispose d'une seule guérison et d'une seule élimination durant toute la partie. À chaque tour, il connaitra la victime des Loups et décidera d'utiliser ou non ses compétences.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Médecin",
  },
  chasseur: {
    name: "Le Chasseur",
    slug: "chasseur",
    description: "Peut éliminer un joueur en mourant",
    team: TeamType.village,
    color: "BLEU",
    objectif: "Éliminer tous les loups",
    isUnique: true,
    shortName: "Chasseur",
  },
  sorciere: {
    name: "La Médecin",
    slug: "medecin",
    description: "Peut sauver ou tuer un joueur",
    team: TeamType.village,
    color: "VIOLET",
    objectif: "Utiliser ses potions au bon moment",
    isUnique: true,
    shortName: "Médecin",
  },
  boulanger: {
    name: "Le Boulanger",
    slug: "boulanger",
    description: "Lorsque le narrateur dit « les loups se rendorment », le boulanger peut ouvrir les yeux pour observer les loups retardataires.",
    team: TeamType.village,
    color: "BLEU",
    isUnique: true,
    shortName: "Boulanger",
  },
  
  // Ajoutez les autres rôles ici selon les besoins
};

// Conversion en tableau pour faciliter les itérations
export const rolesArray = Object.values(rolesData);

// Création d'un objet avec tous les rôles mockés pour les tests
export const mockRoles: Role[] = rolesArray.map((role, index) => 
  createMockRole(role, index + 1)
); 