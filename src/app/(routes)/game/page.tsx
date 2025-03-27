'use client'

import { useRouter } from 'next/navigation'
import { useGameStore } from '@/store/gameStore'
import { useEffect } from 'react'
import { StickyFooter } from '../StickyFooter'
import { Button } from '@/components/ui/button'
import { PlayerRolesGrid } from '@/app/(routes)/game/PlayerRolesGrid'
import { Chat } from '@/app/(routes)/game/roles/Chat'

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
  
  const nextStep = () => {
    console.log('Clic sur Attribuer les rôles')
    router.push('/game/roles')
  }
    
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <PlayerRolesGrid />
      <div className="flex-1 flex justify-center mt-5 pt-1 border-t border-primary/50">
        <Chat/>
      </div>
      <StickyFooter className="flex justify-end">
        <Button onClick={nextStep}>Continuer</Button>
      </StickyFooter>
    </div>
  )
}

export default GamePage
