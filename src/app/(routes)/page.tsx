'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { PlayersList } from '@/app/(routes)/components/PlayersList'
import { RolesList } from '@/app/(routes)/components/RolesList'
import { useGameStore } from '@/store/gameStore'
import { PlayersRolesCheck } from '@/app/(routes)/components/PlayersRolesCheck'
import { StickyFooter } from '@/app/(routes)/components/StickyFooter'
// import { ThemeToggle } from '@/components/ThemeToggle'

export default function Home() {
  const { randomRolesAttribution, error, isPlayersAndRolesEqual } = useGameStore()
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-title">Nouvelle partie de Loup</h1>
        {/* <ThemeToggle /> */}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <PlayersList />
        <RolesList />
      </div>

      <StickyFooter>
        <PlayersRolesCheck />
        <Button
          onClick={handleAttributeRoles}
          variant="default"
          disabled={!isPlayersAndRolesEqual}
          className="font-action"
        >
          Attribuer rôles aléatoires
        </Button>
      </StickyFooter>
    </>
  )
}