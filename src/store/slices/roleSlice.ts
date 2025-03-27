import type { Role } from '@prisma/client'
import type { StateCreator } from 'zustand'
import type { AppState } from '@/store/index'
import { FEATURES } from '@/config/config'
import { shuffle } from '@/lib/utils';
import { PlayerRole } from '@/store/slices/gameSlice';

export interface RoleSlice {
  // État
  roles: Role[]
  selectedRoles: Record<string, { role: Role, count: number }>
  loading: boolean
  error: string | null
  useDefaultRoles: boolean
  isRolesReady: boolean
  playerRoles: PlayerRole[]
  isPlayersAndRolesEqual: boolean

  // Actions
  fetchRoles: () => Promise<void>
  incRoleCount: (roleSlug: string) => void
  decRoleCount: (roleSlug: string) => void
  getRole: (roleSlug: string) => Role | undefined
  toggleDefaultRoles: () => void
  ensureRolesLoaded: () => Promise<void>
  randomRolesAttribution: () => void
  updatePlayersAndRolesEqual: () => void

  // Sélecteurs
  getTotalSelectedRoles: () => number
}

export const createRoleSlice: StateCreator<AppState, [], [], RoleSlice> = (set, get) => ({
  // État initial
  roles: [],
  selectedRoles: {},
  loading: true,
  error: null,
  useDefaultRoles: FEATURES.AUTO_INIT,
  isRolesReady: false,
  playerRoles: [],
  isPlayersAndRolesEqual: false,

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
      const defaultRoles: Record<string, { role: Role, count: number }> = data.reduce(
        (acc: Record<string, { role: Role, count: number }>, role: Role) => ({
          ...acc,
          [role.slug]: { role, count: 0 }
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

      // Trouver les rôles indépendants et multi-équipes
      const independantRoles = data.filter((r: Role) => r.team === 'independant')
      const multiRoles = data.filter((r: Role) => r.team === 'multi')

      // Si on utilise les rôles par défaut
      if (get().useDefaultRoles) {
        // Définir le nombre de loups selon la config
        if (loupRole) {
          defaultRoles[loupRole.slug].count = FEATURES.DEFAULT_WEREWOLVES_COUNT
        }

        // Définir le reste en villageois selon la config
        if (villageoisRole) {
          defaultRoles[villageoisRole.slug].count = FEATURES.DEFAULT_ROLES_COUNT -
            (loupRole ? FEATURES.DEFAULT_WEREWOLVES_COUNT : 0) -
            FEATURES.DEFAULT_INDEPENDANT_COUNT -
            FEATURES.DEFAULT_MULTI_COUNT
        }

        // Ajouter les rôles indépendants
        if (independantRoles.length > 0) {
          const selectedIndependant = independantRoles.slice(0, FEATURES.DEFAULT_INDEPENDANT_COUNT)
          selectedIndependant.forEach((role: Role) => {
            defaultRoles[role.slug].count = 1
          })
        }

        // Ajouter les rôles multi-équipes
        if (multiRoles.length > 0) {
          const selectedMulti = multiRoles.slice(0, FEATURES.DEFAULT_MULTI_COUNT)
          selectedMulti.forEach((role: Role) => {
            defaultRoles[role.slug].count = 1
          })
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

  ensureRolesLoaded: async () => {
    const { fetchRoles, isRolesReady } = get()
    // Si les rôles sont déjà chargés, on retourne immédiatement
    if (isRolesReady) return
    // Sinon, on attend que les rôles soient chargés
    await fetchRoles()
  },

  randomRolesAttribution: () => {
    const { players, selectedRoles } = get()

    // Filtrer les joueurs pour enlever les chaînes vides
    const validPlayers = players.filter(player => player.trim() !== '')

    // Copier les joueurs pour les mélanger
    const shuffledPlayers = shuffle([...validPlayers])

    // Créer la liste des rôles à attribuer basée sur selectedRoles
    const rolesToAssign: Role[] = []
    Object.entries(selectedRoles).forEach(([slug, roleData]) => {
      const { role, count } = roleData
      for (let i = 0; i < count; i++) {
        rolesToAssign.push(role)
      }
    })

    // Créer les associations rôle-joueur
    const newPlayerRoles: PlayerRole[] = []
    for (let i = 0; i < rolesToAssign.length; i++) {
      newPlayerRoles.push({
        role: rolesToAssign[i],
        player: shuffledPlayers[i]
      })
    }

    // Mettre à jour l'état
    set((state) => ({ ...state, playerRoles: newPlayerRoles }))
  },

  updatePlayersAndRolesEqual: () => {
    const { getTotalSelectedRoles, getValidPlayersCount } = get()
    set({ isPlayersAndRolesEqual: getTotalSelectedRoles() === getValidPlayersCount() })
  },
}) 