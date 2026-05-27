<template>
    <view class="sub-page">
        <PageNavbar title="找老师" />
        <scroll-view class="scroll" scroll-y>
            <FilterTabs :tabs="teacherFilters" :active-tab="activeFilter" @change="activeFilter = $event" />
            <TeacherCard v-for="t in filteredTeachers" :key="t.id" :teacher="t" />
            <view v-if="filteredTeachers.length === 0" class="empty-wrap">
                <EmptyState text="暂无老师" />
            </view>
            <view class="bottom-space" />
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageNavbar from '@/components/PageNavbar.vue'
import FilterTabs from '@/components/FilterTabs.vue'
import TeacherCard from '@/components/TeacherCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import { teacherList, teacherFilters } from '@/mock'

const activeFilter = ref('全部')

const filteredTeachers = computed(() => {
    const key = activeFilter.value
    if (key === '全部') return teacherList
    return teacherList.filter(
        (t) => t.tags.some((tag) => tag.includes(key)) || t.subject.includes(key)
    )
})
</script>

<style lang="scss" scoped>
@use '@/common/theme.scss' as *;
.sub-page {
    min-height: 100vh;
    background: $color-page-bg;
}
.scroll {
    height: calc(100vh - 88rpx);
}
.empty-wrap {
    padding: 40rpx 0;
}
.bottom-space {
    height: 32rpx;
}
</style>
