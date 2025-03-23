'use server'

import { prisma } from '@/lib/prisma'
import type { Role } from '@prisma/client'

export async function getRoles(): Promise<Role[]> {
  try {
    const roles = await prisma.$queryRaw<Role[]>`
      SELECT * FROM Role 
      ORDER BY 
        CASE team
          WHEN 'loups' THEN 0
          WHEN 'village' THEN 1
          WHEN 'independant' THEN 2
          WHEN 'multi' THEN 3
          ELSE 4
        END,
        id ASC
    `
    return roles
  } catch (error) {
    console.error('Erreur lors de la récupération des rôles:', error)
    return []
  }
} 