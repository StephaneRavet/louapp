'use client'

import React, { useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Plus } from 'lucide-react'
import { useAppStore } from '@/store/index'

export function PlayersList() {
  const {
    players,
    addPlayer,
    removePlayer,
    updatePlayerName,
  } = useAppStore()

  const inputRefs = useRef<Map<number, HTMLInputElement>>(new Map())

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addPlayer()
    }
  }

  const addPlayerOrFocusEmptyInput = () => {
    addPlayer()
    focusEmptyInput()
  }

  const focusEmptyInput = () => {
    const lastPlayerIndex = players.findIndex(player => player === '')
    const inputToFocus = inputRefs.current.get(lastPlayerIndex)
    if (inputToFocus) {
      inputToFocus.focus()
    }
  }

  useEffect(focusEmptyInput, [])

  useEffect(focusEmptyInput, [players])

  return (
    <>
      <div className="space-y-2">
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
          onClick={addPlayerOrFocusEmptyInput}
          className="w-full flex items-center justify-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Ajouter un joueur
        </Button>
      </div>
    </>
  )
} 