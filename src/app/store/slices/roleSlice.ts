import type { Role } from '@prisma/client'
import type { StateCreator } from 'zustand'
import type { GameState } from '../types'
import { getRoles } from '@/app/actions/roleActions'

export interface RoleSlice {
  // État
  roles: Role[]
  selectedRoles: Record<number, number>
  loading: boolean
  error: string | null
  
  // Actions
  fetchRoles: () => Promise<void>
  updateRoleCount: (roleId: number, count: number) => void
  
  // Sélecteurs
  getTotalRoles: () => number
}

export const createRoleSlice: StateCreator<GameState, [], [], RoleSlice> = (set, get) => ({
  // État initial
  roles: [],
  selectedRoles: {},
  loading: true,
  error: null,
  
  // Actions
  fetchRoles: async () => {
    try {
      set({ loading: true })
      
      // Utilisation de l'action serveur
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
  
  updateRoleCount: (roleId, count) => {
    if (count >= 0) {
      set((state) => ({
        selectedRoles: { ...state.selectedRoles, [roleId]: count }
      }))
    }
  },
  
  // Sélecteurs
  getTotalRoles: () => {
    return Object.values(get().selectedRoles).reduce((sum, count) => sum + count, 0)
  },
}) 