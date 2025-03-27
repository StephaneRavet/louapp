'use client'

import { useGameStore } from '@/store/gameStore'
import { useEffect } from 'react'
import { StickyFooter } from '../StickyFooter'
import { Button } from '@/components/ui/button'
import { PlayerRolesGrid } from '@/app/(routes)/game/PlayerRolesGrid'
import { Chat } from '@/app/(routes)/game/Chat'

function GamePage() {
  const { playerRoles, randomRolesAttribution, startGame, nextStep } = useGameStore()
  
  useEffect(() => {
    if (playerRoles.length === 0) {
      randomRolesAttribution()
    }
    startGame()
  }, [])
  
  const continueGame = () => {
    nextStep()
  }
    
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <PlayerRolesGrid />
      <div className="flex-1 flex justify-center p-1 border-t border-primary/50">
        <Chat/>
      </div>
      <StickyFooter className="flex justify-end">
        <Button onClick={continueGame}>Continuer</Button>
      </StickyFooter>
    </div>
  )
}

export default GamePage
