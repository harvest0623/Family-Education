import { ref } from 'vue'

export function usePullRefresh(onRefresh: () => Promise<void>) {
  const refreshing = ref(false)

  const handleRefresh = async () => {
    if (refreshing.value) return
    refreshing.value = true
    try {
      await onRefresh()
    } finally {
      refreshing.value = false
      uni.stopPullDownRefresh()
    }
  }

  return { refreshing, handleRefresh }
}
