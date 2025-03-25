import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { Role } from '@prisma/client'
import { TEAM_SORT_ORDER } from '@/app/config'

export async function GET() {
  try {
    // Construire la requête SQL complète avec l'ordre de tri basé sur la configuration
    const caseWhenStatements = Object.entries(TEAM_SORT_ORDER)
      .map(([team, order]) => `WHEN '${team}' THEN ${order}`)
      .join(' ');
    
    const maxOrder = Object.keys(TEAM_SORT_ORDER).length;
    
    const query = `
      SELECT * FROM Role 
      ORDER BY 
        CASE team ${caseWhenStatements} ELSE ${maxOrder} END,
        id ASC
    `;

    const roles = await prisma.$queryRawUnsafe<Role[]>(query);

    return NextResponse.json(roles)
  } catch (error) {
    console.error('Erreur lors de la récupération des rôles:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des rôles' },
      { status: 500 }
    )
  }
} 