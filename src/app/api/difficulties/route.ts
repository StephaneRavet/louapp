import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { CreateDifficultyDto } from '@/app/api/difficulties/types'

export async function GET() {
  try {
    const difficulties = await prisma.difficulty.findMany({
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    })
    return NextResponse.json(difficulties)
  } catch (error) {
    console.error('Erreur lors de la récupération des difficultés:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des difficultés' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body: CreateDifficultyDto = await request.json()
    const { name, slug, description, roles } = body

    const difficulty = await prisma.difficulty.create({
      data: {
        name,
        slug,
        description,
        roles: {
          create: roles.map((role: { roleId: number; quantity: number }) => ({
            roleId: role.roleId,
            quantity: role.quantity
          }))
        }
      },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    })

    return NextResponse.json(difficulty)
  } catch (error) {
    console.error('Erreur lors de la création de la difficulté:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la difficulté' },
      { status: 500 }
    )
  }
} 