import { useState } from 'react'
import { useGameStore } from '@/store/gameStore'
export function Chat() {
  const [message, setMessage] = useState('')

  const { game } = useGameStore()

  return (
    <div>
      {game.currentStep}
    </div>
  )
}
