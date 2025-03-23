import { prisma } from '@/lib/prisma'
import HomeClient from '@/app/components/home-client'
import type { Role } from '@prisma/client'

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
  return <HomeClient roles={roles} />
}
