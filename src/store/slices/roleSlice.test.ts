import { createRoleSlice } from '@/store/slices/roleSlice'
import type { StoreApi } from 'zustand'
import { createMockRole } from '@/data/rolesData'
import { TeamType } from '@prisma/client'
import type { AppState } from '@/store/index'

// Mocker la fonction shuffle pour avoir un comportement déterministe
jest.mock('@/lib/utils', () => ({
  shuffle: <T>(array: T[]) => [...array], // Retourne une copie sans mélanger
}))

// Mock des données de test
const mockPlayers = [
  'Joueur 1', 'Joueur 2', 'Joueur 3', 'Joueur 4',
  'Joueur 5', 'Joueur 6', 'Joueur 7', 'Joueur 8',
  'Joueur 9', 'Joueur 10'
]

// Création des rôles mockés
const mockRoles = [
  createMockRole({ name: 'Le Loup', shortName: 'Loup', slug: 'loup', description: 'Un loup', team: TeamType.loup, color: 'ROUGE', isUnique: false }, 1),
  createMockRole({ name: 'Le Villageois', shortName: 'Villageois', slug: 'villageois', description: 'Un villageois', team: TeamType.village, color: 'BLEU', isUnique: false }, 2),
  createMockRole({ name: 'Le Médecin', shortName: 'Médecin', slug: 'medecin', description: 'Un médecin', team: TeamType.village, color: 'BLEU', isUnique: true }, 3),
  createMockRole({ name: 'Le Chasseur', shortName: 'Chasseur', slug: 'chasseur', description: 'Un chasseur', team: TeamType.village, color: 'BLEU', isUnique: true }, 4),
  createMockRole({ name: 'Le Boulet', shortName: 'Boulet', slug: 'boulet', description: 'Un boulet', team: TeamType.village, color: 'BLEU', isUnique: true }, 5)
]

// Mock complet du state
const createMockState = (players = mockPlayers) => ({
  // PlayerSlice
  players,
  lastAddedIndex: players.length - 1,
  addPlayer: () => {},
  removePlayer: () => {},
  updatePlayerName: () => {},
  getValidPlayersCount: () => players.length,

  // RoleSlice
  roles: mockRoles,
  rolesLoaded: true,
  useDefaultRoles: true,
  toggleDefaultRoles: () => {},
  selectedRoles: {
    loup: { role: mockRoles.find(r => r.slug === 'loup')!, count: 2 },
    villageois: { role: mockRoles.find(r => r.slug === 'villageois')!, count: 5 },
    medecin: { role: mockRoles.find(r => r.slug === 'medecin')!, count: 1 },
    chasseur: { role: mockRoles.find(r => r.slug === 'chasseur')!, count: 1 },
    boulet: { role: mockRoles.find(r => r.slug === 'boulet')!, count: 1 }
  },
  fetchRoles: async () => {},
  incRoleCount: () => {},
  decRoleCount: () => {},
  getRole: (slug: string) => mockRoles.find(r => r.slug === slug),
  getTotalSelectedRoles: () => 10,
  playerRoles: [],
  isPlayersAndRolesEqual: true,
  randomRolesAttribution: () => {},
  updateIsPlayersAndRolesEqual: () => {},

  // GameSlice
  steps: [],
  game: {
    currentStep: 0,
    messages: []
  },
  gameStepsLoaded: false,
  nextGameStep: () => {},
  getGameSteps: () => [],
  startGame: () => {},

  // AppSlice
  error: null,
  setError: () => {}
})

// Mock du StoreApi
const createMockStore = (initialState: AppState): StoreApi<AppState> => {
  const state = { ...initialState }
  return {
    setState: (partial, replace) => {
      const newState = replace 
        ? (typeof partial === 'function' ? partial(state) : partial) as AppState 
        : { ...state, ...(typeof partial === 'function' ? partial(state) : partial) }
      
      // Mise à jour de l'état interne du store
      Object.assign(state, newState)
      
      console.log('setState appelée, nouvel état:', state)
    },
    getState: () => state,
    getInitialState: () => initialState,
    subscribe: () => () => {}
  }
}

