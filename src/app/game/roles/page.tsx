'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore } from '@/app/store/gameStore'
import { cn } from '@/lib/utils'

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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center gothic">Attribution des Rôles</h1>

      {playerRoles.length === 0 ? (
        <div className="text-center">
          <p className="text-lg">Attribution des rôles en cours...</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {playerRoles.map((assignment, index) => (
            <div
              key={index}
              className={cn(`text-center rounded-lg shadow-md p-4 border border-gray-200 bg-team-${assignment.role.team}`)}
            >
              <h3 className="text-2xl mb-1">{assignment.player}</h3>
              <div className="text-muted-foreground text-xl">{assignment.role.shortName}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <button onClick={() => router.push('/game')} className="primary">
          Jouer
        </button>
      </div>
    </div>
  )
}

export default RolesAttributionPage 