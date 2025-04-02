import type { StateCreator } from 'zustand'
import type { AppState } from '@/store/index'

export type Difficulty = 'very_easy' | 'easy' | 'medium' | 'hard' | 'very_hard' | 'expert'

export interface DifficultySlice {
  difficulty: Difficulty
  setDifficulty: (difficulty: Difficulty) => void
}

export const createDifficultySlice: StateCreator<AppState, [], [], DifficultySlice> = (set) => ({
  difficulty: 'medium',
  setDifficulty: (difficulty) => set({ difficulty }),
}) 