describe('roleSlice', () => {
  describe('randomRolesAttribution', () => {
    test('attribue correctement les rôles aux joueurs', () => {
      const mockState = createMockState()
      const store = createMockStore(mockState)
      
      // Espionner la fonction setState
      const setStateSpy = jest.spyOn(store, 'setState')
      
      // Créer une instance du slice avec le mock state
      const slice = {
        ...store.getState(),
        ...createRoleSlice(
          store.setState,
          store.getState,
          store
        )
      }

      // Appeler la fonction
      slice.randomRolesAttribution()

      // Vérifier que setState a été appelée
      expect(setStateSpy).toHaveBeenCalled()

      // Récupérer l'état mis à jour
      const updatedState = store.getState()
      console.log('State après randomRolesAttribution:', updatedState)
      console.log('playerRoles:', updatedState.playerRoles)

      // Vérifier que le nombre de rôles attribués est correct
      expect(updatedState.playerRoles).toHaveLength(10)

      // Vérifier que chaque joueur a un rôle
      const playerNames = updatedState.playerRoles.map(pr => pr.player)
      expect(playerNames).toEqual(expect.arrayContaining(mockPlayers))

      // Vérifier que le nombre de chaque rôle est correct
      const loupCount = updatedState.playerRoles.filter(pr => pr.role.slug === 'loup').length
      const villageoisCount = updatedState.playerRoles.filter(pr => pr.role.slug === 'villageois').length
      const medecinCount = updatedState.playerRoles.filter(pr => pr.role.slug === 'medecin').length
      const chasseurCount = updatedState.playerRoles.filter(pr => pr.role.slug === 'chasseur').length
      const bouletCount = updatedState.playerRoles.filter(pr => pr.role.slug === 'boulet').length
      
      expect(loupCount).toBe(2)
      expect(villageoisCount).toBe(5)
      expect(medecinCount).toBe(1)
      expect(chasseurCount).toBe(1)
      expect(bouletCount).toBe(1)
    })

    test('gère le cas où il y a plus de joueurs que de rôles', () => {
      // Version simplifiée sans dépendre du mélange aléatoire
      const extraPlayers = ['Joueur 1', 'Joueur 2', 'Joueur 3', 'Joueur 4', 'Joueur 5', 'Joueur 6', 
                            'Joueur 7', 'Joueur 8', 'Joueur 9', 'Joueur 10', 'Joueur 11', 'Joueur 12']
      const mockState = createMockState(extraPlayers)
      const store = createMockStore(mockState)
      const slice = {
        ...store.getState(),
        ...createRoleSlice(
          store.setState,
          store.getState,
          store
        )
      }

      slice.randomRolesAttribution()

      const updatedState = store.getState()
      // Vérifier que le nombre de rôles attribués correspond au nombre de rôles disponibles (10)
      expect(updatedState.playerRoles).toHaveLength(10)
      
      // Vérifier que tous les joueurs dans playerRoles sont dans la liste originale
      const playerNames = updatedState.playerRoles.map(pr => pr.player)
      playerNames.forEach(name => {
        expect(extraPlayers).toContain(name)
      })

      // Vérifier qu'il y a moins de joueurs dans playerRoles que dans la liste originale
      expect(playerNames.length).toBeLessThan(extraPlayers.length)
    })

    test('playerRoles contient tous les noms des joueurs', () => {
      const mockState = createMockState()
      const store = createMockStore(mockState)
      const slice = {
        ...store.getState(),
        ...createRoleSlice(
          store.setState,
          store.getState,
          store
        )
      }

      slice.randomRolesAttribution()

      const updatedState = store.getState()
      const assignedPlayers = updatedState.playerRoles.map(pr => pr.player)
      
      // Vérifier que tous les joueurs originaux sont présents dans playerRoles
      mockPlayers.forEach(player => {
        expect(assignedPlayers).toContain(player)
      })
    })
  })
}) 