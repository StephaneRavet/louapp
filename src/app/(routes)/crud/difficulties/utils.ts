type RoleWithQuantity = {
  role: {
    name: string
    team: string
  }
  quantity: number
}

export function formatRoles(roles: RoleWithQuantity[]): string {
  return roles
    .map(({ role, quantity }) => `${quantity} ${role.name}`)
    .join(', ')
} 