'use client'

import { useGameStore } from '@/app/store/gameStore'
import { FEATURES } from '@/app/config'

export function DevToolbar() {
  const { toggleDefaultRoles, useDefaultRoles, fetchRoles } = useGameStore()

  // Rechargement de la page pour réinitialiser les joueurs (impacte le playerSlice)
  const resetPlayers = () => {
    window.location.reload()
  }

  // Si la fonctionnalité auto-init est désactivée dans la config, on n'affiche pas la toolbar
  if (!FEATURES.AUTO_INIT) return null

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 p-2 bg-gray-800 text-white rounded-md z-50 text-xs">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span>Rôles prédéfinis:</span>
          <button 
            className={`px-2 py-1 rounded ${useDefaultRoles ? 'bg-green-500' : 'bg-red-500'}`}
            onClick={toggleDefaultRoles}
          >
            {useDefaultRoles ? 'Activé' : 'Désactivé'}
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <span>Joueurs prédéfinis:</span>
          <button 
            className="px-2 py-1 bg-blue-500 rounded"
            onClick={resetPlayers}
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  )
} 