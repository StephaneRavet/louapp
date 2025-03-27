import { useGameStore } from '@/store/gameStore'

export function PlayerRolesGrid() {
  const { playerRoles } = useGameStore()
  return <>
    {playerRoles.length === 0 ? (
      <div className="text-center">
        <p className="text-lg">Attribution des rôles en cours...</p>
      </div>
    ) : (
      <div className={`grid gap-2 grid-cols-2`}>
        {playerRoles.map((assignment, index) => (
          <div
            key={index}
            className={`text-center rounded-lg p-4 relative card-role-${assignment.role.team}`}
          >
            <div>
              <h3 className={`text-2xl font-bold text-white tracking-wider font-accent`}>
                {assignment.player}
              </h3>
              <div className={`text-lg text-white/50 font-mystery`}>
                {assignment.role.shortName}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </>
}