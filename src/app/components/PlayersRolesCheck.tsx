'use client'
import { useGameStore } from '@/app/store/gameStore';

export function PlayersRolesCheck() {

  const {
    getTotalSelectedRoles,
    getValidPlayersCount,
  } = useGameStore()

  const totalRoles = getTotalSelectedRoles()
  const validPlayersCount = getValidPlayersCount()

  return (
    <span className={`text-sm font-normal ml-3 ${totalRoles < validPlayersCount
        ? 'text-yellow-500'
        : totalRoles === validPlayersCount
          ? 'text-primary'
          : 'text-red-500'
      }`}>
      {totalRoles} rôles pour {validPlayersCount} joueurs
    </span>
  )
}