import type { StateCreator } from 'zustand'
import type { GameState } from '../types'
import type { Player } from '@/types/Player.type'

// Type pour l'association rôle-joueur
export type PlayerRole = {
  roleId: number;
  player: Player;
}

export interface GameSlice {
  // État
  playerRoles: PlayerRole[];
  
  // Actions
  startGame: () => void,
  randomRolesAttribution: () => void,
}

export const createGameSlice: StateCreator<GameState, [], [], GameSlice> = (set, get) => ({
  playerRoles: [],
  
  randomRolesAttribution: () => {
    const { players, selectedRoles, playerRoles, roles } = get()
    console.log('Joueurs:', players)
    console.log('Rôles sélectionnés:', selectedRoles)
    
    if (playerRoles.length === 0 && players.length > 0) {
      // Copier les joueurs pour les mélanger
      const shuffledPlayers = [...players].sort(() => Math.random() - 0.5)
      
      // Créer la liste des rôles à attribuer basée sur selectedRoles
      const rolesToAssign: number[] = []
      Object.entries(selectedRoles).forEach(([roleId, count]) => {
        for (let i = 0; i < count; i++) {
          rolesToAssign.push(parseInt(roleId))
        }
      })
      
      // Mélanger les rôles
      const shuffledRoles = [...rolesToAssign].sort(() => Math.random() - 0.5)
      
      // Créer les associations rôle-joueur
      const newPlayerRoles: PlayerRole[] = []
      for (let i = 0; i < Math.min(shuffledPlayers.length, shuffledRoles.length); i++) {
        newPlayerRoles.push({
          roleId: shuffledRoles[i],
          player: shuffledPlayers[i]
        })
      }
      
      // Mettre à jour l'état
      set({ playerRoles: newPlayerRoles })
    }
  },
  startGame: () => {
    const { players, selectedRoles } = get()
    console.log('Joueurs:', players)
    console.log('Rôles sélectionnés:', selectedRoles)
  },

}) 