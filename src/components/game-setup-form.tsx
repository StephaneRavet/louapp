'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { X, Plus } from 'lucide-react'

interface Player {
  id: string
  name: string
}

interface Role {
  id: number
  name: string
  slug: string
  description: string
  team: string
  color: string | null
  isUnique: boolean
}

interface GameSetupFormProps {
  roles: Role[]
}

export function GameSetupForm({ roles }: GameSetupFormProps) {
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: '' }
  ])
  const [selectedRoles, setSelectedRoles] = useState<Record<number, number>>(
    roles.reduce((acc, role) => ({ ...acc, [role.id]: 0 }), {})
  )
  const [lastAddedId, setLastAddedId] = useState<string>('1')
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map())

  // Focus le premier input au chargement du composant
  useEffect(() => {
    const firstInput = inputRefs.current.get('1')
    if (firstInput) {
      firstInput.focus()
    }
  }, [])

  // Focus le dernier input ajouté
  useEffect(() => {
    const inputToFocus = inputRefs.current.get(lastAddedId)
    if (inputToFocus) {
      inputToFocus.focus()
    }
  }, [lastAddedId])

  const addPlayer = () => {
    const lastPlayer = players[players.length - 1]
    if (!lastPlayer.name.trim()) return

    const newId = String(Date.now())
    setPlayers([...players, { id: newId, name: '' }])
    setLastAddedId(newId)
  }

  const removePlayer = (id: string) => {
    if (players.length > 1) {
      setPlayers(players.filter(player => player.id !== id))
    }
  }

  const updatePlayerName = (id: string, name: string) => {
    setPlayers(
      players.map(player =>
        player.id === id ? { ...player, name } : player
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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Section Joueurs */}
        <Card>
          <CardHeader>
            <CardTitle>Joueurs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {players.map(player => (
              <div key={player.id} className="flex items-center gap-3">
                <Input
                  value={player.name}
                  onChange={e => updatePlayerName(player.id, e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nom du joueur"
                  className="flex-1"
                  ref={el => {
                    if (el) inputRefs.current.set(player.id, el)
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePlayer(player.id)}
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
            <CardTitle>Rôles</CardTitle>
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
        <Button onClick={startGame} className="px-8">
          Commencer la partie
        </Button>
      </div>
    </div>
  )
} 