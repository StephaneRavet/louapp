import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAppStore } from '@/store/index'
import { cn } from '@/lib/utils'

const difficultyDescriptions = {
  very_easy: '1 Loup, 1 Voyante, 1 Cupidon, 1 Chasseur, 1 Sorcière, 1 Garde, 1 Villageois',
  easy: '2 Loups, 1 Voyante, 1 Cupidon, 1 Chasseur, 1 Sorcière, 1 Garde, 2 Villageois',
  medium: '2 Loups, 1 Voyante, 1 Cupidon, 1 Chasseur, 1 Sorcière, 1 Garde, 1 Indépendant, 2 Villageois',
  hard: '3 Loups, 1 Voyante, 1 Cupidon, 1 Chasseur, 1 Sorcière, 1 Garde, 2 Indépendants, 2 Villageois',
  very_hard: '3 Loups, 1 Voyante, 1 Cupidon, 1 Chasseur, 1 Sorcière, 1 Garde, 2 Indépendants, 1 Multi-équipe, 2 Villageois',
  expert: '4 Loups, 1 Voyante, 1 Cupidon, 1 Chasseur, 1 Sorcière, 1 Garde, 2 Indépendants, 2 Multi-équipes, 2 Villageois'
}

export function DifficultySelector() {
  const { difficulty, setDifficulty } = useAppStore()
  const [key, setKey] = React.useState(0)

  const handleDifficultyChange = (newDifficulty: string) => {
    setKey(prev => prev + 1)
    setDifficulty(newDifficulty as any)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-3xl font-title">Difficulté :</div>
        <Select value={difficulty} onValueChange={handleDifficultyChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner la difficulté" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="very_easy">⭐ Très facile</SelectItem>
            <SelectItem value="easy">✨ Facile</SelectItem>
            <SelectItem value="medium">🌟 Moyen</SelectItem>
            <SelectItem value="hard">🌠 Difficile</SelectItem>
            <SelectItem value="very_hard">💫 Très difficile</SelectItem>
            <SelectItem value="expert">⚡ Expert</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div 
        key={key}
        className="text-sm text-muted-foreground mt-2 animate-in fade-in-50 slide-in-from-bottom-2 duration-500"
      >
        Composition d'une partie de difficulté {difficulty} :<br/> {difficultyDescriptions[difficulty]}
      </div>
    </>
  )
} 