'use client'

import React, { useEffect, useState } from 'react'
import { useGameStore } from '@/app/store/gameStore'

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-primary border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-4xl gothic">Chargement du jeu...</h2>
          <p className="text-muted-foreground">Récupération des rôles en cours</p>
        </div>
      </div>
    )
  }
  
  return <>{children}</>
} 