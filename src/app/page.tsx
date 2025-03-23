import { GameSetupForm } from '@/app/components/game-setup-form'
import { prisma } from '@/lib/prisma'
import type { Role } from '@prisma/client'
import { ThemeToggle } from '@/components/theme-toggle'

async function getRoles(): Promise<Role[]> {
  return await prisma.$queryRaw<Role[]>`
    SELECT * FROM Role 
    ORDER BY 
      CASE team
        WHEN 'loups' THEN 0
        WHEN 'village' THEN 1
        WHEN 'independant' THEN 2
        WHEN 'multi' THEN 3
        ELSE 4
      END,
      id ASC
  `
}

export default async function Home() {
  const roles = await getRoles()

  return (
    <>
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Nouvelle partie de Loup</h1>
        <ThemeToggle />
      </div>
      <GameSetupForm roles={roles} />
    </>
  )
}
