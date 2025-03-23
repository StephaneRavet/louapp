import type { StateCreator } from 'zustand'
import type { GameState } from '../types'
import type { Player } from '@/types/Player.type'

// Type pour l'association rôle-joueur
export type PlayerRole = {
  role: string;
  player: Player;
}

export interface GameSlice {
  // État
  playerRoles: PlayerRole[];
  isRolesReady: boolean;
  
  // Actions
  startGame: () => void,
  randomRolesAttribution: () => void,
  ensureRolesLoaded: () => Promise<void>,
}

export const createGameSlice: StateCreator<GameState, [], [], GameSlice> = (set, get) => ({
  playerRoles: [],
  isRolesReady: false,
  
  ensureRolesLoaded: async () => {
    const { roles, loading, fetchRoles } = get()
    
    // Si les rôles sont déjà chargés, on retourne immédiatement
    if (roles.length > 0 && !loading) {
      set({ isRolesReady: true })
      return
    }
    
    // Sinon, on attend que les rôles soient chargés
    await fetchRoles()
    set({ isRolesReady: true })
  },
  
  randomRolesAttribution: () => {
    const { players, selectedRoles, playerRoles } = get()
    
    if (playerRoles.length === 0 && players.length > 0) {
      // Copier les joueurs pour les mélanger
      const shuffledPlayers = [...players].sort(() => Math.random() - 0.5)
      
      // Créer la liste des rôles à attribuer basée sur selectedRoles
      const rolesToAssign: string[] = []
      Object.entries(selectedRoles).forEach(([role, count]) => {
        for (let i = 0; i < count; i++) {
          rolesToAssign.push(role)
        }
      })
      
      // Mélanger les rôles
      const shuffledRoles = [...rolesToAssign].sort(() => Math.random() - 0.5)
      
      // Créer les associations rôle-joueur
      const newPlayerRoles: PlayerRole[] = []
      for (let i = 0; i < Math.min(shuffledPlayers.length, shuffledRoles.length); i++) {
        newPlayerRoles.push({
          role: shuffledRoles[i],
          player: shuffledPlayers[i]
        })
      }
      
      // Mettre à jour l'état
      set({ playerRoles: newPlayerRoles })
    }
  },
  startGame: () => {
    const { players, selectedRoles } = get()
  },

}) 