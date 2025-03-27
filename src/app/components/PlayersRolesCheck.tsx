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
    <span className={`text-primary font-normal text-sm`}>
      {totalRoles === validPlayersCount ? '👍' : '❌'}
      {totalRoles} rôles pour {validPlayersCount} joueurs
    </span>
  )
}