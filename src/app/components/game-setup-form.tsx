'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { PlayersList } from '@/app/components/players-list'
import { RolesList } from '@/app/components/roles-list'
import { useGame } from '@/app/hooks/useGame'

export function GameSetupForm() {
  const { startGame, loading, error } = useGame()
  
  if (loading) {
    return <div className="text-center py-8">Chargement de la partie...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Erreur: {error}</div>
  }
  
  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        <PlayersList />
        <RolesList />
      </div>

      <div className="flex justify-end">
        <Button onClick={startGame} variant="default" className="w-full">
          Commencer la partie
        </Button>
      </div>
    </>
  )
} 