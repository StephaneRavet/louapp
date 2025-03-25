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
  const { isRolesReady, ensureRolesLoaded } = useGameStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    async function loadRoles() {
      if (!isRolesReady) {
        await ensureRolesLoaded()
      }
      setIsInitialized(true)
    }

    loadRoles()
  }, [isRolesReady, ensureRolesLoaded])

  if (!isInitialized || !isRolesReady) {
    return <LoaderWrapper />
  }

  return (
    <Suspense fallback={<LoaderWrapper />}>
      {children}
    </Suspense>
  )
} 