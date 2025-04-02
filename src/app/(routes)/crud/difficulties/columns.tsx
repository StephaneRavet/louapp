'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Difficulty } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Pencil, Trash } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatRoles } from './utils'

type DifficultyWithRoles = Difficulty & {
  roles: {
    role: {
      name: string
      team: string
    }
    quantity: number
  }[]
}

export const columns: ColumnDef<DifficultyWithRoles>[] = [
  {
    accessorKey: 'name',
    header: 'Nom',
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      return (
        <div className="whitespace-pre-wrap break-words">
          {row.getValue('description')}
        </div>
      )
    },
  },
  {
    accessorKey: 'roles',
    header: 'Composition',
    cell: ({ row }) => {
      return (
        <div className="whitespace-pre-wrap break-words">
          {formatRoles(row.original.roles)}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
] 