import { levelsRepository } from '~~/repositories/levels.repository'

export const useLevels = () => {
  const supabase = useSupabaseClient()

  const levels = ref([])
  const loading = ref(false)
  const error = ref(null)

  const repo = levelsRepository(supabase)

  const fetchLevels = async () => {
    try {
      loading.value = true
      levels.value = await repo.getAllLevels()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    levels,
    loading,
    error,
    fetchLevels
  }
}
