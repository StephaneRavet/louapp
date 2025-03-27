'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore } from '@/store/gameStore'
import { TEAM_SORT_ORDER } from '@/config/config'
import { Button } from '@/components/ui/button'
import { StickyFooter } from '@/app/(routes)/components/StickyFooter'

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
    <>
      <h1 className="text-4xl font-bold mb-6 text-center font-title">
        Attribution des Rôles
      </h1>

      {playerRoles.length === 0 ? (
        <div className="text-center">
          <p className="text-lg">Attribution des rôles en cours...</p>
        </div>
      ) : (
        <div className="grid gap-2 grid-cols-2 lg:grid-cols-3">
          {sortedPlayerRoles.map((assignment, index) => (
            <div
              key={index}
              className={`text-center rounded-lg p-4 relative overflow-hidden card-role-${assignment.role.team}`}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white tracking-wider font-accent">
                  {assignment.player}
                </h3>
                <div className="text-xl text-white/50 font-mystery">
                  {assignment.role.shortName}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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