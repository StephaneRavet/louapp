'use client'

import React, { useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { X, Plus } from 'lucide-react'
import { useGameStore } from '@/app/store/gameStore'
import type { Player } from '@/types/Player.type'

export function PlayersList() {
  const { 
    players, 
    lastAddedIndex, 
    addPlayer, 
    removePlayer, 
    updatePlayerName,
    error
  } = useGameStore()
  
  const inputRefs = useRef<Map<number, HTMLInputElement>>(new Map())

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addPlayer()
    }
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Joueurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-red-500">{error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {players.map((player, index) => (
          <div key={index} className="flex items-center gap-3">
            <Input
              value={player}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePlayerName(index, e.target.value)}
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
              className="p-0 h-9 w-9 rounded-full cursor-pointer"
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
      </div>
    </>
  )
} 