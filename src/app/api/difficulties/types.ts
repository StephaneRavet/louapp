import type { Difficulty } from '@prisma/client'

export type CreateDifficultyDto = Omit<Difficulty, 'id' | 'createdAt' | 'updatedAt' | 'roles'> & {
  roles: {
    roleId: number
    quantity: number
  }[]
}

export type UpdateDifficultyDto = Partial<Omit<CreateDifficultyDto, 'roles'>> &
  Pick<CreateDifficultyDto, 'roles'>
