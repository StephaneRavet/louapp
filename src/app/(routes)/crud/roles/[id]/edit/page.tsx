import { Role, TeamType } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { RoleForm } from '@/components/roles/RoleForm'
import { notFound } from 'next/navigation'

export default async function EditRolePage({ params }: { params: { id: string } }) {
  const role = await prisma.role.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!role) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Modifier le Rôle</h1>
      <RoleForm role={role} />
    </div>
  )
} 