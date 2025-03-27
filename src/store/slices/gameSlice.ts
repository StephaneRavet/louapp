import type { StateCreator } from 'zustand'
import type { GameState } from '../types'
import type { Player } from '../../../types/Player.type'
import { Role } from '@prisma/client'

export type PlayerRole = {
  player: Player;
  role: Role;
}

export type Game = {
  currentStep: number
}

export interface GameSlice {
  // État
  game: Game;

  // Actions
  startGame: () => void,
  nextStep: () => void,
}

export const createGameSlice: StateCreator<GameState, [], [], GameSlice> = (set, get) => ({
  game: {
    currentStep: 0
  },
  startGame: () => {
    set((state) => ({ ...state, game: { currentStep: 1 } }))
  },
  nextStep: () => {
    set((state) => ({ ...state, game: { currentStep: state.game.currentStep + 1 } }))
  },
}) 