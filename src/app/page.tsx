import { GameSetupForm } from '@/components/game-setup-form'
import { prisma } from '@/lib/prisma'

async function getRoles() {
  return await prisma.role.findMany({
    orderBy: {
      team: 'asc'
    }
  })
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
