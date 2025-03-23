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
  const DEFAULT_PLAYERS: Player[] = Array.from({ length: 10 }, (_, i) => `joueur${i}`)
  const [players, setPlayers] = useState<Player[]>(DEFAULT_PLAYERS)
  
  // Définition des rôles par défaut: 3 loups, le reste en villageois
  const getDefaultRoles = (): Record<number, number> => {
    const defaultRoles: Record<number, number> = roles.reduce((acc, role) => ({ ...acc, [role.id]: 0 }), {})
    
    // Trouver l'ID du rôle "Loup" et "Villageois"
    const loupRole = roles.find(r => r.slug === 'le-loup' || r.name.includes('Loup'))
    const villageoisRole = roles.find(r => r.slug === 'le-villageois' || r.name.includes('Villageois'))
    
    // Définir 3 loups
    if (loupRole) {
      defaultRoles[loupRole.id] = 3
    }
    
    // Définir le reste en villageois (nombre de joueurs - 3 loups)
    if (villageoisRole) {
      defaultRoles[villageoisRole.id] = DEFAULT_PLAYERS.length - (loupRole ? 3 : 0)
    }
    
    return defaultRoles
  }
  
  const [selectedRoles, setSelectedRoles] = useState<Record<number, number>>(getDefaultRoles())
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