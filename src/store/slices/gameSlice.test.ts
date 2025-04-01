import { createGameSlice } from '@/store/slices/gameSlice'
import type { StoreApi } from 'zustand'
import { createMockRole } from '@/data/rolesData'
import { TeamType } from '@prisma/client'
import type { AppState } from '@/store/index'
import type { GameStep } from '@prisma/client'
import { create } from 'zustand'

// Mocker la fonction shuffle pour avoir un comportement déterministe
jest.mock('@/lib/utils', () => ({
  shuffle: <T>(array: T[]) => [...array], // Retourne une copie sans mélanger
}))

// Mock des données
const mockPlayers = ['Alice', 'Bob', 'Charlie']
const mockRoles = [
  createMockRole({ name: 'Le Loup', shortName: 'Loup', slug: 'loup', description: 'Un loup', team: TeamType.loup, color: 'ROUGE', isUnique: false }, 1),
  createMockRole({ name: 'Le Villageois', shortName: 'Villageois', slug: 'villageois', description: 'Un villageois', team: TeamType.village, color: 'BLEU', isUnique: false }, 2),
  createMockRole({ name: 'Le Médecin', shortName: 'Médecin', slug: 'medecin', description: 'Un médecin', team: TeamType.village, color: 'BLEU', isUnique: true }, 3),
]

// Mock du state initial
const createMockState = (players = mockPlayers): AppState => ({
  // PlayerSlice
  players,
  addPlayer: () => {},
  removePlayer: () => {},
  updatePlayerName: () => {},
  getValidPlayersCount: () => players.length,

  // RoleSlice
  roles: mockRoles,
  rolesLoaded: true,
  useDefaultRoles: true,
  selectedRoles: {
    loup: { role: mockRoles[0], count: 1 },
    villageois: { role: mockRoles[1], count: 1 },
    medecin: { role: mockRoles[2], count: 1 }
  },
  fetchRoles: async () => {},
  incRoleCount: () => {},
  decRoleCount: () => {},
  getRole: () => undefined,
  getTotalSelectedRoles: () => 3,
  playerRoles: [],
  isPlayersAndRolesEqual: true,
  randomRolesAttribution: () => {},
  updateIsPlayersAndRolesEqual: () => {},
  toggleDefaultRoles: () => {},

  // GameSlice
  steps: [],
  game: {
    currentStep: 0,
    messages: []
  },
  gameStepsLoaded: false,
  nextGameStep: () => {},
  getGameSteps: async () => Promise.resolve(),
  startGame: () => {},

  // AppSlice
  error: null,
  setError: () => {}
})

describe('gameSlice', () => {
  let store: StoreApi<AppState>

  beforeEach(() => {
    store = create<AppState>(() => createMockState())
  })

  describe('startGame', () => {
    it('initialise le jeu avec le bon état', () => {
      const gameSlice = createGameSlice(store.setState, store.getState, store)
      gameSlice.startGame()
      expect(store.getState().game.currentStep).toBe(-1)
      expect(store.getState().game.messages).toHaveLength(0)
    })
  })

  describe('nextGameStep', () => {
    it('passe à l\'étape suivante', () => {
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
      
      store.setState({ steps: mockSteps })
      const gameSlice = createGameSlice(store.setState, store.getState, store)
      gameSlice.nextGameStep()
      
      const state = store.getState()
      expect(state.game.currentStep).toBe(1)
      expect(state.game.messages).toHaveLength(2)
      expect(state.game.messages[0].content).toBe('Étape 2')
      expect(state.game.messages[1].content).toBe('Message 2')
    })
  })

  describe('getGameSteps', () => {
    it('charge les étapes du jeu', async () => {
      const gameSlice = createGameSlice(store.setState, store.getState, store)
      await gameSlice.getGameSteps()
      expect(store.getState().gameStepsLoaded).toBe(true)
    })
  })
}) 