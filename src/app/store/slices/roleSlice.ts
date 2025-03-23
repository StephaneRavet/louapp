import type { Role } from '@prisma/client'
import type { StateCreator } from 'zustand'
import type { GameState } from '../types'

export interface RoleSlice {
  // État
  roles: Role[]
  selectedRoles: Record<string, {role: Role, count: number}>
  loading: boolean
  error: string | null

  // Actions
  fetchRoles: () => Promise<void>
  incRoleCount: (roleSlug: string) => void
  decRoleCount: (roleSlug: string) => void
  getRole: (roleSlug: string) => Role | undefined

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
      const defaultRoles: Record<string, {role: Role, count: number}> = data.reduce(
        (acc: Record<string, {role: Role, count: number}>, role: Role) => ({ 
          ...acc, 
          [role.slug]: {role, count: 0}
        }),
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
        defaultRoles[loupRole.slug].count = 3
      }

      // Définir le reste en villageois (nombre de joueurs - 3 loups)
      if (villageoisRole) {
        defaultRoles[villageoisRole.slug].count = get().players.length - (loupRole ? 3 : 0)
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
      selectedRoles: { 
        ...state.selectedRoles, 
        [roleSlug]: {
          ...state.selectedRoles[roleSlug],
          count: state.selectedRoles[roleSlug].count + 1
        }
      }
    }))
  },

  decRoleCount: (roleSlug: string) => {
    set((state) => ({
      selectedRoles: { 
        ...state.selectedRoles, 
        [roleSlug]: {
          ...state.selectedRoles[roleSlug],
          count: Math.max(0, state.selectedRoles[roleSlug].count - 1)
        }
      }
    }))
  },

  // Sélecteurs
  getTotalRoles: () => {
    return Object.values(get().selectedRoles).reduce((sum, item) => sum + item.count, 0)
  },

  getRole: (roleSlug: string) => {
    return get().roles.find((r: Role) => r.slug === roleSlug)
  },
}) 