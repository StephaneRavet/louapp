import { useGameStore } from '@/store/gameStore'

export function PlayerRolesGrid() {
  const { playerRoles } = useGameStore()
  return <>
    {playerRoles.length === 0 ? (
      <div className="text-center">Attribution des rôles en cours...</div>
    ) : (
      <div className={`grid grid-cols-3 -m-4 -mt-7`}>
        {playerRoles.map((assignment, index) => (
          <div
            key={index}
            className={`text-center p-1 relative card-role-${assignment.role.team}`}
          >
            <div>
              <h3 className={`text-sm text-white tracking-wider font-accent`}>
                {assignment.player}
              </h3>
              <div className={`text-xs text-white/50 font-mystery whitespace-nowrap`}>{assignment.role.shortName}</div>
            </div>
          </div>
        ))}
      </div>
    )}
  </>
}