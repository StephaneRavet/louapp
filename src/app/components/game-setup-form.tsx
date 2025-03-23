'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { PlayersList } from '@/app/components/players-list'
import { RolesList } from '@/app/components/roles-list'
import type { Player } from '@/types/Player.type'
import type { Role } from '@prisma/client'

type GameSetupFormProps = {
  roles: Role[]
  players: Player[]
  selectedRoles: Record<number, number>
  lastAddedIndex: number
  totalRoles: number
  validPlayersCount: number
  onAddPlayer: () => void
  onRemovePlayer: (index: number) => void
  onUpdatePlayerName: (index: number, name: string) => void
  onUpdateRoleCount: (roleId: number, count: number) => void
  onStartGame: () => void
}

export function GameSetupForm({
  roles,
  players,
  selectedRoles,
  lastAddedIndex,
  totalRoles,
  validPlayersCount,
  onAddPlayer,
  onRemovePlayer,
  onUpdatePlayerName,
  onUpdateRoleCount,
  onStartGame
}: GameSetupFormProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        <PlayersList
          players={players}
          onAddPlayer={onAddPlayer}
          onRemovePlayer={onRemovePlayer}
          onUpdatePlayerName={onUpdatePlayerName}
          lastAddedIndex={lastAddedIndex}
        />

        <RolesList
          roles={roles}
          selectedRoles={selectedRoles}
          onUpdateRoleCount={onUpdateRoleCount}
          totalRoles={totalRoles}
          validPlayersCount={validPlayersCount}
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={onStartGame} variant="default" className="w-full">
          Commencer la partie
        </Button>
      </div>
    </>
  )
} 