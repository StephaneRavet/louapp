import { createGameSlice } from '@/app/store/slices/gameSlice'
import type { StoreApi } from 'zustand'
import type { GameState } from '@/app/store/types'
import { mockRoles } from '@/data/rolesData'

// Mocker la fonction shuffle pour avoir un comportement déterministe
jest.mock('@/lib/utils', () => ({
  shuffle: (array: any[]) => [...array], // Retourne une copie sans mélanger
}))

// Mock des données de test
const mockPlayers = [
  'Joueur 1', 'Joueur 2', 'Joueur 3', 'Joueur 4',
  'Joueur 5', 'Joueur 6', 'Joueur 7', 'Joueur 8',
  'Joueur 9', 'Joueur 10'
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
  selectedRoles: {
    loup: { role: mockRoles.find(r => r.slug === 'loup')!, count: 2 },
    villageois: { role: mockRoles.find(r => r.slug === 'villageois')!, count: 5 },
    voyante: { role: mockRoles.find(r => r.slug === 'voyante')!, count: 1 },
    chasseur: { role: mockRoles.find(r => r.slug === 'chasseur')!, count: 1 },
    sorciere: { role: mockRoles.find(r => r.slug === 'sorciere')!, count: 1 }
  },
  loading: false,
  error: null,
  fetchRoles: async () => {},
  incRoleCount: () => {},
  decRoleCount: () => {},
  getRole: (slug: string) => mockRoles.find(r => r.slug === slug),
  getTotalSelectedRoles: () => 10,

  // GameSlice
  playerRoles: [],
  isRolesReady: true,
  isPlayersAndRolesEqual: true,
  startGame: () => {},
  randomRolesAttribution: () => {},
  ensureRolesLoaded: async () => {},
  updatePlayersAndRolesEqual: () => {}
})

// Mock du StoreApi
const createMockStore = (initialState: GameState): StoreApi<GameState> => {
  let state = { ...initialState }
  return {
    setState: (partial, replace) => {
      const newState = replace 
        ? (typeof partial === 'function' ? partial(state) : partial) as GameState 
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

describe('gameSlice', () => {
  describe('randomRolesAttribution', () => {
    test('attribue correctement les rôles aux joueurs', () => {
      const mockState = createMockState()
      const store = createMockStore(mockState)
      
      // Espionner la fonction setState
      const setStateSpy = jest.spyOn(store, 'setState')
      
      // Créer une instance du slice avec le mock state
      const slice = {
        ...store.getState(),
        ...createGameSlice(
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
      expect(loupCount).toBe(2)
      expect(villageoisCount).toBe(5)
    })

    test('gère le cas où il y a plus de joueurs que de rôles', () => {
      // Version simplifiée sans dépendre du mélange aléatoire
      const extraPlayers = ['Joueur 1', 'Joueur 2', 'Joueur 3', 'Joueur 4', 'Joueur 5', 'Joueur 6', 
                            'Joueur 7', 'Joueur 8', 'Joueur 9', 'Joueur 10', 'Joueur 11', 'Joueur 12']
      const mockState = createMockState(extraPlayers)
      const store = createMockStore(mockState)
      const slice = {
        ...store.getState(),
        ...createGameSlice(
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

    test('gère le cas où il y a plus de rôles que de joueurs', () => {
      // Seulement 2 joueurs mais 4 rôles disponibles
      const twoPlayers = ['Joueur 1', 'Joueur 2']
      const mockState = createMockState(twoPlayers)
      const store = createMockStore(mockState)
      const slice = {
        ...store.getState(),
        ...createGameSlice(
          store.setState,
          store.getState,
          store
        )
      }

      slice.randomRolesAttribution()

      const updatedState = store.getState()
      // Vérifier que le nombre de rôles attribués correspond au nombre de joueurs (2)
      expect(updatedState.playerRoles).toHaveLength(2)
      
      // Vérifier que chaque joueur a exactement un rôle
      const playersWithRoles = updatedState.playerRoles.map(pr => pr.player)
      expect(playersWithRoles.sort()).toEqual(twoPlayers.sort())
    })

    test('playerRoles contient tous les noms des joueurs', () => {
      const mockState = createMockState()
      const store = createMockStore(mockState)
      const slice = {
        ...store.getState(),
        ...createGameSlice(
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

    test('attribue correctement les rôles spéciaux', () => {
      const mockState = createMockState()
      const store = createMockStore(mockState)
      const slice = {
        ...store.getState(),
        ...createGameSlice(
          store.setState,
          store.getState,
          store
        )
      }

      slice.randomRolesAttribution()

      const updatedState = store.getState()
      
      // Vérifier que les rôles spéciaux sont attribués correctement
      const voyanteCount = updatedState.playerRoles.filter(pr => pr.role.slug === 'voyante').length
      const chasseurCount = updatedState.playerRoles.filter(pr => pr.role.slug === 'chasseur').length
      const sorciereCount = updatedState.playerRoles.filter(pr => pr.role.slug === 'sorciere').length
      
      expect(voyanteCount).toBe(1)
      expect(chasseurCount).toBe(1)
      expect(sorciereCount).toBe(1)
      
      // Vérifier que le total des rôles correspond aux rôles sélectionnés
      expect(voyanteCount + chasseurCount + sorciereCount + 
             updatedState.playerRoles.filter(pr => pr.role.slug === 'loup').length +
             updatedState.playerRoles.filter(pr => pr.role.slug === 'villageois').length)
        .toBe(10)
    })
  })
}) 