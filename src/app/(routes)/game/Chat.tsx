import { useAppStore } from '@/store/index'
export function Chat() {

  const { game } = useAppStore()

  return (
    <div>
      {game.currentStep}
    </div>
  )
}
