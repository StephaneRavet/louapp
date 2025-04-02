import type { Difficulty, DifficultyRole } from '@prisma/client'

export type CreateDifficultyDto = Omit<Difficulty, 'id' | 'createdAt' | 'updatedAt' | 'roles'>;
export type UpdateDifficultyDto = Partial<CreateDifficultyDto>; 

export type CreateDifficultyRoleDto = Omit<DifficultyRole, 'id' | 'createdAt' | 'updatedAt' | 'role'>;
export type UpdateDifficultyRoleDto = Partial<CreateDifficultyRoleDto>; 