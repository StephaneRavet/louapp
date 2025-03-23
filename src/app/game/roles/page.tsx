'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore } from '@/app/store/gameStore'
import { cn } from '@/lib/utils'

function RolesAttributionPage() {
  const router = useRouter()
  const { playerRoles, randomRolesAttribution } = useGameStore()

  // Attribuer les rôles si ce n'est pas déjà fait
  useEffect(() => {
    console.log('DEBUG RolesAttributionPage')
    if (playerRoles.length === 0) {
      randomRolesAttribution()
    }
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Attribution des Rôles</h1>

      {playerRoles.length === 0 ? (
        <div className="text-center">
          <p className="text-lg">Attribution des rôles en cours...</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {playerRoles.map((assignment, index) => (
            <div
              key={index}
              className={cn(`rounded-lg shadow-md p-4 border border-gray-200`)}
            >
              <h3 className="font-bold text-xl mb-2">{assignment.player}</h3>
              <div className="flex items-center">
                <span className="text-gray-100">Rôle:</span>
                <span className="ml-2 font-medium">{assignment.role}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <button onClick={() => router.push('/game')} className="primary">
          Jouer
        </button>
      </div>
    </div>
  )
}

export default RolesAttributionPage 