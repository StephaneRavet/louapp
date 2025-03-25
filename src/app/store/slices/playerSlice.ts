import type { Player } from '@/types/Player.type'
import type { StateCreator } from 'zustand'
import type { GameState } from '../types'

export interface PlayerSlice {
  // État
  players: Player[]
  lastAddedIndex: number
  
  // Actions
  addPlayer: () => void
  removePlayer: (index: number) => void
  updatePlayerName: (index: number, name: string) => void
  
  // Sélecteurs
  getValidPlayersCount: () => number
}

export const createPlayerSlice: StateCreator<GameState, [], [], PlayerSlice> = (set, get) => ({
  // État initial
  players: [''], // Array.from({ length: 8 }, (_, i) => `Joueur${i}`),
  lastAddedIndex: 0,
  
  // Actions
  addPlayer: () => {
    const { players } = get()
    const lastPlayer = players[players.length - 1]
    if (!lastPlayer.trim()) return
    
    set({ 
      players: [...players, ''],
      lastAddedIndex: players.length
    })
    get().updatePlayersAndRolesEqual()
  },
  
  removePlayer: (index) => {
    const { players } = get()
    if (players.length > 1) {
      set({ players: players.filter((_, i) => i !== index) })
      get().updatePlayersAndRolesEqual()
    }
  },
  
  updatePlayerName: (index, name) => {
    const { players } = get()
    set({
      players: players.map((player, i) => i === index ? name : player)
    })
    get().updatePlayersAndRolesEqual()
  },
  
  // Sélecteurs
  getValidPlayersCount: () => {
    return get().players.filter(p => p.trim()).length
  },
}) 