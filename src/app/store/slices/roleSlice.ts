import type { Role } from '@prisma/client'
import type { StateCreator } from 'zustand'
import type { GameState } from '../types'
import { FEATURES } from '@/app/config'

export interface RoleSlice {
  // État
  roles: Role[]
  selectedRoles: Record<string, {role: Role, count: number}>
  loading: boolean
  error: string | null
  useDefaultRoles: boolean
  isRolesReady: boolean

  // Actions
  fetchRoles: () => Promise<void>
  incRoleCount: (roleSlug: string) => void
  decRoleCount: (roleSlug: string) => void
  getRole: (roleSlug: string) => Role | undefined
  toggleDefaultRoles: () => void

  // Sélecteurs
  getTotalSelectedRoles: () => number
}

export const createRoleSlice: StateCreator<GameState, [], [], RoleSlice> = (set, get) => ({
  // État initial
  roles: [],
  selectedRoles: {},
  loading: true,
  error: null,
  useDefaultRoles: FEATURES.AUTO_INIT,
  isRolesReady: false,

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

      // Si on utilise les rôles par défaut
      if (get().useDefaultRoles) {
        // Définir le nombre de loups selon la config
        if (loupRole) {
          defaultRoles[loupRole.slug].count = FEATURES.DEFAULT_WEREWOLVES_COUNT
        }

        // Définir le reste en villageois selon la config
        if (villageoisRole) {
          defaultRoles[villageoisRole.slug].count = FEATURES.DEFAULT_ROLES_COUNT - (loupRole ? FEATURES.DEFAULT_WEREWOLVES_COUNT : 0)
        }

        set({
          selectedRoles: defaultRoles,
          error: null,
          loading: false,
          isRolesReady: true
        })
      } else {
        set({
          selectedRoles: {},
          error: null,
          loading: false,
          isRolesReady: true
        })
      }
      
      // Met à jour l'équilibre entre joueurs et rôles
      get().updatePlayersAndRolesEqual()
    } catch (err) {
      console.error('Erreur:', err)
      set({
        error: 'Impossible de charger les rôles',
        loading: false
      })
    }
  },

  toggleDefaultRoles: () => {
    set((state) => ({ useDefaultRoles: !state.useDefaultRoles }))
    get().fetchRoles() // Recharger les rôles avec le nouveau paramètre
  },

  incRoleCount: (roleSlug: string) => {
    const role = get().roles.find(r => r.slug === roleSlug);
    
    set((state) => ({
      selectedRoles: { 
        ...state.selectedRoles, 
        [roleSlug]: {
          role: role || state.selectedRoles[roleSlug]?.role,
          count: (state.selectedRoles[roleSlug]?.count || 0) + 1
        }
      }
    }))
    get().updatePlayersAndRolesEqual()
  },

  decRoleCount: (roleSlug: string) => {
    const role = get().roles.find(r => r.slug === roleSlug);
    
    set((state) => ({
      selectedRoles: { 
        ...state.selectedRoles, 
        [roleSlug]: {
          role: role || state.selectedRoles[roleSlug]?.role,
          count: Math.max(0, (state.selectedRoles[roleSlug]?.count || 0) - 1)
        }
      }
    }))
    get().updatePlayersAndRolesEqual()
  },

  // Sélecteurs
  getTotalSelectedRoles: () => {
    return Object.values(get().selectedRoles).reduce((sum, item) => sum + item.count, 0)
  },

  getRole: (roleSlug: string) => {
    return get().roles.find((r: Role) => r.slug === roleSlug)
  },
}) 