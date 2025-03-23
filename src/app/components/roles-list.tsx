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
        <CardTitle className="flex items-center justify-between">
          <span>Rôles</span>
          <span className={`text-sm font-normal mr-6 ${
            totalRoles < validPlayersCount
              ? 'text-yellow-500'
              : totalRoles === validPlayersCount
                ? 'text-green-500'
                : 'text-red-500'
          }`}>
            {totalRoles}/{validPlayersCount}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {roles.map(role => (
            <div key={role.id} className="flex items-center">
              <div className="flex items-center flex-1">
                <label
                  className="text-sm font-medium flex items-center cursor-pointer flex-1"
                >
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: role.color || '#9CA3AF' }}
                  />
                  {role.name}
                  <span className="text-xs text-muted-foreground ml-1">
                    ({role.team})
                  </span>
                </label>
              </div>
              <Input
                type="number"
                min="0"
                max="99"
                value={selectedRoles[role.id] ?? 0}
                onChange={e => updateRoleCount(role.id, parseInt(e.target.value, 10) || 0)}
                className="w-16"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 