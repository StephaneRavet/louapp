import { GameSetupForm } from '@/components/game-setup-form'
import { prisma } from '@/lib/prisma'
import { Role } from '@prisma/client'

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
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Nouvelle partie de Loup</h1>
      <GameSetupForm roles={roles} />
    </div>
  )
}
