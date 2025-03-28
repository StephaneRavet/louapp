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
  steps: GameStep[]
  game: Game
  gameStepsLoaded: boolean
  playerRoles: PlayerRole[]
  startGame: () => void
  nextGameStep: () => void
  getGameSteps: () => Promise<void>
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
    set((state) => {
      const currentStep = state.game.currentStep + 1 === state.steps.length ? 0 : state.game.currentStep + 1
      const message1 = state.steps[currentStep].name
      const message2 = state.steps[currentStep].sentence
      return {
        game: { 
          currentStep, 
          messages: [...state.game.messages, { content: message1, type: 'title' }, { content: message2, type: 'speech' }] 
        }
      }
    })
  },

  getGameSteps: async () => {
    const { setError } = get()
    const steps = await queryAPI<GameStep[]>('gameSteps', setError)
    set({ steps, gameStepsLoaded: true })
  },

  randomRolesAttribution: () => {
    const { players, selectedRoles } = get()

    const validPlayers = players.filter(player => player.trim() !== '')
    const shuffledPlayers = shuffle([...validPlayers])

    const rolesToAssign: Role[] = []
    Object.entries(selectedRoles).forEach(([, roleData]) => {
      const { role, count } = roleData
      for (let i = 0; i < count; i++) {
        rolesToAssign.push(role)
      }
    })

    const newPlayerRoles: PlayerRole[] = []
    for (let i = 0; i < rolesToAssign.length; i++) {
      newPlayerRoles.push({
        role: rolesToAssign[i],
        player: shuffledPlayers[i]
      })
    }

    set({ playerRoles: newPlayerRoles })
  }
})