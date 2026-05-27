<template>
    <view class="page">
        <HomeHeader title="学生端" slogan="找兼职 · 赚收入 · 提能力" :message-count="3">
            <SearchBar role="student" placeholder="搜索兼职、科目、地点" />
        </HomeHeader>
        <scroll-view
            class="page-scroll"
            scroll-y
            :refresher-enabled="true"
            :refresher-triggered="refreshing"
            refresher-background="#f5f7fa"
            @refresherrefresh="handleRefresh"
        >
            <template v-if="loading">
                <LoadingView />
            </template>
            <template v-else-if="error">
                <EmptyState :text="error" subtext="下拉刷新重试" />
            </template>
            <template v-else-if="homeData">
                <NoticeBar :notices="homeData.notices" tag="通知" role="student" />
                <HomeBanner :banners="homeData.banners" role="student" />
                <QuickStats :items="homeData.stats" />
                <FunctionGrid :items="homeData.navItems" />
                <SectionTitle
                    title="推荐兼职"
                    subtitle="为你精选附近优质岗位"
                    :show-more="true"
                    @more="onGoFullList"
                />
                <FilterTabs
                    :tabs="homeData.filters"
                    :active-tab="activeFilter"
                    @change="onFilterChange"
                />
                <JobCard v-for="job in displayJobs" :key="job.id" :job="job" />
                <view v-if="displayJobs.length === 0">
                    <EmptyState text="暂无匹配的兼职" subtext="换个筛选条件试试" />
                </view>
                <ViewMoreButton
                    :has-more="hasMore"
                    :remaining="filteredList.length - displayCount"
                    @tap="onViewMore"
                />
                <view class="page-bottom" />
            </template>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import HomeHeader from '@/components/HomeHeader.vue'
import SearchBar from '@/components/SearchBar.vue'
import NoticeBar from '@/components/NoticeBar.vue'
import HomeBanner from '@/components/HomeBanner.vue'
import QuickStats from '@/components/QuickStats.vue'
import FunctionGrid from '@/components/FunctionGrid.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import FilterTabs from '@/components/FilterTabs.vue'
import JobCard from '@/components/JobCard.vue'
import ViewMoreButton from '@/components/ViewMoreButton.vue'
import EmptyState from '@/components/EmptyState.vue'
import LoadingView from '@/components/LoadingView.vue'
import {
    studentBanners,
    studentNavItems,
    jobList,
    jobFilters,
    studentNotices,
    studentStats,
} from '@/mock'
import { useHomeData } from '@/composables/useHomeData'
import { usePullRefresh } from '@/composables/usePullRefresh'
import { ROUTES, go } from '@/utils/router'
import { useFilterList } from '@/composables/useFilterList'

const PAGE_SIZE = 5
const displayCount = ref(PAGE_SIZE)
const activeFilter = ref('全部')

const fetchHomeData = () => ({
    banners: studentBanners,
    navItems: studentNavItems,
    jobs: [...jobList],
    filters: jobFilters,
    notices: studentNotices,
    stats: studentStats,
})

const { data: homeData, loading, error, load } = useHomeData(fetchHomeData)

const jobsRef = computed(() => homeData.value?.jobs)
const filterRef = computed(() => activeFilter.value)
const { filteredList } = useFilterList(jobsRef, filterRef)

const displayJobs = computed(() =>
    filteredList.value.slice(0, displayCount.value)
)

const hasMore = computed(
    () => filteredList.value.length > displayCount.value
)

const { refreshing, handleRefresh } = usePullRefresh(async () => {
    displayCount.value = PAGE_SIZE
    activeFilter.value = '全部'
    await load()
})

const onFilterChange = (tab: string) => {
    activeFilter.value = tab
    displayCount.value = PAGE_SIZE
}

/** 区块标题「查看更多」→ 进入完整列表页 */
const onGoFullList = () => {
    go(ROUTES.STUDENT_JOBS)
}

/** 底部按钮：先首页展开全部，再进入列表页 */
const onViewMore = () => {
    if (hasMore.value) {
        displayCount.value = filteredList.value.length
        uni.showToast({ title: `已展示全部 ${filteredList.value.length} 条`, icon: 'none' })
        return
    }
    onGoFullList()
}

onMounted(() => load())

onPullDownRefresh(() => handleRefresh())
</script>

<style lang="scss" scoped>
@use '@/common/theme.scss' as *;

.page {
    min-height: 100vh;
    background: $color-page-bg;
    display: flex;
    flex-direction: column;
}

.page-scroll {
    flex: 1;
    height: 100vh;
}

.page-bottom {
    height: 48rpx;
}
</style>
