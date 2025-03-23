'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'
import type { Role } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { X, Plus } from 'lucide-react'

type Player = string

type GameSetupFormProps = {
  roles: Role[]
}

export function GameSetupForm({ roles }: GameSetupFormProps) {
  const [players, setPlayers] = useState<Player[]>([''])
  const [selectedRoles, setSelectedRoles] = useState<Record<number, number>>(
    roles.reduce((acc, role) => ({ ...acc, [role.id]: 0 }), {})
  )
  const [lastAddedIndex, setLastAddedIndex] = useState<number>(0)
  const inputRefs = useRef<Map<number, HTMLInputElement>>(new Map())

  const totalRoles = useMemo(() => 
    Object.values(selectedRoles).reduce((sum, count) => sum + count, 0),
    [selectedRoles]
  )

  const validPlayersCount = useMemo(() => 
    players.filter(p => p.trim()).length,
    [players]
  )

  // Focus le premier input au chargement du composant
  useEffect(() => {
    const firstInput = inputRefs.current.get(0)
    if (firstInput) {
      firstInput.focus()
    }
  }, [])

  // Focus le dernier input ajouté
  useEffect(() => {
    const inputToFocus = inputRefs.current.get(lastAddedIndex)
    if (inputToFocus) {
      inputToFocus.focus()
    }
  }, [lastAddedIndex])

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addPlayer()
    }
  }

  const toggleRole = (roleId: number, checked: boolean) => {
    setSelectedRoles(prev => {
      const updated = { ...prev }
      if (checked) {
        updated[roleId] = 1
      } else {
        delete updated[roleId]
      }
      return updated
    })
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
        {/* Section Joueurs */}
        <Card>
          <CardHeader>
            <CardTitle>Joueurs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {players.map((player, index) => (
              <div key={index} className="flex items-center gap-3">
                <Input
                  value={player}
                  onChange={e => updatePlayerName(index, e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nom du joueur"
                  className="flex-1"
                  ref={el => {
                    if (el) inputRefs.current.set(index, el)
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePlayer(index)}
                  disabled={players.length === 1}
                  className="p-0 h-9 w-9 rounded-full"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Supprimer</span>
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addPlayer}
              className="w-full flex items-center justify-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Ajouter un joueur
            </Button>
          </CardContent>
        </Card>

        {/* Section Rôles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Rôles</span>
              <span className={`text-sm font-normal mr-6 ${
                totalRoles < validPlayersCount
                  ? 'text-yellow-500'
                  : totalRoles === validPlayersCount
                    ? 'text-green-500'
                    : 'text-red-500'
              }`}>
                {totalRoles}/{validPlayersCount}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roles.map(role => (
                <div key={role.id} className="flex items-center">
                  <div className="flex items-center flex-1">
                    <label
                      className="text-sm font-medium flex items-center cursor-pointer flex-1"
                    >
                      <span
                        className="inline-block w-3 h-3 rounded-full"
                        style={{ backgroundColor: role.color || '#9CA3AF' }}
                      />
                      {role.name}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({role.team})
                      </span>
                    </label>
                  </div>
                  <Input
                    type="number"
                    min="0"
                    max="99"
                    value={selectedRoles[role.id]}
                    onChange={e => updateRoleCount(role.id, parseInt(e.target.value, 10) || 0)}
                    className="w-16"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={startGame} variant="default" className="w-full">
          Commencer la partie
        </Button>
      </div>
    </>
  )
} 