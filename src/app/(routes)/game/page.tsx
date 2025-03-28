'use client'

import { useAppStore } from '@/store/index'
import { useEffect, useState } from 'react'
import { StickyFooter } from '../StickyFooter'
import { Button } from '@/components/ui/button'
import { PlayerRolesGrid } from '@/app/(routes)/game/PlayerRolesGrid'
import { Chat } from '@/app/(routes)/game/Chat'

function GamePage() {
  const { playerRoles, randomRolesAttribution, startGame, nextGameStep, game, steps } = useAppStore()
  const [buttonCaption, setButtonCaption] = useState('')

  useEffect(() => {
    if (playerRoles.length === 0) randomRolesAttribution()
    startGame()
    // updateButtonCaption(0)
  }, [])

  const updateButtonCaption = (stepId?: number) => {
    stepId = stepId ?? game.currentStep
    console.log('updateButtonCaption', stepId)
    const step = steps.find(step => step.id === stepId + 1)
    console.log('step', step)
    switch (step?.slug) {
      case 'debut_partie': { setButtonCaption('Commencer la partie'); break }
      case 'debat': { setButtonCaption('Débattre'); break }
      case 'vote': { setButtonCaption('Voter'); break }
      case 'elimination': { setButtonCaption('Dire un dernier mot'); break }
      case 'fin_partie': { setButtonCaption('Recommencer'); break }
      default: { setButtonCaption(step?.slug ?? ''); break }
    }
  }

  useEffect(updateButtonCaption, [game.currentStep])

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <PlayerRolesGrid />
      <div className="flex-1 flex justify-center p-1 border-t border-primary/50">
        <Chat />
      </div>
      <StickyFooter className="flex justify-end">
        <Button onClick={nextGameStep}>{buttonCaption}</Button>
      </StickyFooter>
    </div>
  )
}

export default GamePage
