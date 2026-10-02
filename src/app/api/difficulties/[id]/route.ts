import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { UpdateDifficultyDto } from '@/app/api/difficulties/types'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const difficulty = await prisma.difficulty.findUnique({
      where: { id: parseInt(id) },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    })

    if (!difficulty) {
      return NextResponse.json({ error: 'Difficulté non trouvée' }, { status: 404 })
    }

    return NextResponse.json(difficulty)
  } catch (error) {
    console.error('Erreur lors de la récupération de la difficulté:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la difficulté' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body: UpdateDifficultyDto = await request.json()
    const { name, slug, description, roles } = body

    const difficulty = await prisma.difficulty.update({
      where: { id: parseInt(id) },
      data: {
        name,
        slug,
        description,
        roles: {
          deleteMany: {},
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
    console.error('Erreur lors de la mise à jour de la difficulté:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la difficulté' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.difficulty.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ message: 'Difficulté supprimée avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression de la difficulté:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la difficulté' },
      { status: 500 }
    )
  }
} 