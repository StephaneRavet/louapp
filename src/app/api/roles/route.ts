import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { Role } from '@prisma/client'

export async function GET() {
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

    return NextResponse.json(roles)
  } catch (error) {
    console.error('Erreur lors de la récupération des rôles:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des rôles' },
      { status: 500 }
    )
  }
} 