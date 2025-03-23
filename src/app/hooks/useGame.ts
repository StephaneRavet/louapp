'use client'

import { useEffect, useRef } from 'react'
import { useGameStore } from '@/app/store/gameStore'

// Ce hook permet de faciliter l'utilisation du store et d'initialiser les données
export function useGame() {
  const isInitialized = useRef(false)
  
  const {
    roles,
    players,
    selectedRoles,
    lastAddedIndex,
    loading,
    error,
    fetchRoles,
    addPlayer,
    removePlayer,
    updatePlayerName,
    updateRoleCount,
    startGame,
    getTotalRoles,
    getValidPlayersCount,
  } = useGameStore()
  
  // Charger les rôles au premier rendu seulement
  useEffect(() => {
    if (!isInitialized.current && roles.length === 0) {
      fetchRoles()
      isInitialized.current = true
    }
  }, [fetchRoles, roles.length])
  
  return {
    // État
    roles,
    players,
    selectedRoles,
    lastAddedIndex,
    loading,
    error,
    
    // Actions
    addPlayer,
    removePlayer,
    updatePlayerName,
    updateRoleCount,
    startGame,
    
    // Valeurs calculées
    totalRoles: getTotalRoles(),
    validPlayersCount: getValidPlayersCount()
  }
} 