'use client'

import React, { useEffect, useState } from 'react'
import { useGameStore } from '@/app/store/gameStore'
import { Loader } from '@/components/ui/loader'

export function RolesLoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    async function loadRoles() {
      await useGameStore.getState().ensureRolesLoaded()
      setIsLoading(false)
    }
    
    loadRoles()
  }, [])
  
  if (isLoading) {
    return (
      <Loader 
        fullPage 
        title="Chargement du jeu..." 
        description="Récupération des rôles en cours" 
        size="medium" 
      />
    )
  }
  
  return <>{children}</>
} 