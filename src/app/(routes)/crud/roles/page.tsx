import { prisma } from '@/lib/prisma'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function RolesPage() {
  const roles = await prisma.role.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Rôles</h1>
        <Link href="/crud/roles/new">
          <Button>Nouveau Rôle</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={roles} />
    </div>
  )
} 