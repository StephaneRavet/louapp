'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Role, GameStep, RoleHook, TeamType } from '@prisma/client'
import type { Difficulty } from '@/types/difficulty'

const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''

// Configuration pour le mocking dans les tests
const isTest = process.env.NODE_ENV === 'test'
const mockData = {
  roles: [] as Role[],
  gameSteps: [] as GameStep[],
  roleHooks: [] as RoleHook[],
}

export function setMockData(data: typeof mockData) {
  Object.assign(mockData, data)
}

class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'APIError'
  }
}

async function fetchFromAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  if (isTest) {
    const mockKey = endpoint.split('/')[0] as keyof typeof mockData
    return mockData[mockKey] as T
  }

  try {
    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
      cache: 'no-store',
      ...options
    })
    if (!response.ok) {
      throw new APIError(`Erreur HTTP ${response.status}: ${response.statusText}`, response.status)
    }
    return response.json()
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    throw new APIError(`Erreur lors de l'appel à ${endpoint}: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
  }
}

// Types pour les mutations
type CreateRoleInput = {
  name: string
  shortName: string
  slug: string
  description: string
  team: TeamType
  isUnique: boolean
  level: number
}

type UpdateRoleInput = Partial<CreateRoleInput>

// Hooks React Query
export function useRoles() {
  return useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: () => fetchFromAPI('roles'),
  })
}

export function useGameSteps() {
  return useQuery<GameStep[]>({
    queryKey: ['gameSteps'],
    queryFn: () => fetchFromAPI('gameSteps'),
  })
}

export function useRoleHooks() {
  return useQuery<RoleHook[]>({
    queryKey: ['roleHooks'],
    queryFn: () => fetchFromAPI('roleHooks'),
  })
}

// Mutations
export function useCreateRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateRoleInput) => 
      fetchFromAPI<Role>('roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    },
  })
}

export function useUpdateRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: UpdateRoleInput }) =>
      fetchFromAPI<Role>(`roles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    },
  })
}

// Fonctions utilitaires pour les appels API directs
export async function fetchGameStepsDirect(): Promise<GameStep[]> {
  try {
    return await fetchFromAPI('gameSteps')
  } catch (error) {
    console.error('Erreur lors du chargement des étapes:', error)
    return []
  }
}

export async function fetchRolesDirect(): Promise<Role[]> {
  try {
    return await fetchFromAPI('roles')
  } catch (error) {
    console.error('Erreur lors du chargement des rôles:', error)
    return []
  }
}

export async function fetchRoleHooksDirect(): Promise<RoleHook[]> {
  try {
    return await fetchFromAPI('roleHooks')
  } catch (error) {
    console.error('Erreur lors du chargement des hooks:', error)
    return []
  }
}

export async function fetchDifficultiesDirect(): Promise<Difficulty[]> {
  try {
    return await fetchFromAPI('difficulties')
  } catch (error) {
    console.error('Erreur lors du chargement des difficultés:', error)
    return []
  }
} 