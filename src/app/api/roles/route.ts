import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const roles = await prisma.$queryRaw`
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
    
    return NextResponse.json(roles)
  } catch (error) {
    console.error('Erreur lors de la récupération des rôles:', error)
    return NextResponse.json(
      { message: 'Erreur serveur lors de la récupération des rôles' },
      { status: 500 }
    )
  }
} 