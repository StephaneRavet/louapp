'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/store/index'
import { Button } from '@/components/ui/button'
import { StickyFooter } from '@/app/(routes)/StickyFooter'
import { PlayerRolesGrid } from '@/app/(routes)/game/roles/PlayerRolesGrid'

function RolesAttributionPage() {
  const router = useRouter()
  const { playerRoles, randomRolesAttribution } = useAppStore()

  // Attribuer les rôles si ce n'est pas déjà fait
  useEffect(() => {
    if (playerRoles.length === 0) {
      randomRolesAttribution()
    }
  }, [playerRoles.length, randomRolesAttribution])

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <h1 className="text-4xl font-bold py-4 text-center font-title">
        Attribution des Rôles
      </h1>

      {/* Ajout de min-h-0 pour que le conteneur puisse se réduire sans dépasser */}
      <div className="flex-1 min-h-0 overflow-auto pb-13">
        <PlayerRolesGrid />
      </div>

      <StickyFooter>
        <Button
          onClick={() => randomRolesAttribution()}
          variant="secondary"
          className="flex-1"
        >
          🎲Relancer aléatoire
        </Button>

        <Button
          onClick={() => router.push('/game/play')}
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
