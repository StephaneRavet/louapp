import type { StateCreator } from 'zustand'
import type { Player } from '@/types/Player.type'
import type { Role, GameStep } from '@prisma/client'
import type { AppState } from '@/store/index'
import { queryAPI } from '@/lib/queryAPI'
import { shuffle } from '@/lib/utils'

export type PlayerRole = {
  player: Player;
  role: Role;
}

export type Message = {
  content: string
  type: 'title' | 'speech'
}

export type Game = {
  currentStep: number
  messages: Message[]
}

export interface GameSlice {
  // État
  steps: GameStep[]
  game: Game
  gameStepsLoaded: boolean
  playerRoles: PlayerRole[]

  // Actions
  startGame: () => void
  nextGameStep: () => void
  getGameSteps: () => void
  randomRolesAttribution: () => void
}

export const createGameSlice: StateCreator<AppState, [], [], GameSlice> = (set, get) => ({
  steps: [],
  game: {
    currentStep: 0,
    messages: []
  },
  gameStepsLoaded: false,
  playerRoles: [],

  startGame: () => {
    set({ game: { currentStep: -1, messages: [] } })
  },
  nextGameStep: () => {
    set((state: GameSlice) => {
      console.log('nextGameStep', state.game.currentStep)
      const currentStep = state.game.currentStep + 1 === state.steps.length ? 0 : state.game.currentStep + 1
      const message1 = state.steps[currentStep].name
      const message2 = state.steps[currentStep].sentence
      return {
        ...state,
        game: { currentStep, messages: [...state.game.messages, { content: message1, type: 'title' }, { content: message2, type: 'speech' }] }
      }
    })
  },
  getGameSteps: async () => {
    const { setError } = get()
    const steps = await queryAPI<GameStep[]>('gameSteps', setError)
    set({ steps })
    set({ gameStepsLoaded: true })
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
  }
})