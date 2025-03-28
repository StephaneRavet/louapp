'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useAppStore } from '@/store/index'
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
  const { rolesLoaded, gameStepsLoaded } = useAppStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (rolesLoaded && gameStepsLoaded) setIsInitialized(true)
  }, [rolesLoaded, gameStepsLoaded])

  if (!isInitialized) {
    return <LoaderWrapper />
  }

  return (
    <Suspense fallback={<LoaderWrapper />}>
      {children}
    </Suspense>
  )
} 