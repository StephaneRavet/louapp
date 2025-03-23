import type { Role } from '@prisma/client'
import type { StateCreator } from 'zustand'
import type { GameState } from '../types'

export interface RoleSlice {
  // État
  roles: Role[]
  selectedRoles: Record<string, number>
  loading: boolean
  error: string | null

  // Actions
  fetchRoles: () => Promise<void>
  incRoleCount: (roleSlug: string) => void
  decRoleCount: (roleSlug: string) => void

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

      const response = await fetch('/api/roles')
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }
      
      const data = await response.json()

      if (!data || data.length === 0) {
        throw new Error('Aucun rôle n\'a été récupéré')
      }

      // Mettre à jour les rôles
      set({ roles: data })

      // Initialiser les rôles par défaut
      const defaultRoles: Record<string, number> = data.reduce(
        (acc: Record<string, number>, role: Role) => ({ ...acc, [role.slug]: 0 }),
        {}
      )

      // Trouver le slug du rôle "Loup" et "Villageois"
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
        defaultRoles[loupRole.slug] = 3
      }

      // Définir le reste en villageois (nombre de joueurs - 3 loups)
      if (villageoisRole) {
        defaultRoles[villageoisRole.slug] = get().players.length - (loupRole ? 3 : 0)
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

  incRoleCount: (roleSlug: string) => {
    set((state) => ({
      selectedRoles: { ...state.selectedRoles, [roleSlug]: state.selectedRoles[roleSlug] + 1 }
    }))
  },

  decRoleCount: (roleSlug: string) => {
    set((state) => ({
      selectedRoles: { 
        ...state.selectedRoles, 
        [roleSlug]: Math.max(0, state.selectedRoles[roleSlug] - 1)
      }
    }))
  },

  // Sélecteurs
  getTotalRoles: () => {
    return Object.values(get().selectedRoles).reduce((sum, count) => sum + count, 0)
  },
}) 