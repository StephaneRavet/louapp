import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreateRoleDto } from '@/app/api/roles/roles.types'
import { TEAM_SORT_ORDER } from '@/config/config'

export async function GET() {
  try {
    const roles = await prisma.role.findMany();
    roles.sort((a, b) => TEAM_SORT_ORDER[a.team] - TEAM_SORT_ORDER[b.team]); // plus simple pour trier les rôles par équipe
    return NextResponse.json(roles)
  } catch (error) {
    console.error('Erreur lors de la récupération des rôles:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des rôles' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body: CreateRoleDto = await request.json()
    const role = await prisma.role.create({
      data: body
    })

    return NextResponse.json(role)
  } catch (error) {
    console.error('Erreur lors de la création du rôle:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du rôle' },
      { status: 500 }
    )
  }
} 