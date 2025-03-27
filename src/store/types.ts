import type { PlayerSlice } from './slices/playerSlice'
import type { RoleSlice } from './slices/roleSlice'
import type { GameSlice } from './slices/gameSlice'

// Le type complet du store qui combine tous les slices
export type GameState = PlayerSlice & RoleSlice & GameSlice 