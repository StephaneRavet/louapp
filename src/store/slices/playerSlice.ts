import type { Player } from '@/types/Player.type'
import type { StateCreator } from 'zustand'
import type { AppState } from '@/store/index'
import { FEATURES } from '@/config/config'

export type PlayerSlice = {
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

export const createPlayerSlice: StateCreator<AppState, [], [], PlayerSlice> = (set, get) => ({
  // État initial
  players: FEATURES.AUTO_INIT ? Array.from({ length: FEATURES.DEFAULT_PLAYERS_COUNT }, (_, i) => `Joueur ${i+1}`) : [],
  lastAddedIndex: FEATURES.AUTO_INIT ? FEATURES.DEFAULT_PLAYERS_COUNT - 1 : -1,
  
  // Actions
  addPlayer: () => {
    const { players } = get()
    const lastPlayer = players[players.length - 1]
    if (!lastPlayer.trim()) return
    
    set({ 
      players: [...players, ''],
      lastAddedIndex: players.length
    })
    get().updateIsPlayersAndRolesEqual()
  },
  
  removePlayer: (index) => {
    const { players } = get()
    if (players.length > 1) {
      set({ players: players.filter((_, i) => i !== index) })
      get().updateIsPlayersAndRolesEqual()
    }
  },
  
  updatePlayerName: (index, name) => {
    const { players } = get()
    set({
      players: players.map((player, i) => i === index ? name : player)
    })
    get().updateIsPlayersAndRolesEqual()
  },
  
  // Sélecteurs
  getValidPlayersCount: () => {
    return get().players.filter(p => p.trim()).length
  },
}) 