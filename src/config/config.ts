/**
 * Configuration globale de l'application
 */

// Feature flags
export const FEATURES = {
  // Activer/désactiver l'initialisation automatique des joueurs et rôles
  AUTO_INIT: process.env.NODE_ENV === 'development',
  // AUTO_INIT: false,
  
  // Nombre de joueurs à créer par défaut
  DEFAULT_PLAYERS_COUNT: 10,
  
  // Nombre total de rôles à présélectionner
  DEFAULT_ROLES_COUNT: 10,
  
  // Nombre de loups à présélectionner (les autres seront des villageois)
  DEFAULT_WEREWOLVES_COUNT: 3,

  // Nombre de rôles indépendants à présélectionner
  DEFAULT_INDEPENDANT_COUNT: 2,

  // Nombre de rôles multi-équipes à présélectionner
  DEFAULT_MULTI_COUNT: 2,
}

// Ordre de tri des équipes pour l'affichage des rôles
export const TEAM_SORT_ORDER = {
  'loup': 0,
  'village': 1,
  'independant': 2,
  'multi': 3
} 