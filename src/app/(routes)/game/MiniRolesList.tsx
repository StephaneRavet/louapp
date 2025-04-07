'use client'

import { useAppStore } from '@/store/index'
import { cn } from '@/lib/utils'

export function MiniRolesList() {
  const {
    roles,
    selectedRoles,
    incRoleCount,
    decRoleCount,
  } = useAppStore()

  return (
    <div className="grid grid-cols-5 gap-1 select-none">
      {roles.map(role => (
        <div
          key={role.slug}
          className={cn(`flex items-center card-role-${role.team} rounded`)}
        >
          <div className="flex-1 p-1 pl-2" onClick={() => incRoleCount(role.slug)} >
            <label className="text-xs font-medium font-mystery cursor-pointer">
              {role.code}
            </label>
          </div>
          <div className="text-lg font-bold text-center font-gothic1 pr-2 cursor-pointer"
            onClick={() => decRoleCount(role.slug)}
          >
            {selectedRoles[role.slug]?.count || null}
          </div>
        </div>
      ))}
    </div>
  )
} 