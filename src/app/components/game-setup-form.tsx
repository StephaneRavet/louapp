'use client'

import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { PlayersList } from '@/app/components/players-list'
import { RolesList } from '@/app/components/roles-list'
import type { Player } from '@/types/Player.type'
import type { Role } from '@prisma/client'

type GameSetupFormProps = {
  roles: Role[]
} 

export function GameSetupForm({ roles }: GameSetupFormProps) {
  const [players, setPlayers] = useState<Player[]>([''])
  const [selectedRoles, setSelectedRoles] = useState<Record<number, number>>(
    roles.reduce((acc, role) => ({ ...acc, [role.id]: 0 }), {})
  )
  const [lastAddedIndex, setLastAddedIndex] = useState<number>(0)

  const totalRoles = useMemo(() => 
    Object.values(selectedRoles).reduce((sum, count) => sum + count, 0),
    [selectedRoles]
  )

  const validPlayersCount = useMemo(() => 
    players.filter(p => p.trim()).length,
    [players]
  )

  const addPlayer = () => {
    const lastPlayer = players[players.length - 1]
    if (!lastPlayer.trim()) return

    setPlayers([...players, ''])
    setLastAddedIndex(players.length)
  }

  const removePlayer = (index: number) => {
    if (players.length > 1) {
      setPlayers(players.filter((_, i) => i !== index))
    }
  }

  const updatePlayerName = (index: number, name: string) => {
    setPlayers(
      players.map((player, i) =>
        i === index ? name : player
      )
    )
  }

  const updateRoleCount = (roleId: number, count: number) => {
    if (count >= 0) {
      setSelectedRoles(prev => ({ ...prev, [roleId]: count }))
    }
  }

  const startGame = () => {
    // Ici, vous pourriez soumettre les données à une API ou naviguer vers la page suivante
    console.log('Joueurs:', players)
    console.log('Rôles sélectionnés:', selectedRoles)
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        <PlayersList 
          players={players} 
          onAddPlayer={addPlayer} 
          onRemovePlayer={removePlayer} 
          onUpdatePlayerName={updatePlayerName} 
          lastAddedIndex={lastAddedIndex} 
        />
        
        <RolesList 
          roles={roles} 
          selectedRoles={selectedRoles} 
          onUpdateRoleCount={updateRoleCount} 
          totalRoles={totalRoles} 
          validPlayersCount={validPlayersCount} 
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={startGame} variant="default" className="w-full">
          Commencer la partie
        </Button>
      </div>
    </>
  )
} 