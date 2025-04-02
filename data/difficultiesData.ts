export const difficultiesData = {
  very_easy: {
    slug: 'very_easy',
    name: 'Très Facile',
    roles: [
      { slug: 'loup', count: 1 },
      { slug: 'espion', count: 1 },
      { slug: 'marieur', count: 1 },
      { slug: 'chasseur', count: 1 },
      { slug: 'medecin', count: 1 },
      { slug: 'protecteur', count: 1 },
      { slug: 'villageois', count: 1 }
    ],
    description:
      'A la difficulté Très Facile, la partie se compose de 1 Loup, 1 Espion, 1 Marieur, 1 Chasseur, 1 Médecin, 1 Protecteur et 1 Villageois.'
  },
  easy: {
    slug: 'easy',
    name: 'Facile',
    roles: [
      { slug: 'loup', count: 2 },
      { slug: 'espion', count: 1 },
      { slug: 'marieur', count: 1 },
      { slug: 'chasseur', count: 1 },
      { slug: 'medecin', count: 1 },
      { slug: 'protecteur', count: 1 },
      { slug: 'villageois', count: 2 }
    ],
    description:
      'A la difficulté Facile, la partie se compose de 2 Loups, 1 Espion, 1 Marieur, 1 Chasseur, 1 Médecin, 1 Protecteur et 2 Villageois.'
  },
  medium: {
    slug: 'medium',
    name: 'Moyen',
    roles: [
      { slug: 'loup', count: 2 },
      { slug: 'espion', count: 1 },
      { slug: 'marieur', count: 1 },
      { slug: 'chasseur', count: 1 },
      { slug: 'medecin', count: 1 },
      { slug: 'protecteur', count: 1 },
      { slug: 'agent', count: 1 },
      { slug: 'villageois', count: 2 }
    ],
    description:
      'A la difficulté Moyenne, la partie se compose de 2 Loups, 1 Espion, 1 Marieur, 1 Chasseur, 1 Médecin, 1 Protecteur, 1 Agent et 2 Villageois.'
  },
  hard: {
    slug: 'hard',
    name: 'Difficile',
    roles: [
      { slug: 'loup', count: 3 },
      { slug: 'espion', count: 1 },
      { slug: 'marieur', count: 1 },
      { slug: 'chasseur', count: 1 },
      { slug: 'medecin', count: 1 },
      { slug: 'protecteur', count: 1 },
      { slug: 'agent', count: 2 },
      { slug: 'villageois', count: 2 }
    ],
    description:
      'A la difficulté Difficile, la partie se compose de 3 Loups, 1 Espion, 1 Marieur, 1 Chasseur, 1 Médecin, 1 Protecteur, 2 Agents et 2 Villageois.'
  },
  very_hard: {
    slug: 'very_hard',
    name: 'Très Difficile',
    roles: [
      { slug: 'loup', count: 3 },
      { slug: 'espion', count: 1 },
      { slug: 'marieur', count: 1 },
      { slug: 'chasseur', count: 1 },
      { slug: 'medecin', count: 1 },
      { slug: 'protecteur', count: 1 },
      { slug: 'agent', count: 2 },
      { slug: 'joker', count: 1 },
      { slug: 'villageois', count: 2 }
    ],
    description:
      'A la difficulté Très Difficile, la partie se compose de 3 Loups, 1 Espion, 1 Marieur, 1 Chasseur, 1 Médecin, 1 Protecteur, 2 Agents, 1 Joker et 2 Villageois.'
  },
  expert: {
    slug: 'expert',
    name: 'Expert',
    roles: [
      { slug: 'loup', count: 4 },
      { slug: 'espion', count: 1 },
      { slug: 'marieur', count: 1 },
      { slug: 'chasseur', count: 1 },
      { slug: 'medecin', count: 1 },
      { slug: 'protecteur', count: 1 },
      { slug: 'agent', count: 2 },
      { slug: 'joker', count: 2 },
      { slug: 'villageois', count: 2 }
    ],
    description:
      'A la difficulté Expert, la partie se compose de 4 Loups, 1 Espion, 1 Marieur, 1 Chasseur, 1 Médecin, 1 Protecteur, 2 Agents, 2 Jokers et 2 Villageois.'
  }
}

export const difficultiesArray = Object.values(difficultiesData) 