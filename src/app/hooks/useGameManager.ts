'use client'

import { useState, useMemo } from 'react'
import type { Player } from '@/types/Player.type'
import type { Role } from '@prisma/client'

export function useGameManager(roles: Role[]) {
  const DEFAULT_PLAYERS: Player[] = Array.from({ length: 10 }, (_, i) => `joueur${i}`)
  const [players, setPlayers] = useState<Player[]>(DEFAULT_PLAYERS)
  const [lastAddedIndex, setLastAddedIndex] = useState<number>(0)
  
  // Définition des rôles par défaut: 3 loups, le reste en villageois
  const getDefaultRoles = (): Record<number, number> => {
    const defaultRoles: Record<number, number> = roles.reduce((acc, role) => ({ ...acc, [role.id]: 0 }), {})
    
    // Trouver l'ID du rôle "Loup" et "Villageois"
    const loupRole = roles.find(r => 
      r.slug === 'loup' || 
      r.name.toLowerCase().includes('loup')
    )
    const villageoisRole = roles.find(r => 
      r.slug === 'villageois' || 
      r.name.toLowerCase().includes('villageois')
    )
    
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

  return {
    players,
    selectedRoles,
    lastAddedIndex,
    totalRoles,
    validPlayersCount,
    addPlayer,
    removePlayer,
    updatePlayerName,
    updateRoleCount,
    startGame
  }
} 