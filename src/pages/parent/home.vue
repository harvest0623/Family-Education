<template>
  <view class="page">
    <HomeHeader title="家长端" slogan="找名师 · 管课程 · 安心学" :message-count="5">
      <SearchBar role="parent" placeholder="搜索老师、科目、学校" />
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
        <NoticeBar :notices="homeData.notices" tag="资讯" role="parent" />
        <HomeBanner :banners="homeData.banners" role="parent" />
        <QuickStats :items="homeData.stats" />
        <FunctionGrid :items="homeData.navItems" />
        <SectionTitle
          title="推荐老师"
          subtitle="严选认证 · 高分好评"
          :show-more="true"
          @more="onGoFullList"
        />
        <FilterTabs
          :tabs="homeData.filters"
          :active-tab="activeFilter"
          @change="onFilterChange"
        />
        <TeacherCard
          v-for="teacher in displayTeachers"
          :key="teacher.id"
          :teacher="teacher"
        />
        <view v-if="displayTeachers.length === 0">
          <EmptyState text="暂无匹配的老师" subtext="换个筛选条件试试" />
        </view>
        <ViewMoreButton
          :has-more="hasMore"
          :remaining="filteredList.length - displayCount"
          @tap="onViewMore"
        />
        <ParentMustRead :articles="homeData.articles" />
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
import TeacherCard from '@/components/TeacherCard.vue'
import ParentMustRead from '@/components/ParentMustRead.vue'
import ViewMoreButton from '@/components/ViewMoreButton.vue'
import EmptyState from '@/components/EmptyState.vue'
import LoadingView from '@/components/LoadingView.vue'
import {
  parentBanners,
  parentNavItems,
  teacherList,
  teacherFilters,
  parentNotices,
  parentStats,
  parentArticles,
} from '@/mock'
import { useHomeData } from '@/composables/useHomeData'
import { usePullRefresh } from '@/composables/usePullRefresh'
import { ROUTES, go } from '@/utils/router'
import { useFilterList } from '@/composables/useFilterList'

const PAGE_SIZE = 5
const displayCount = ref(PAGE_SIZE)
const activeFilter = ref('全部')

const fetchHomeData = () => ({
  banners: parentBanners,
  navItems: parentNavItems,
  teachers: [...teacherList],
  filters: teacherFilters,
  notices: parentNotices,
  stats: parentStats,
  articles: parentArticles,
})

const { data: homeData, loading, error, load } = useHomeData(fetchHomeData)

const teachersRef = computed(() => homeData.value?.teachers)
const filterRef = computed(() => activeFilter.value)
const { filteredList } = useFilterList(teachersRef, filterRef)

const displayTeachers = computed(() =>
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

const onGoFullList = () => {
  go(ROUTES.PARENT_TEACHERS)
}

const onViewMore = () => {
  if (hasMore.value) {
    displayCount.value = filteredList.value.length
    uni.showToast({ title: `已展示全部 ${filteredList.value.length} 位老师`, icon: 'none' })
    return
  }
  onGoFullList()
}

onMounted(() => load())

onPullDownRefresh(() => handleRefresh())
</script>

<style lang="scss" scoped>
@import '@/common/theme.scss';

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
