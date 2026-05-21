import { ref, type Ref } from 'vue'

const MOCK_DELAY = 600

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export function useHomeData<T>(fetcher: () => T) {
  const data: Ref<T | null> = ref(null)
  const loading = ref(true)
  const error = ref('')

  const load = async () => {
    loading.value = true
    error.value = ''
    try {
      await delay(MOCK_DELAY)
      data.value = fetcher() as T
    } catch {
      error.value = '数据加载失败，请稍后重试'
      data.value = null
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, load }
}
