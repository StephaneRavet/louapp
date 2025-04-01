import { createRoleSlice } from '@/store/slices/roleSlice'
import type { StoreApi } from 'zustand'
import { create } from 'zustand'
import { createMockRole } from '@/data/rolesData'
import { TeamType } from '@prisma/client'
import type { AppState } from '@/store/index'

// Mocker la fonction shuffle pour avoir un comportement déterministe
jest.mock('@/lib/utils', () => ({
  shuffle: <T>(array: T[]) => [...array], // Retourne une copie sans mélanger
}))

// Mock des données de test
const mockPlayers = [
  'Joueur 1', 'Joueur 2', 'Joueur 3', 'Joueur 4',
  'Joueur 5', 'Joueur 6', 'Joueur 7', 'Joueur 8',
  'Joueur 9', 'Joueur 10'
]

// Création des rôles mockés
const mockRoles = [
  createMockRole({ name: 'Le Loup', shortName: 'Loup', slug: 'loup', description: 'Un loup', team: TeamType.loup, color: 'ROUGE', isUnique: false }, 1),
  createMockRole({ name: 'Le Villageois', shortName: 'Villageois', slug: 'villageois', description: 'Un villageois', team: TeamType.village, color: 'BLEU', isUnique: false }, 2),
  createMockRole({ name: 'Le Médecin', shortName: 'Médecin', slug: 'medecin', description: 'Un médecin', team: TeamType.village, color: 'BLEU', isUnique: true }, 3),
  createMockRole({ name: 'Le Chasseur', shortName: 'Chasseur', slug: 'chasseur', description: 'Un chasseur', team: TeamType.village, color: 'BLEU', isUnique: true }, 4),
  createMockRole({ name: 'Le Boulet', shortName: 'Boulet', slug: 'boulet', description: 'Un boulet', team: TeamType.village, color: 'BLEU', isUnique: true }, 5)
]

// Mock du state initial
const createMockState = (players = mockPlayers): AppState => ({
  // PlayerSlice
  players,
  addPlayer: () => {},
  removePlayer: () => {},
  updatePlayerName: () => {},
  getValidPlayersCount: () => players.length,

  // RoleSlice
  roles: mockRoles,
  rolesLoaded: true,
  useDefaultRoles: true,
  selectedRoles: {
    loup: { role: mockRoles[0], count: 2 },
    villageois: { role: mockRoles[1], count: 5 },
    medecin: { role: mockRoles[2], count: 1 },
    chasseur: { role: mockRoles[3], count: 1 },
    boulet: { role: mockRoles[4], count: 1 }
  },
  fetchRoles: async () => {},
  incRoleCount: () => {},
  decRoleCount: () => {},
  getRole: (slug: string) => mockRoles.find(r => r.slug === slug),
  getTotalSelectedRoles: () => 10,
  playerRoles: [],
  isPlayersAndRolesEqual: true,
  randomRolesAttribution: () => {},
  updateIsPlayersAndRolesEqual: () => {},
  toggleDefaultRoles: () => {},

  // GameSlice
  steps: [],
  game: {
    currentStep: 0,
    messages: []
  },
  gameStepsLoaded: false,
  nextGameStep: () => {},
  getGameSteps: async () => Promise.resolve(),
  startGame: () => {},

  // AppSlice
  error: null,
  setError: () => {}
})

describe('roleSlice', () => {
  let store: StoreApi<AppState>

  beforeEach(() => {
    store = create<AppState>(() => createMockState())
  })

  describe('randomRolesAttribution', () => {
    it('attribue correctement les rôles aux joueurs', () => {
      const roleSlice = createRoleSlice(store.setState, store.getState, store)
      roleSlice.randomRolesAttribution()

      const state = store.getState()
      expect(state.playerRoles).toHaveLength(10)

      // Vérifier que chaque joueur a un rôle
      const playerNames = state.playerRoles.map(pr => pr.player)
      expect(playerNames).toEqual(expect.arrayContaining(mockPlayers))

      // Vérifier que le nombre de chaque rôle est correct
      const loupCount = state.playerRoles.filter(pr => pr.role.slug === 'loup').length
      const villageoisCount = state.playerRoles.filter(pr => pr.role.slug === 'villageois').length
      const medecinCount = state.playerRoles.filter(pr => pr.role.slug === 'medecin').length
      const chasseurCount = state.playerRoles.filter(pr => pr.role.slug === 'chasseur').length
      const bouletCount = state.playerRoles.filter(pr => pr.role.slug === 'boulet').length
      
      expect(loupCount).toBe(2)
      expect(villageoisCount).toBe(5)
      expect(medecinCount).toBe(1)
      expect(chasseurCount).toBe(1)
      expect(bouletCount).toBe(1)
    })

    it('gère le cas où il y a plus de joueurs que de rôles', () => {
      const extraPlayers = [...mockPlayers, 'Joueur 11', 'Joueur 12']
      store.setState({ players: extraPlayers })
      
      const roleSlice = createRoleSlice(store.setState, store.getState, store)
      roleSlice.randomRolesAttribution()

      const state = store.getState()
      expect(state.playerRoles).toHaveLength(10)
      
      const playerNames = state.playerRoles.map(pr => pr.player)
      playerNames.forEach(name => {
        expect(extraPlayers).toContain(name)
      })
    })
  })
}) 