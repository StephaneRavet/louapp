import type { Difficulty, DifficultyRole, Role } from '@prisma/client'

export type DifficultyWithRoles = Difficulty & {
  roles: (DifficultyRole & {
    role: Role
  })[]
}

export type { Difficulty, DifficultyRole }

// Types DTO
export type CreateDifficultyDto = Omit<Difficulty, 'id' | 'createdAt' | 'updatedAt' | 'roles'>;
export type UpdateDifficultyDto = Partial<CreateDifficultyDto>; 

export type CreateDifficultyRoleDto = Omit<DifficultyRole, 'id' | 'createdAt' | 'updatedAt' | 'role'>;
export type UpdateDifficultyRoleDto = Partial<CreateDifficultyRoleDto>; 
