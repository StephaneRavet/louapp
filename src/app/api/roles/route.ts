import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreateRoleDto } from '@/types/role'

export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(roles)
  } catch (error) {
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
    return NextResponse.json(
      { error: 'Erreur lors de la création du rôle' },
      { status: 500 }
    )
  }
} 