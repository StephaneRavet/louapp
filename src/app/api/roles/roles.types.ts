import { Role } from '@prisma/client';

export type CreateRoleDto = Omit<Role, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateRoleDto = Partial<CreateRoleDto>; 