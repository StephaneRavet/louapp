import { useAppStore } from '@/store/index'

export async function queryAPI<T>(url: string): Promise<T | undefined> {
  const { setError } = useAppStore()
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    if (!data || data.length === 0) {
      throw new Error(`Aucune donnée récupérée pour l'URL: ${url}`)
    }
    return data
  } catch (err: unknown) {
    setError(err)
    return undefined
  }
}
