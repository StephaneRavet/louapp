import { create } from 'zustand'
import { createGameSlice } from './gameSlice'
import { createPlayerSlice } from './playerSlice'
import { createRoleSlice } from './roleSlice'
import { setMockData } from '@/lib/queries'
import type { AppState } from '@/store/index'

// Mocker la fonction shuffle pour avoir un comportement déterministe
jest.mock('@/lib/utils', () => ({
  shuffle: <T>(array: T[]) => [...array], // Retourne une copie sans mélanger
}))

const createMockState = (): AppState => ({
  error: null,
  setError: () => {},
  players: [],
  addPlayer: () => {},
  removePlayer: () => {},
  updatePlayerName: () => {},
  getValidPlayersCount: () => 0,
  roles: [],
  selectedRoles: {},
  rolesLoaded: false,
  useDefaultRoles: false,
  playerRoles: [],
  isPlayersAndRolesEqual: false,
  fetchRoles: async () => {},
  incRoleCount: () => {},
  decRoleCount: () => {},
  getRole: () => undefined,
  toggleDefaultRoles: () => {},
  randomRolesAttribution: () => {},
  updateIsPlayersAndRolesEqual: () => {},
  getTotalSelectedRoles: () => 0,
  steps: [],
  game: {
    currentStep: 0,
    messages: []
  },
  gameStepsLoaded: false,
  startGame: () => {},
  nextGameStep: () => {},
  getGameSteps: async () => {},
})

describe('GameSlice', () => {
  const useStore = create<AppState>((set, get, store) => ({
    ...createMockState(),
    ...createGameSlice(set, get, store),
    ...createPlayerSlice(set, get, store),
    ...createRoleSlice(set, get, store),
  }))

  beforeEach(() => {
    setMockData({
      gameSteps: [
        {
          id: 1,
          name: 'Test Step',
          sentence: 'Test Sentence',
          slug: 'test-step',
          orderIndex: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      roles: [],
      roleHooks: []
    })
  })

  describe('startGame', () => {
    it('initialise le jeu avec le bon état', () => {
      const gameSlice = createGameSlice(useStore.setState, useStore.getState, useStore)
      gameSlice.startGame()
      const state = useStore.getState()
      expect(state.game.currentStep).toBe(-1)
      expect(state.game.messages).toHaveLength(0)
    })
  })

  describe('getGameSteps', () => {
    it('charge les étapes du jeu', async () => {
      const gameSlice = createGameSlice(useStore.setState, useStore.getState, useStore)
      await gameSlice.getGameSteps()
      const state = useStore.getState()
      expect(state.gameStepsLoaded).toBe(true)
    })
  })
}) 