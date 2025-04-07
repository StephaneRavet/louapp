'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { PlayersList } from '@/app/(routes)/game/PlayersList'
// import { RolesList } from '@/app/(routes)/game/RolesList'
import { MiniRolesList } from '@/app/(routes)/game/MiniRolesList'
import { useAppStore } from '@/store/index'
import { PlayersRolesCheck } from '@/app/(routes)/game/PlayersRolesCheck'
import { StickyFooter } from '@/app/(routes)/StickyFooter'
// import { DifficultySelector } from '@/app/(routes)/game/DifficultySelector'
// import { ThemeToggle } from '@/components/ThemeToggle'

export default function Home() {
  const { isPlayersAndRolesEqual, getValidPlayersCount } = useAppStore()
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
        {/* <div className="h-[1px] bg-muted-foreground/20" /> */}
        <div className="text-3xl font-title -mb-3">Sélectionnez des rôles</div>
        {/* <DifficultySelector /> */}
        {/* <RolesList /> */}
        <MiniRolesList />
      </div>

      <StickyFooter>
        <PlayersRolesCheck />
        <Button
          onClick={handleAttributeRoles}
          variant="default"
          disabled={!isPlayersAndRolesEqual() || !getValidPlayersCount()}
          className="font-action"
        >
          Attribuer rôles aléatoires
        </Button>
      </StickyFooter>
    </div>
  )
}