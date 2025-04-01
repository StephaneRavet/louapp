export default function CrudLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto space-y-3 p-3">
      {children}
    </div>
  )
} 