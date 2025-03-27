export async function queryAPI<T>(
  url: string,
  setError: (error: unknown) => void
): Promise<T> {
  try {
    const response = await fetch(`/api/${url}`)
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
    throw err
  }
}
