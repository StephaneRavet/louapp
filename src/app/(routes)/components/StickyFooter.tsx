import React, { ReactNode } from 'react'

interface StickyFooterProps {
  children: ReactNode
  className?: string
}

export function StickyFooter({ children, className }: StickyFooterProps) {
  return (
    <div className={`fixed bottom-0 left-0 right-0 p-1 bg-gradient border-t border-primary/50`}>
      <div className={`container max-w-2xl mx-auto flex items-center justify-between gap-2 ${className}`}>
        {children}
      </div>
    </div>
  )
} 