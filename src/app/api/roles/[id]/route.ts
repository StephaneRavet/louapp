import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { UpdateRoleDto } from '@/types/role'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const role = await prisma.role.findUnique({
      where: { id: parseInt(params.id) }
    })

    if (!role) {
      return NextResponse.json({ error: 'Rôle non trouvé' }, { status: 404 })
    }

    return NextResponse.json(role)
  } catch (error) {
    console.error('Erreur lors de la récupération du rôle:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du rôle' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body: UpdateRoleDto = await request.json()
    const role = await prisma.role.update({
      where: { id: parseInt(params.id) },
      data: body
    })

    return NextResponse.json(role)
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du rôle' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.role.delete({
      where: { id: parseInt(params.id) }
    })

    return NextResponse.json({ message: 'Rôle supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression du rôle:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du rôle' },
      { status: 500 }
    )
  }
} 