'use client'

import { useRouter } from 'next/navigation'
import { useGameStore } from '@/store/gameStore'
import { useEffect } from 'react'
import { StickyFooter } from '../components/StickyFooter'
import { Button } from '@/components/ui/button'

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
    <>
      <StickyFooter className="flex justify-end">
        <Button onClick={handleAttributeRoles}>Attribuer les rôles</Button>
      </StickyFooter>
    </>
  )
}

export default GamePage
