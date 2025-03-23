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
    playerRoles,
    lastAddedIndex,
    loading,
    error,
    fetchRoles,
    addPlayer,
    removePlayer,
    updatePlayerName,
    updateRoleCount,
    randomRolesAttribution,
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
  
  // Calculer les valeurs à l'avance
  const totalRoles = getTotalRoles()
  const validPlayersCount = getValidPlayersCount()
  
  // Ajouter un log pour le débogage
  useEffect(() => {
    console.log('DEBUG useGame hook:')
    console.log('- totalRoles:', totalRoles)
    console.log('- validPlayersCount:', validPlayersCount)
    console.log('- players:', players)
    console.log('- selectedRoles:', selectedRoles)
  }, [totalRoles, validPlayersCount, players, selectedRoles])
  
  return {
    // État
    roles,
    players,
    selectedRoles,
    playerRoles,
    lastAddedIndex,
    loading,
    error,
    
    // Actions
    addPlayer,
    removePlayer,
    updatePlayerName,
    updateRoleCount,
    randomRolesAttribution,
    startGame,
    
    // Valeurs calculées
    totalRoles,
    validPlayersCount
  }
} 