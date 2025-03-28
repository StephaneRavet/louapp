import type { Role, GameStep, RoleHook } from '@prisma/client'

async function fetchFromAPI<T>(endpoint: string, setError: (error: unknown) => void): Promise<T> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
    const response = await fetch(`${baseUrl}/api/${endpoint}`)
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`)
    }
    return response.json()
  } catch (err) {
    setError(err)
    throw err
  }
}

export async function fetchRoles(setError: (error: unknown) => void): Promise<Role[]> {
  try {
    if (typeof window === 'undefined') {
      const { db } = await import('@/lib/db')
      return db.roles.findMany()
    }
    return fetchFromAPI<Role[]>('roles', setError)
  } catch (err) {
    setError(err)
    throw err
  }
}

export async function fetchGameSteps(setError: (error: unknown) => void): Promise<GameStep[]> {
  try {
    if (typeof window === 'undefined') {
      const { db } = await import('@/lib/db')
      return db.gameSteps.findMany()
    }
    return fetchFromAPI<GameStep[]>('gameSteps', setError)
  } catch (err) {
    setError(err)
    throw err
  }
}

export async function fetchRoleHooks(setError: (error: unknown) => void): Promise<RoleHook[]> {
  try {
    if (typeof window === 'undefined') {
      const { db } = await import('@/lib/db')
      return db.roleHooks.findMany()
    }
    return fetchFromAPI<RoleHook[]>('roleHooks', setError)
  } catch (err) {
    setError(err)
    throw err
  }
}
