import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const entities = [
  {
    name: 'Rôles',
    description: 'Gérer les rôles du jeu',
    href: '/crud/roles',
    icon: '🎭'
  },
  {
    name: 'Difficultés',
    description: 'Gérer les niveaux de difficulté',
    href: '/crud/difficulties',
    icon: '⚡'
  },
  // Ajoutez d'autres entités ici au fur et à mesure
]

export default function CrudPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Administration</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entities.map((entity) => (
          <Link key={entity.href} href={entity.href}>
            <Card className="hover:bg-accent transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>{entity.icon}</span>
                  {entity.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{entity.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
