import { useAppStore } from '@/store/index'

export function PlayerRolesGrid() {
  const { playerRoles } = useAppStore()
  
  return (
    <div className="h-full w-full">
      {playerRoles.length === 0 ? (
        <div className="text-center h-full flex items-center justify-center">
          <p className="text-lg">Attribution des rôles en cours...</p>
        </div>
      ) : (
        <div 
          className="grid grid-cols-2 gap-1 h-full" 
          style={{
            gridTemplateRows: `repeat(${Math.ceil(playerRoles.length / 2)}, minmax(0, 1fr))`
          }}
        >
          {playerRoles.map((assignment, index) => (
            <div
              key={index}
              className={`text-center rounded-lg p-2 relative card-role-${assignment.role.team} flex items-center justify-center min-h-0`}
            >
              <div className="w-full">
                <h3 className="text-xl font-bold text-white tracking-wider font-accent truncate">
                  {assignment.player}
                </h3>
                <div className="text-base text-white/50 font-mystery truncate">
                  {assignment.role.shortName}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
