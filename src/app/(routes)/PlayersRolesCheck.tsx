'use client'
import { useAppStore } from '@/store/index';

export function PlayersRolesCheck() {

  const {
    getTotalSelectedRoles,
    getValidPlayersCount,
  } = useAppStore()

  const totalRoles = getTotalSelectedRoles()
  const validPlayersCount = getValidPlayersCount()

  return (
    <span className={`text-primary font-normal text-sm`}>
      {totalRoles === validPlayersCount ? '👍' : '❌'}
      {totalRoles} rôles pour {validPlayersCount} joueurs
    </span>
  )
}