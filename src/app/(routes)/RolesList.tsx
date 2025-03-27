'use client'

import React from 'react'
import { useGameStore } from '@/store/gameStore'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function RolesList() {
  const {
    roles,
    selectedRoles,
    incRoleCount,
    decRoleCount,
  } = useGameStore()

  return (
    <>
      <div className="text-3xl font-title -mb-3">Sélectionnez des rôles :</div>
      <div className="space-y-2 pb-7">
        {roles.map(role => (
          <div key={role.slug} className={cn(`flex flex-row card-role-${role.team} rounded p-2`)}>
            <div className="text-3xl font-bold w-6 text-center font-gothic1">
              {selectedRoles[role.slug]?.count || null}
            </div>
            <div className="flex flex-1 flex-col ml-3">
              <label className="text-sm font-medium font-mystery">
                {role.name}
              </label>
              <span className="text-xs text-muted-foreground">
                {role.description}
              </span>
            </div>
            <div className="flex items-center space-x-1 ml-3">
              <Button variant="outline" onClick={() => decRoleCount(role.slug)}>-</Button>
              <Button variant="outline" onClick={() => incRoleCount(role.slug)}>+</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
} 