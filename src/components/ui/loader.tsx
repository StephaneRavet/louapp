import React from 'react'

interface LoaderProps {
  title?: string
  description?: string
  fullPage?: boolean
  size?: 'small' | 'medium' | 'large'
}

export function Loader({ 
  title, 
  description, 
  fullPage = false, 
  size = 'medium' 
}: LoaderProps) {
  const sizeClasses = {
    small: 'w-8 h-8 border-2',
    medium: 'w-16 h-16 border-t-4',
    large: 'w-24 h-24 border-t-6'
  }

  const containerClasses = fullPage
    ? 'flex items-center justify-center min-h-screen'
    : 'flex items-center justify-center py-4'

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div 
          className={`border-primary border-solid rounded-full animate-spin mx-auto mb-4 ${sizeClasses[size]}`}
        />
        {title && <h2 className="text-4xl font-title">{title}</h2>}
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
    </div>
  )
} 