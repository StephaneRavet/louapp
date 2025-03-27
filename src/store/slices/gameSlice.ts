import type { StateCreator } from 'zustand'
import type { GameState } from '../types'
import type { Player } from '../../../types/Player.type'
import { Role } from '@prisma/client'
import { shuffle } from '@/lib/utils'

export type PlayerRole = {
  player: Player;
  role: Role;
}

export type Game = {
  currentStep: number
}

export interface GameSlice {
  // État
  playerRoles: PlayerRole[]
  isPlayersAndRolesEqual: boolean
  game: Game;

  // Actions
  startGame: () => void,
  nextStep: () => void,
  randomRolesAttribution: () => void,
  ensureRolesLoaded: () => Promise<void>,
  updatePlayersAndRolesEqual: () => void,
}

export const createGameSlice: StateCreator<GameState, [], [], GameSlice> = (set, get) => ({
  playerRoles: [],
  isPlayersAndRolesEqual: false,
  game: {
    currentStep: 0
  },

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
  startGame: () => {
    set((state) => ({ ...state, game: { currentStep: 1 } }))
  },
  nextStep: () => {
    set((state) => ({ ...state, game: { currentStep: state.game.currentStep + 1 } }))
  },

  updatePlayersAndRolesEqual: () => {
    const { getTotalSelectedRoles, getValidPlayersCount } = get()
    set({ isPlayersAndRolesEqual: getTotalSelectedRoles() === getValidPlayersCount() })
  },
}) 