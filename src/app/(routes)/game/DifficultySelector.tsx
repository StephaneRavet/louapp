import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAppStore } from '@/store/index'
import type { DifficultyWithRoles } from '@/types/difficulty'

export function DifficultySelector() {
  const { difficulties, difficulty, setDifficulty } = useAppStore()
  const [key, setKey] = React.useState(0)

  const handleDifficultyChange = (newDifficulty: string) => {
    setKey(prev => prev + 1)
    setDifficulty(newDifficulty)
  }

  const currentDifficulty = difficulties.find(d => d.slug === difficulty) as DifficultyWithRoles
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-3xl font-title">Difficulté :</div>
        <Select value={difficulty} onValueChange={handleDifficultyChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner la difficulté" />
          </SelectTrigger>
          <SelectContent>
            {difficulties.map(d => (
              <SelectItem key={d.slug} value={d.slug}>
                {d.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div 
        key={key}
        className="text-sm text-muted-foreground mt-2 animate-in fade-in-50 slide-in-from-bottom-2 duration-500"
      >
        {currentDifficulty?.description}
      </div>
    </>
  )
} 