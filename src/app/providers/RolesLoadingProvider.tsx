'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useGameStore } from '@/app/store/gameStore'
import { Loader } from '@/components/ui/loader'

const LoaderWrapper = () => (
  <Loader
    fullPage
    title="Chargement..."
    description="Récupération des données en cours"
    size="medium"
  />
)

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
    return <LoaderWrapper />
  }

  return (
    <Suspense fallback={<LoaderWrapper />}>
      {children}
    </Suspense>
  )
} 