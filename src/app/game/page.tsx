'use client'

import { useRouter } from 'next/navigation'
import { useGameStore } from '@/app/store/gameStore'
import { useEffect } from 'react'

function GamePage() {
  const router = useRouter()
  const { getTotalSelectedRoles, getValidPlayersCount, selectedRoles, players } = useGameStore()
  const totalRoles = getTotalSelectedRoles()
  const validPlayersCount = getValidPlayersCount()
  
  useEffect(() => {
    console.log('Valeurs de débogage:')
    console.log('totalRoles:', totalRoles)
    console.log('validPlayersCount:', validPlayersCount)
    console.log('selectedRoles:', selectedRoles)
    console.log('players:', players)
    console.log('isAttributionDisabled:', totalRoles === 0 || validPlayersCount === 0 || totalRoles !== validPlayersCount)
  }, [totalRoles, validPlayersCount, selectedRoles, players])
  
  const handleAttributeRoles = () => {
    console.log('Clic sur Attribuer les rôles')
    router.push('/game/roles')
  }
  
  // Condition temporairement désactivée pour déboguer
  const isAttributionDisabled = false // totalRoles === 0 || validPlayersCount === 0 || totalRoles !== validPlayersCount
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestion de la partie</h1>
      
      <div className="flex flex-col items-center space-y-4">
        <div className="text-center mb-4">
          <p>Rôles sélectionnés: {totalRoles}</p>
          <p>Joueurs valides: {validPlayersCount}</p>
          <p>Nombre de joueurs: {players.length}</p>
        </div>
        
        <p className="text-red-500 text-sm">
          {totalRoles === 0 
            ? "Aucun rôle n'a été sélectionné" 
            : validPlayersCount === 0 
              ? "Aucun joueur valide" 
              : totalRoles !== validPlayersCount 
                ? "Le nombre de rôles doit être égal au nombre de joueurs"
                : ""}
        </p>
      </div>
    </div>
  )
}

export default GamePage
