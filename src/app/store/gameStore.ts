'use client'

import { create } from 'zustand'
import type { GameState } from './types'
import { createPlayerSlice } from './slices/playerSlice'
import { createRoleSlice } from './slices/roleSlice'
import { createGameSlice } from './slices/gameSlice'

// Création du store avec tous les slices combinés
export const useGameStore = create<GameState>()((...args) => ({
  ...createPlayerSlice(...args),
  ...createRoleSlice(...args),
  ...createGameSlice(...args),
})) 