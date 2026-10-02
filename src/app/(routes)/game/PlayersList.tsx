'use client'

import React, { useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
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

  // Focalise le premier champ vide au montage uniquement.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(focusEmptyInput, [])

  useEffect(focusEmptyInput, [players])

  return (
    <>
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {players.map((player, index) => (
            <div key={index} className="flex items-center gap-3 min-w-0">
              <Input
                value={player}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePlayerName(index, e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nom du joueur"
                className="flex-1 min-w-0"
                clearable
                onClear={() => removePlayer(index)}
                ref={el => {
                  if (el) inputRefs.current.set(index, el)
                }}
              />
            </div>
          ))}
        </div>
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