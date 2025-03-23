import { GameSetupForm } from '@/app/components/game-setup-form'
import { ThemeToggle } from '@/components/theme-toggle'

export default function HomeClient() {
  return (
    <>
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h1 className="text-4xl gothic">Nouvelle partie de Loup</h1>
        <ThemeToggle />
      </div>
      <GameSetupForm />
    </>
  )
} 