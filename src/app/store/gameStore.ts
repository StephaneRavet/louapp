'use client'

import { create } from 'zustand'
import type { Player } from '@/types/Player.type'
import type { Role } from '@prisma/client'
import { getRoles } from '@/app/actions/roleActions'

interface GameState {
  // État
  roles: Role[]
  players: Player[]
  selectedRoles: Record<number, number>
  lastAddedIndex: number
  loading: boolean
  error: string | null
  
  // Actions
  fetchRoles: () => Promise<void>
  addPlayer: () => void
  removePlayer: (index: number) => void
  updatePlayerName: (index: number, name: string) => void
  updateRoleCount: (roleId: number, count: number) => void
  startGame: () => void
  
  // Getters (sélecteurs)
  getTotalRoles: () => number
  getValidPlayersCount: () => number
}

export const useGameStore = create<GameState>((set, get) => ({
  // État initial
  roles: [],
  players: Array.from({ length: 10 }, (_, i) => `joueur${i}`),
  selectedRoles: {},
  lastAddedIndex: 0,
  loading: true,
  error: null,
  
  // Actions
  fetchRoles: async () => {
    try {
      set({ loading: true })
      
      // Utilisation de l'action serveur au lieu de fetch
      const data = await getRoles()
      
      if (!data || data.length === 0) {
        throw new Error('Aucun rôle n\'a été récupéré')
      }
      
      // Mettre à jour les rôles
      set({ roles: data })
      
      // Initialiser les rôles par défaut
      const defaultRoles: Record<number, number> = data.reduce(
        (acc: Record<number, number>, role: Role) => ({ ...acc, [role.id]: 0 }), 
        {}
      )
      
      // Trouver l'ID du rôle "Loup" et "Villageois"
      const loupRole = data.find((r: Role) => 
        r.slug === 'loup' || 
        r.name.toLowerCase().includes('loup')
      )
      const villageoisRole = data.find((r: Role) => 
        r.slug === 'villageois' || 
        r.name.toLowerCase().includes('villageois')
      )
      
      // Définir 3 loups
      if (loupRole) {
        defaultRoles[loupRole.id] = 3
      }
      
      // Définir le reste en villageois (nombre de joueurs - 3 loups)
      if (villageoisRole) {
        defaultRoles[villageoisRole.id] = get().players.length - (loupRole ? 3 : 0)
      }
      
      set({ 
        selectedRoles: defaultRoles,
        error: null,
        loading: false
      })
    } catch (err) {
      console.error('Erreur:', err)
      set({ 
        error: 'Impossible de charger les rôles',
        loading: false
      })
    }
  },
  
  addPlayer: () => {
    const { players } = get()
    const lastPlayer = players[players.length - 1]
    if (!lastPlayer.trim()) return
    
    set({ 
      players: [...players, ''],
      lastAddedIndex: players.length
    })
  },
  
  removePlayer: (index) => {
    const { players } = get()
    if (players.length > 1) {
      set({ players: players.filter((_, i) => i !== index) })
    }
  },
  
  updatePlayerName: (index, name) => {
    const { players } = get()
    set({
      players: players.map((player, i) => i === index ? name : player)
    })
  },
  
  updateRoleCount: (roleId, count) => {
    if (count >= 0) {
      set((state) => ({
        selectedRoles: { ...state.selectedRoles, [roleId]: count }
      }))
    }
  },
  
  startGame: () => {
    const { players, selectedRoles } = get()
    console.log('Joueurs:', players)
    console.log('Rôles sélectionnés:', selectedRoles)
  },
  
  // Sélecteurs
  getTotalRoles: () => {
    return Object.values(get().selectedRoles).reduce((sum, count) => sum + count, 0)
  },
  
  getValidPlayersCount: () => {
    return get().players.filter(p => p.trim()).length
  }
})) 