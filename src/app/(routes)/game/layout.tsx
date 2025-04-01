export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container max-w-sm mx-auto space-y-3">
      {children}
    </div>
  )
} 