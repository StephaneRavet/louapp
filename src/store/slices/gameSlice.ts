import type { StateCreator } from 'zustand'
import type { GameState } from '../types'
import type { Player } from '../../../types/Player.type'
import { Role } from '@prisma/client'
import { shuffle } from '@/lib/utils'
import { TEAM_SORT_ORDER } from '@/config/config'

// Type pour l'association rôle-joueur
export type PlayerRole = {
  player: Player;
  role: Role;
}

export interface GameSlice {
  // État
  playerRoles: PlayerRole[];
  isPlayersAndRolesEqual: boolean;

  // Actions
  startGame: () => void,
  randomRolesAttribution: () => void,
  ensureRolesLoaded: () => Promise<void>,
  updatePlayersAndRolesEqual: () => void,
}

export const createGameSlice: StateCreator<GameState, [], [], GameSlice> = (set, get) => ({
  playerRoles: [],
  isPlayersAndRolesEqual: false,

  ensureRolesLoaded: async () => {
    const { roles, loading, fetchRoles, isRolesReady } = get()

    // Si les rôles sont déjà chargés, on retourne immédiatement
    if (isRolesReady) {
      return
    }

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

    // Limiter le nombre de joueurs ou de rôles selon le cas:
    // 1. Si plus de joueurs que de rôles, on limite le nombre de joueurs
    // 2. Si plus de rôles que de joueurs, on limite le nombre de rôles
    const limitedPlayers = shuffledPlayers.length > rolesToAssign.length
      ? shuffledPlayers.slice(0, rolesToAssign.length)
      : shuffledPlayers

    // Créer les associations rôle-joueur
    const newPlayerRoles: PlayerRole[] = []
    const shuffledRoles = shuffle(rolesToAssign)
    for (let i = 0; i < Math.min(limitedPlayers.length, shuffledRoles.length); i++) {
      newPlayerRoles.push({
        role: shuffledRoles[i],
        player: limitedPlayers[i]
      })
    }

    // Trier les rôles selon l'ordre défini dans la configuration
    const sortedPlayerRoles = [...newPlayerRoles].sort((a, b) => {
      const teamOrderA = TEAM_SORT_ORDER[a.role.team] ?? Object.keys(TEAM_SORT_ORDER).length;
      const teamOrderB = TEAM_SORT_ORDER[b.role.team] ?? Object.keys(TEAM_SORT_ORDER).length;

      if (teamOrderA !== teamOrderB) {
        return teamOrderA - teamOrderB;
      }

      return a.role.name.localeCompare(b.role.name);
    });

    // Mettre à jour l'état
    set((state) => ({ ...state, playerRoles: sortedPlayerRoles }))
  },
  startGame: () => {
    // const { players, selectedRoles } = get()
  },

  updatePlayersAndRolesEqual: () => {
    const { getTotalSelectedRoles, getValidPlayersCount } = get()
    set({ isPlayersAndRolesEqual: getTotalSelectedRoles() === getValidPlayersCount() })
  },
}) 