import type { StateCreator } from 'zustand'
import type { Player } from '@/types/Player.type'
import type { Role, GameStep } from '@prisma/client'
import type { AppState } from '@/store/index'
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
    set((state: AppState) => ({ ...state, game: { currentStep: state.game.currentStep + 1 } }))
  },
  getGameStep: async () => {
    try {
      const response = await fetch('/api/gameSteps')
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }
      const data = await response.json()
      if (!data || data.length === 0) {
        throw new Error('Aucun rôle n\'a été récupéré')
      }
      set({ steps: data })
    } catch (err) {
      console.error('Erreur:', err)
      set({
        error: 'Impossible de charger les steps',
        loading: false
      })
    }
  },
})