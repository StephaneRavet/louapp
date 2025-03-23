'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGame } from '@/app/hooks/useGame'
import { cn } from '@/lib/utils'

function RolesAttributionPage() {
  const router = useRouter()
  const { playerRoles, roles, randomRolesAttribution, totalRoles, validPlayersCount, players, selectedRoles } = useGame()

  useEffect(() => {
    console.log('DEBUG RolesAttributionPage montée')
    console.log('playerRoles:', playerRoles)
    console.log('roles:', roles)
    console.log('totalRoles:', totalRoles)
    console.log('validPlayersCount:', validPlayersCount)
    console.log('players:', players)
    console.log('selectedRoles:', selectedRoles)
  }, [])

  // Attribuer les rôles si ce n'est pas déjà fait
  useEffect(() => {
    if (playerRoles.length === 0) {
      try {
        randomRolesAttribution()
      } catch (error) {
        console.error('Erreur lors de l\'attribution des rôles:', error)
      }
    }
  }, [randomRolesAttribution])

  // Trouver le nom du rôle par son ID
  const getRoleName = (roleId: number) => {
    const role = roles.find(r => r.id === roleId)
    return role ? role.name : 'Rôle inconnu'
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Attribution des Rôles</h1>

      {playerRoles.length === 0 ? (
        <div className="text-center">
          <p className="text-lg">Attribution des rôles en cours...</p>
          <p className="text-sm text-gray-500 mt-4">
            Informations de débogage:
            <br />
            Total des rôles: {totalRoles}
            <br />
            Joueurs valides: {validPlayersCount}
            <br />
            Nombre de joueurs: {players.length}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {playerRoles.map((assignment, index) => (
            <div
              key={index}
              className={cn(`rounded-lg shadow-md p-4 border border-gray-200 bg-${assignment.role.team}`)}
            >
              <h3 className="font-bold text-xl mb-2">{assignment.player}</h3>
              <div className="flex items-center">
                <span className="text-gray-100">Rôle:</span>
                <span className="ml-2 font-medium">{getRoleName(assignment.roleId)}</span>
              </div>
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