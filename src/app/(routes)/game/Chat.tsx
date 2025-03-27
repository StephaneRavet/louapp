import { useAppStore } from '@/store/index'
import { useEffect, useRef } from 'react'

export function Chat() {
  const { game } = useAppStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [game.messages])

  return (
    <div className='flex flex-col text-sm w-full'>
      <div className='h-[calc(100vh-14rem-2px)] overflow-y-scroll flex flex-col gap-1 pb-3'>
        {game.messages.map((message, index) => (
          <div key={index}>{message.content}</div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
