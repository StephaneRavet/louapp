import React, { ReactNode } from 'react'

interface StickyFooterProps {
  children: ReactNode
}

export function StickyFooter({ children }: StickyFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 bg-background border-t border-border">
      <div className="container max-w-2xl mx-auto flex items-center justify-between gap-2">
        {children}
      </div>
    </div>
  )
} 