'use server'

import { prisma } from '@/lib/prisma'
import type { Role } from '@prisma/client'

// Mapping des couleurs de la base de données vers des classes Tailwind
const colorMapping: Record<string, string> = {
  'ROUGE': 'bg-role-loup',
  'BLEU': 'bg-role-village', 
  'VIOLET': 'bg-role-multi',
  'VERT': 'bg-role-independant'
}

export async function getRoles(): Promise<Role[]> {
  try {
    const roles = await prisma.$queryRaw<Role[]>`
      SELECT * FROM Role 
      ORDER BY 
        CASE team
          WHEN 'loup' THEN 0
          WHEN 'village' THEN 1
          WHEN 'independant' THEN 2
          WHEN 'multi' THEN 3
          ELSE 4
        END,
        id ASC
    `
    
    // Remplacer les noms de couleurs par les classes Tailwind correspondantes
    return roles.map(role => ({
      ...role,
      color: role.color ? colorMapping[role.color] || role.color : role.color
    }))
  } catch (error) {
    console.error('Erreur lors de la récupération des rôles:', error)
    return []
  }
} 