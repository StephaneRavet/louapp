'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore } from '@/app/store/gameStore'
import { cn } from '@/lib/utils'
import { TEAM_SORT_ORDER } from '@/app/config'
import { Button } from '@/components/ui/button'

function RolesAttributionPage() {
  const router = useRouter()
  const { playerRoles, randomRolesAttribution } = useGameStore()

  // Attribuer les rôles si ce n'est pas déjà fait
  useEffect(() => {
    if (playerRoles.length === 0) {
      randomRolesAttribution()
    }
  }, [])

  // Trier les rôles selon l'ordre défini dans la configuration
  const sortedPlayerRoles = [...playerRoles].sort((a, b) => {
    const teamOrderA = TEAM_SORT_ORDER[a.role.team] ?? Object.keys(TEAM_SORT_ORDER).length;
    const teamOrderB = TEAM_SORT_ORDER[b.role.team] ?? Object.keys(TEAM_SORT_ORDER).length;

    if (teamOrderA !== teamOrderB) {
      return teamOrderA - teamOrderB;
    }

    // Si même équipe, trier par ID ou nom du joueur
    return a.player.localeCompare(b.player);
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center" style={{ fontFamily: "UnifrakturCook, cursive" }}>
        Attribution des Rôles
      </h1>

      {playerRoles.length === 0 ? (
        <div className="text-center">
          <p className="text-lg">Attribution des rôles en cours...</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedPlayerRoles.map((assignment, index) => (
            <div
              key={index}
              className={`card-role card-role-${assignment.role.team}`}
            >
              <div className="card-role-content">
                <h3 className="card-role-title">{assignment.player}</h3>
                <div className="card-role-subtitle">{assignment.role.shortName}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-between gap-4">
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
      </div>
    </div>
  )
}

export default RolesAttributionPage 