import type { StateCreator } from 'zustand'
import type { Player } from '@/types/Player.type'
import type { Role, GameStep } from '@prisma/client'
import type { AppState } from '@/store/index'
import { queryAPI } from '@/lib/queryAPI'

export type PlayerRole = {
  player: Player;
  role: Role;
}

export type Game = {
  currentStep: number
}

export interface GameSlice {
  // État
  steps: GameStep[]
  game: Game

  // Actions
  startGame: () => void
  nextGameStep: () => void
  getGameStep: () => void
}

export const createGameSlice: StateCreator<AppState, [], [], GameSlice> = (set, get) => ({
  steps: [],
  game: {
    currentStep: 0,
  },
  startGame: () => {
    set((state: GameSlice) => ({ ...state, game: { currentStep: 1 } }))
  },
  nextGameStep: () => {
    set((state: AppState) => {
      const currentStep = state.game.currentStep === state.steps.length ? 1 : state.game.currentStep + 1
      return {
        ...state,
        game: { currentStep }
      }
    })
  },
  getGameStep: async () => {
    const { setError } = get()
    const steps = await queryAPI<GameStep[]>('gameSteps', setError)
    set({ steps })
  },
})