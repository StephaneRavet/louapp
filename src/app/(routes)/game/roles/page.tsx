'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore } from '@/store/gameStore'
import { Button } from '@/components/ui/button'
import { StickyFooter } from '@/app/(routes)/StickyFooter'
import { PlayerRolesGrid } from '@/app/(routes)/game/roles/PlayerRolesGrid'

function RolesAttributionPage() {
  const router = useRouter()
  const { playerRoles, randomRolesAttribution } = useGameStore()

  // Attribuer les rôles si ce n'est pas déjà fait
  useEffect(() => {
    if (playerRoles.length === 0) {
      randomRolesAttribution()
    }
  }, [])

  return (
    <div className="m-1 mt-2 mb-8">
      <h1 className="text-4xl font-bold mb-6 text-center font-title">
        Attribution des Rôles
      </h1>

      <PlayerRolesGrid />

      <StickyFooter>
        <Button
          onClick={() => randomRolesAttribution()}
          variant="secondary"
          className="flex-1"
        >
          Relancer aléatoire
        </Button>

        <Button
          onClick={() => router.push('/game')}
          variant="default"
          className="flex-1"
        >
          Jouer
        </Button>
      </StickyFooter>
    </div>
  )
}

export default RolesAttributionPage 