import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'

async function getRoles() {
  return await prisma.role.findMany({
    orderBy: {
      team: 'asc'
    }
  })
}

export default async function Home() {
  const roles = await getRoles()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Nouvelle partie de Loup-Garou</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulaire des joueurs */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Joueurs</h2>
          
          <div className="space-y-4">
            <div className="players-list space-y-2" id="players-list">
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Nom du joueur"
                />
                <button 
                  className="text-red-500 hover:text-red-700"
                  type="button"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              id="add-player-btn"
            >
              Ajouter un joueur
            </Button>
          </div>
        </div>
        
        {/* Sélection des rôles */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Rôles</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              {roles.map((role) => (
                <div key={role.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`role-${role.id}`}
                    className="mr-2 h-4 w-4"
                  />
                  <label 
                    htmlFor={`role-${role.id}`}
                    className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${role.color ? '' : 'bg-gray-400'}`} style={{ backgroundColor: role.color || undefined }}></span>
                    {role.name}
                    <span className="ml-2 text-xs text-gray-500">({role.team})</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    defaultValue="1"
                    className="w-16 h-8 rounded-md border border-input bg-background px-2 py-1 text-sm shadow-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button className="px-8">
          Commencer la partie
        </Button>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', () => {
          const playersList = document.getElementById('players-list');
          const addPlayerBtn = document.getElementById('add-player-btn');
          
          if (playersList && addPlayerBtn) {
            addPlayerBtn.addEventListener('click', () => {
              const playerDiv = document.createElement('div');
              playerDiv.className = 'flex items-center gap-2';
              playerDiv.innerHTML = \`
                <input 
                  type="text" 
                  class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Nom du joueur"
                />
                <button 
                  class="text-red-500 hover:text-red-700"
                  type="button"
                >
                  ✕
                </button>
              \`;
              
              playersList.appendChild(playerDiv);
              
              const removeBtn = playerDiv.querySelector('button');
              if (removeBtn) {
                removeBtn.addEventListener('click', () => {
                  playerDiv.remove();
                });
              }
            });
            
            // Ajouter l'événement de suppression pour le premier joueur
            const firstRemoveBtn = playersList.querySelector('button');
            if (firstRemoveBtn) {
              firstRemoveBtn.addEventListener('click', (e) => {
                e.target.closest('div').remove();
              });
            }
          }
        });
      `}} />
    </div>
  )
}
