'use client'

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { GameState } from './types'
import { createPlayerSlice } from './slices/playerSlice'
import { createRoleSlice } from './slices/roleSlice'
import { createGameSlice } from './slices/gameSlice'

// Création du store avec tous les slices combinés et le middleware devtools
export const useGameStore = create<GameState>()(
  devtools(
    (...args) => ({
      ...createPlayerSlice(...args),
      ...createRoleSlice(...args),
      ...createGameSlice(...args),
    }),
    { name: 'GameStore' } // Nom affiché dans les devtools
  )
)

// Initialisation des rôles dès l'importation du store
useGameStore.getState().fetchRoles() 