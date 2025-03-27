import { StateCreator } from 'zustand';
import { AppState } from '@/store/index';

export type AppSlice = {
  error: string | null
  loading: boolean
  // --
  setError: (err: unknown) => void
  setLoading: (loading: boolean) => void
}

export const createAppSlice: StateCreator<AppState, [], [], AppSlice> = (set) => ({
  error: null,
  loading: false,
  // --
  setError: (err: unknown) => {
    const error = err instanceof Error
      ? err.message
      : typeof err === 'string'
        ? err
        : 'Une erreur inconnue est survenue'
    console.error(error)
    set({ error })
  },
  setLoading: (loading: boolean) => set({ loading }),
})