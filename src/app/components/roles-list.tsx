'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { useGame } from '@/app/hooks/useGame'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function RolesList() {
  const {
    roles,
    selectedRoles,
    updateRoleCount,
    totalRoles,
    validPlayersCount,
    loading,
    error
  } = useGame()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Rôles</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Chargement...</div>
        </CardContent>
      </Card>
    )
  }

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
        <div className="space-y-4">
          {roles.map(role => (
            <div key={role.id} className={cn('flex flex-row', 'bg-' + role.team)}>
              <Input
                type="number"
                min="0"
                max="99"
                value={selectedRoles[role.id] ?? 0}
                onChange={e => updateRoleCount(role.id, parseInt(e.target.value, 10) || 0)}
                className="w-16"
              />
              <div className="flex flex-1 flex-col ml-3">
                <label className="text-sm font-medium">
                  {role.name}
                </label>
                <span className="text-xs text-muted-foreground">
                  {role.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 