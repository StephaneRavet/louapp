import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { GameStep } from '@prisma/client'

export async function GET() {
  try {
    const data: GameStep[] = await prisma.gameStep.findMany({ orderBy: { id: 'asc' } });
    return NextResponse.json(data)
  } catch (error) {
    console.error('Erreur lors de la récupération des étapes du jeu:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des rôles' },
      { status: 500 }
    )
  }
} 