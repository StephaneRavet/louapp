'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { PlayersList } from '@/app/(routes)/PlayersList'
import { RolesList } from '@/app/(routes)/RolesList'
import { useGameStore } from '@/store/gameStore'
import { PlayersRolesCheck } from '@/app/(routes)/PlayersRolesCheck'
import { StickyFooter } from '@/app/(routes)/StickyFooter'
// import { ThemeToggle } from '@/components/ThemeToggle'

export default function Home() {
  const { isPlayersAndRolesEqual } = useGameStore()
  const router = useRouter()

  const handleAttributeRoles = () => {
    router.push('/game/roles')
  }

  return (
    <div className="m-2 mb-8">
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
    </div>
  )
}