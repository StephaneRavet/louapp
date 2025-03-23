'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { PlayersList } from '@/app/components/players-list'
import { RolesList } from '@/app/components/roles-list'
import { useGame } from '@/app/hooks/useGame'

export function GameSetupForm() {
  const { randomRolesAttribution, loading, error } = useGame()
  const router = useRouter()
  
  if (loading) {
    return <div className="text-center py-8">Chargement de la partie...</div>
  }

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

      <div className="flex justify-end">
        <Button onClick={handleAttributeRoles} variant="default" className="w-full">
          Attribuer aléatoirement les rôles
        </Button>
      </div>
    </>
  )
} 