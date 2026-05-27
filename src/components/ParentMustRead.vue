<template>
    <view class="must-read">
        <SectionTitle title="家长必读" subtitle="精选攻略 · 安心选课" />
        <view class="article-list">
            <view
                v-for="(item, index) in articles"
                :key="item.id"
                class="article-item"
                @tap="onArticleTap(item)"
            >
                <view class="article-cover" :style="{ background: item.coverColor }">
                    <text class="article-index">{{ index + 1 }}</text>
                </view>
                <view class="article-content">
                    <text class="article-title">{{ item.title }}</text>
                    <text class="article-summary">{{ item.summary }}</text>
                    <view class="article-meta">
                        <text class="article-date">{{ item.date }}</text>
                        <text class="article-read">{{ formatRead(item.readCount) }} 阅读</text>
                    </view>
                </view>
                <view class="article-arrow" />
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { ArticleItem } from '@/mock/articles'
import SectionTitle from './SectionTitle.vue'
import { ROUTES, goWithQuery } from '@/utils/router'

defineProps<{
    articles: ArticleItem[]
}>()

const formatRead = (count: number) => {
    if (count >= 10000) return `${(count / 10000).toFixed(1)}万`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
    return String(count)
}

const onArticleTap = (item: ArticleItem) => {
    goWithQuery(ROUTES.ARTICLE_DETAIL, { id: item.id })
}
</script>

<style lang="scss" scoped>
@use '@/common/theme.scss' as *;

.must-read {
    margin-top: 8rpx;
    padding-bottom: 16rpx;
}

.article-list {
    margin: 0 32rpx 32rpx;
    @include card-base;
    padding: 8rpx 0;
}

.article-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 24rpx 28rpx;
    border-bottom: 1rpx solid $color-border;
}

.article-item:last-child {
    border-bottom: none;
}

.article-cover {
    width: 120rpx;
    height: 120rpx;
    border-radius: 12rpx;
    @include flex-center;
    flex-shrink: 0;
    margin-right: 20rpx;
}

.article-index {
    font-size: 48rpx;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.9);
}

.article-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
}

.article-title {
    font-size: 28rpx;
    font-weight: 600;
    color: $color-title;
    margin-bottom: 8rpx;
    @include ellipsis;
}

.article-summary {
    font-size: 24rpx;
    color: $color-body;
    margin-bottom: 12rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.4;
}

.article-meta {
    display: flex;
    flex-direction: row;
    gap: 20rpx;
}

.article-date,
.article-read {
    font-size: 22rpx;
    color: $color-auxiliary;
}

.article-arrow {
    width: 12rpx;
    height: 12rpx;
    border-right: 3rpx solid $color-auxiliary;
    border-bottom: 3rpx solid $color-auxiliary;
    transform: rotate(-45deg);
    margin-left: 12rpx;
    flex-shrink: 0;
}
</style>
