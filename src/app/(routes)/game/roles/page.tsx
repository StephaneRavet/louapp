'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore } from '@/store/gameStore'
import { Button } from '@/components/ui/button'
import { StickyFooter } from '@/app/(routes)/components/StickyFooter'
import { PlayerRolesGrid } from '@/app/(routes)/game/roles/components/PlayerRolesGrid'

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
    <>
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
    </>
  )
}

export default RolesAttributionPage 