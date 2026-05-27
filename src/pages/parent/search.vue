<template>
    <view class="sub-page">
        <PageNavbar title="搜索老师" />
        <view class="search-box">
            <input
                v-model="keyword"
                class="search-input"
                placeholder="输入老师、科目、学校"
                confirm-type="search"
                @confirm="doSearch"
            />
            <view class="search-btn" @tap="doSearch">
                <text>搜索</text>
            </view>
        </view>
        <scroll-view class="scroll" scroll-y>
            <view v-if="searched && results.length === 0" class="empty-wrap">
                <EmptyState text="未找到相关老师" />
            </view>
            <TeacherCard v-for="t in results" :key="t.id" :teacher="t" />
            <view v-if="!searched" class="hint">
                <text class="hint-title">热门搜索</text>
                <view class="hint-tags">
                    <text v-for="tag in hotTags" :key="tag" class="hint-tag" @tap="searchTag(tag)">{{ tag }}</text>
                </view>
            </view>
            <view class="bottom-space" />
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import PageNavbar from '@/components/PageNavbar.vue'
import TeacherCard from '@/components/TeacherCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import { teacherList } from '@/mock'
import type { TeacherItem } from '@/mock/teachers'

const keyword = ref('')
const results = ref<TeacherItem[]>([])
const searched = ref(false)
const hotTags = ['数学', '英语', '清华', '小学', '提分']

onLoad((query) => {
    if (query?.keyword) {
        keyword.value = decodeURIComponent(query.keyword as string)
        doSearch()
    }
})

const doSearch = () => {
    searched.value = true
    const k = keyword.value.trim()
    if (!k) {
        results.value = teacherList
        return
    }
    results.value = teacherList.filter(
        (t) =>
            t.name.includes(k) ||
            t.school.includes(k) ||
            t.subject.includes(k) ||
            t.tags.some((tag) => tag.includes(k))
    )
}

const searchTag = (tag: string) => {
    keyword.value = tag
    doSearch()
}
</script>

<style lang="scss" scoped>
@use '@/common/theme.scss' as *;
.sub-page {
    min-height: 100vh;
    background: $color-page-bg;
}
.search-box {
    display: flex;
    flex-direction: row;
    padding: 16rpx 32rpx 24rpx;
    gap: 16rpx;
    background: $color-card-bg;
}
.search-input {
    flex: 1;
    height: 72rpx;
    background: $color-page-bg;
    border-radius: 36rpx;
    padding: 0 28rpx;
    font-size: 28rpx;
}
.search-btn {
    height: 72rpx;
    padding: 0 32rpx;
    background: $gradient-primary;
    border-radius: 36rpx;
    @include flex-center;
    color: #fff;
    font-size: 28rpx;
}
.scroll {
    height: calc(100vh - 88rpx - 112rpx);
}
.hint {
    padding: 32rpx;
}
.hint-title {
    font-size: 28rpx;
    color: $color-auxiliary;
    display: block;
    margin-bottom: 20rpx;
}
.hint-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;
}
.hint-tag {
    padding: 12rpx 28rpx;
    background: $color-card-bg;
    border-radius: 32rpx;
    font-size: 26rpx;
    color: $color-body;
}
.empty-wrap {
    padding: 60rpx 0;
}
.bottom-space {
    height: 32rpx;
}
</style>
