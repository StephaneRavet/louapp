import type { StateCreator } from 'zustand'
import type { AppState } from '@/store/index'
import { fetchDifficultiesDirect } from '@/lib/queries'
import type { Difficulty } from '@/types/difficulty'

export interface DifficultySlice {
  // État
  difficulties: Difficulty[]
  difficulty: string
  difficultiesLoaded: boolean

  // Actions
  fetchDifficulties: () => Promise<void>
  setDifficulty: (difficulty: string) => void
}

export const createDifficultySlice: StateCreator<AppState, [], [], DifficultySlice> = (set) => ({
  // État initial
  difficulties: [],
  difficulty: 'medium',
  difficultiesLoaded: false,

  // Actions
  fetchDifficulties: async () => {
    const difficulties = await fetchDifficultiesDirect()
    set({ difficulties, difficultiesLoaded: true })
  },

  setDifficulty: (difficulty: string) => {
    set({ difficulty })
  }
}) 