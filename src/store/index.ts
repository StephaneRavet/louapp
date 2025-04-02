'use client'

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createPlayerSlice } from '@/store/slices/playerSlice'
import { createRoleSlice } from '@/store/slices/roleSlice'
import { createGameSlice } from '@/store/slices/gameSlice'
import { createAppSlice } from '@/store/slices/appSlice'
import { createDifficultySlice } from '@/store/slices/difficultySlice'
import type { PlayerSlice } from '@/store/slices/playerSlice'
import type { RoleSlice } from '@/store/slices/roleSlice'
import type { GameSlice } from '@/store/slices/gameSlice'
import type { AppSlice } from '@/store/slices/appSlice'
import type { DifficultySlice } from '@/store/slices/difficultySlice'

// Le type complet du store qui combine tous les slices
export type AppState = AppSlice & PlayerSlice & RoleSlice & GameSlice & DifficultySlice

// Création du store avec tous les slices combinés et le middleware devtools
export const useAppStore = create<AppState>()(
  devtools(
    (...args) => ({
      ...createPlayerSlice(...args),
      ...createRoleSlice(...args),
      ...createGameSlice(...args),
      ...createAppSlice(...args),
      ...createDifficultySlice(...args),
    }),
    { name: 'AppStore' } // Nom affiché dans les devtools
  )
)

// Initialisation des data dès l'importation du store
useAppStore.getState().fetchRoles() 
useAppStore.getState().getGameSteps() 