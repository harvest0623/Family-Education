import { ref, computed, type Ref } from 'vue'

export function useFilterList<T extends { tags: string[]; subject: string }>(
  list: Ref<T[] | undefined>,
  filterKey: Ref<string>
) {
  const filteredList = computed(() => {
    const items = list.value ?? []
    const key = filterKey.value
    if (key === '全部') return items
    if (key === '上门') {
      return items.filter((item) => item.tags.includes('上门'))
    }
    if (key === '线上') {
      return items.filter(
        (item) =>
          item.tags.includes('线上') ||
          ('location' in item && String((item as { location?: string }).location).includes('线上'))
      )
    }
    return items.filter(
      (item) =>
        item.tags.some((tag) => tag.includes(key)) ||
        item.subject.includes(key)
    )
  })

  return { filteredList }
}
