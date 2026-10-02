import { createRoleSlice } from '@/store/slices/roleSlice'
import type { StoreApi } from 'zustand'
import { create } from 'zustand'
import { createMockRole, rolesData } from '@/data/rolesData';
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
  createMockRole(rolesData.loup, 1),
  createMockRole(rolesData.villageois, 2),
  createMockRole(rolesData.medecin, 3),
  createMockRole(rolesData.chasseur, 4),
  createMockRole(rolesData.boulet, 5)
]

// Mock du state initial
const createMockState = (players = mockPlayers): AppState => ({
  // PlayerSlice
  players,
  addPlayer: () => { },
  removePlayer: () => { },
  updatePlayerName: () => { },
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
  fetchRoles: async () => { },
  incRoleCount: () => { },
  decRoleCount: () => { },
  getRole: (slug: string) => mockRoles.find(r => r.slug === slug),
  getTotalSelectedRoles: () => 10,
  playerRoles: [],
  isPlayersAndRolesEqual: () => players.length === 10,
  randomRolesAttribution: () => { },
  toggleDefaultRoles: () => { },

  // GameSlice
  steps: [],
  game: {
    currentStep: 0,
    messages: []
  },
  gameStepsLoaded: false,
  nextGameStep: () => { },
  getGameSteps: async () => Promise.resolve(),
  startGame: () => { },

  // AppSlice
  error: null,
  setError: () => { }
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