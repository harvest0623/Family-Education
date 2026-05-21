<template>
  <view class="sub-page">
    <PageNavbar title="找兼职" />
    <scroll-view class="scroll" scroll-y>
      <FilterTabs :tabs="jobFilters" :active-tab="activeFilter" @change="activeFilter = $event" />
      <JobCard v-for="job in filteredJobs" :key="job.id" :job="job" />
      <view v-if="filteredJobs.length === 0" class="empty-wrap">
        <EmptyState text="暂无兼职" />
      </view>
      <view class="bottom-space" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageNavbar from '@/components/PageNavbar.vue'
import FilterTabs from '@/components/FilterTabs.vue'
import JobCard from '@/components/JobCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import { jobList, jobFilters } from '@/mock'

const activeFilter = ref('全部')

const filteredJobs = computed(() => {
  const key = activeFilter.value
  if (key === '全部') return jobList
  if (key === '上门') return jobList.filter((j) => j.tags.includes('上门'))
  return jobList.filter(
    (j) => j.tags.some((t) => t.includes(key)) || j.subject.includes(key)
  )
})
</script>

<style lang="scss" scoped>
@import '@/common/theme.scss';
.sub-page {
  min-height: 100vh;
  background: $color-page-bg;
  display: flex;
  flex-direction: column;
}
.scroll {
  flex: 1;
  height: calc(100vh - 88rpx);
}
.empty-wrap {
  padding: 40rpx 0;
}
.bottom-space {
  height: 32rpx;
}
</style>
