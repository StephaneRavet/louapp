import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { prisma } from '@/lib/prisma'

export default async function DifficultiesPage() {
  const difficulties = await prisma.difficulty.findMany({
    include: {
      roles: {
        include: {
          role: true
        }
      }
    }
  })

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Difficultés</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Difficulté
        </Button>
      </div>
      <DataTable columns={columns} data={difficulties} />
    </div>
  )
} 