'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { PlayersList } from '@/app/components/PlayersList'
import { RolesList } from '@/app/components/RolesList'
import { useGameStore } from '@/app/store/gameStore'

export function GameSetupForm() {
  const { randomRolesAttribution, error } = useGameStore()
  const router = useRouter()
  
  if (error) {
    return <div className="text-center py-8 text-red-500">Erreur: {error}</div>
  }
  
  const handleAttributeRoles = () => {
    randomRolesAttribution()
    router.push('/game/roles')
  }
  
  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        <PlayersList />
        <RolesList />
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <div className="container max-w-2xl mx-auto">
          <Button onClick={handleAttributeRoles} variant="default" className="w-full">
            Attribuer aléatoirement les rôles
          </Button>
        </div>
      </div>
    </>
  )
} 