'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGame } from '@/app/hooks/useGame'

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
    console.log('Essai d\'attribution des rôles')
    if (playerRoles.length === 0) {
      console.log('Attribution des rôles en cours...')
      try {
        randomRolesAttribution()
        console.log('Attribution des rôles terminée')
      } catch (error) {
        console.error('Erreur lors de l\'attribution des rôles:', error)
      }
    } else {
      console.log('Les rôles sont déjà attribués')
    }
  }, [playerRoles, randomRolesAttribution])
  
  // Temporairement désactivé pour le débogage
  /*
  // Rediriger si pas assez de joueurs ou rôles
  useEffect(() => {
    if (validPlayersCount === 0 || totalRoles === 0) {
      router.push('/game')
    }
  }, [validPlayersCount, totalRoles, router])
  */
  
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
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
            >
              <h3 className="font-bold text-xl mb-2">{assignment.player}</h3>
              <div className="flex items-center">
                <span className="text-gray-700">Rôle:</span>
                <span className="ml-2 font-medium">{getRoleName(assignment.roleId)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6 text-center">
        <button
          onClick={() => router.push('/game')}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
        >
          Retour au jeu
        </button>
      </div>
    </div>
  )
}

export default RolesAttributionPage 