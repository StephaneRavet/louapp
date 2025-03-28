import type { StateCreator } from 'zustand'
import type { Player } from '@/types/Player.type'
import type { Role, GameStep } from '@prisma/client'
import type { AppState } from '@/store/index'
import { queryAPI } from '@/lib/queryAPI'

export type PlayerRole = {
  player: Player;
  role: Role;
}

export type Message = {
  content: string
}

export type Game = {
  currentStep: number
  messages: Message[]
}


export interface GameSlice {
  // État
  steps: GameStep[]
  game: Game
  gameStepsLoaded: boolean

  // Actions
  startGame: () => void
  nextGameStep: () => void
  getGameSteps: () => void
}

export const createGameSlice: StateCreator<AppState, [], [], GameSlice> = (set, get) => ({
  steps: [],
  game: {
    currentStep: 0,
    messages: []
  },
  gameStepsLoaded: false,

  startGame: () => {
    set({ game: { currentStep: -1, messages: [] } })
  },
  nextGameStep: () => {
    set((state: GameSlice) => {
      const currentStep = state.game.currentStep + 1 === state.steps.length ? 0 : state.game.currentStep + 1
      const message1 = state.steps[currentStep].name
      const message2 = state.steps[currentStep].sentence
      return {
        ...state,
        game: { currentStep, messages: [...state.game.messages, { content: message1 }, { content: message2 }] }
      }
    })
  },
  getGameSteps: async () => {
    const { setError } = get()
    const steps = await queryAPI<GameStep[]>('gameSteps', setError)
    set({ steps })
    set({ gameStepsLoaded: true })
  },
})