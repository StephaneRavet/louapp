import type { StateCreator } from 'zustand'
import type { GameState } from '../types'

export interface GameSlice {
  // Actions
  startGame: () => void
}

export const createGameSlice: StateCreator<GameState, [], [], GameSlice> = (set, get) => ({
  // Actions
  startGame: () => {
    const { players, selectedRoles } = get()
    console.log('Joueurs:', players)
    console.log('Rôles sélectionnés:', selectedRoles)
    
    // Ici, vous pourriez naviguer vers la page de jeu ou soumettre les données à une API
  },
}) 