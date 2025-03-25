'use client'

import React from 'react'
import { useGameStore } from '@/app/store/gameStore'
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
    getTotalRoles,
    getValidPlayersCount,
    error
  } = useGameStore()

  const totalRoles = getTotalRoles()
  const validPlayersCount = getValidPlayersCount()

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Rôles</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-red-500">{error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex">
          <span>Rôles</span>
          <span className={`text-sm font-normal ml-3 ${totalRoles < validPlayersCount
            ? 'text-yellow-500'
            : totalRoles === validPlayersCount
              ? 'text-primary'
              : 'text-red-500'
            }`}>
            {totalRoles} rôles pour {validPlayersCount} joueurs
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {roles.map(role => (
            <div key={role.slug} className={cn(`flex flex-row bg-team-${role.team} rounded p-2`)}>
              <div className="text-3xl font-bold w-6 text-center gothic">
                {selectedRoles[role.slug]?.count || null}
              </div>
              <div className="flex flex-1 flex-col ml-3">
                <label className="text-sm font-medium">
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
      </CardContent>
    </Card>
  )
} 