'use client'

import { GameSetupForm } from '@/app/components/game-setup-form'
import { useGameManager } from '@/app/hooks/useGameManager'
import { ThemeToggle } from '@/components/theme-toggle'
import type { Role } from '@prisma/client'

export default function HomeClient({ roles }: { roles: Role[] }) {
  const gameManager = useGameManager(roles)

  return (
    <>
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Nouvelle partie de Loup</h1>
        <ThemeToggle />
      </div>
      <GameSetupForm 
        roles={roles}
        players={gameManager.players}
        selectedRoles={gameManager.selectedRoles}
        lastAddedIndex={gameManager.lastAddedIndex}
        totalRoles={gameManager.totalRoles}
        validPlayersCount={gameManager.validPlayersCount}
        onAddPlayer={gameManager.addPlayer}
        onRemovePlayer={gameManager.removePlayer}
        onUpdatePlayerName={gameManager.updatePlayerName}
        onUpdateRoleCount={gameManager.updateRoleCount}
        onStartGame={gameManager.startGame}
      />
    </>
  )
} 