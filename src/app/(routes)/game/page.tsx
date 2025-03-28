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
  }, [])

  const updateButtonCaption = (stepId?: number) => {
    stepId = stepId ?? game.currentStep
    const step = steps.find(step => step.id === stepId + 2)
    if (step) setButtonCaption(step.name); else setButtonCaption('')
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
