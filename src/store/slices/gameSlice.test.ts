import { createGameSlice } from '@/store/slices/gameSlice'
import type { StoreApi } from 'zustand'
import { createMockRole } from '@/data/rolesData'
import { TeamType } from '@prisma/client'
import type { AppState } from '@/store/index'
import type { GameStep } from '@prisma/client'
import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './gameSlice'

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
const createMockState = (players = mockPlayers): AppState => ({
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

  // GameSlice
  steps: [] as GameStep[],
  game: {
    currentStep: 0,
    messages: []
  },
  gameStepsLoaded: false,
  nextGameStep: () => {},
  getGameSteps: () => [],
  playerRoles: [],
  isPlayersAndRolesEqual: true,
  startGame: () => {},
  randomRolesAttribution: () => {},
  updateIsPlayersAndRolesEqual: () => {},

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

describe('gameSlice', () => {
  let store: ReturnType<typeof configureStore>

  beforeEach(() => {
    store = configureStore({
      reducer: {
        game: gameReducer,
      },
    })
  })

  describe('startGame', () => {
    test('initialise le jeu avec le bon état', () => {
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

      slice.startGame()

      const updatedState = store.getState()
      expect(updatedState.game.currentStep).toBe(-1)
      expect(updatedState.game.messages).toHaveLength(0)
    })
  })

  describe('nextGameStep', () => {
    test('passe à l\'étape suivante du jeu', () => {
      const mockState = createMockState()
      const mockSteps: GameStep[] = [
        { 
          id: 1, 
          name: 'Étape 1', 
          slug: 'etape1', 
          sentence: 'Message 1', 
          orderIndex: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { 
          id: 2, 
          name: 'Étape 2', 
          slug: 'etape2', 
          sentence: 'Message 2', 
          orderIndex: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      mockState.steps = mockSteps
      mockState.game.currentStep = 0

      const store = createMockStore(mockState)
      const slice = {
        ...store.getState(),
        ...createGameSlice(
          store.setState,
          store.getState,
          store
        )
      }

      slice.nextGameStep()

      const updatedState = store.getState()
      expect(updatedState.game.currentStep).toBe(1)
      expect(updatedState.game.messages).toHaveLength(2)
      expect(updatedState.game.messages[0].content).toBe('Étape 2')
      expect(updatedState.game.messages[1].content).toBe('Message 2')
    })

    test('revient au début quand on atteint la fin', () => {
      const mockState = createMockState()
      const mockSteps: GameStep[] = [
        { 
          id: 1, 
          name: 'Étape 1', 
          slug: 'etape1', 
          sentence: 'Message 1', 
          orderIndex: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { 
          id: 2, 
          name: 'Étape 2', 
          slug: 'etape2', 
          sentence: 'Message 2', 
          orderIndex: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      mockState.steps = mockSteps
      mockState.game.currentStep = 1

      const store = createMockStore(mockState)
      const slice = {
        ...store.getState(),
        ...createGameSlice(
          store.setState,
          store.getState,
          store
        )
      }

      slice.nextGameStep()

      const updatedState = store.getState()
      expect(updatedState.game.currentStep).toBe(0)
    })
  })

  describe('getGameSteps', () => {
    test('charge les étapes du jeu', async () => {
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

      // Mock de queryAPI
      jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          statusText: 'OK',
          json: () => Promise.resolve([
            { 
              id: 1, 
              name: 'Étape 1', 
              slug: 'etape1', 
              sentence: 'Message 1', 
              orderIndex: 0,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            { 
              id: 2, 
              name: 'Étape 2', 
              slug: 'etape2', 
              sentence: 'Message 2', 
              orderIndex: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ] as GameStep[])
        }) as Promise<Response>
      )

      await slice.getGameSteps()

      const updatedState = store.getState()
      expect(updatedState.steps).toHaveLength(2)
      expect(updatedState.gameStepsLoaded).toBe(true)
    })
  })

  it('should handle randomRolesAttribution', () => {
    const initialState = store.getState().game
    const result = gameReducer(initialState, {
      type: 'game/randomRolesAttribution',
      payload: ['player1', 'player2'],
    })
    expect(result.playerRoles).toHaveLength(2)
  })
}) 