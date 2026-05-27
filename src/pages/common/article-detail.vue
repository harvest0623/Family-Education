<template>
    <view class="sub-page">
        <PageNavbar title="家长必读" />
        <scroll-view v-if="article" class="scroll" scroll-y>
            <view class="cover" :style="{ background: article.coverColor }">
                <text class="cover-text">家长必读</text>
            </view>
            <view class="article-card">
                <text class="article-title">{{ article.title }}</text>
                <view class="article-meta">
                    <text>{{ article.date }}</text>
                    <text>{{ article.readCount }} 阅读</text>
                </view>
                <text class="article-summary">{{ article.summary }}</text>
                <text class="article-content">{{ fullContent }}</text>
            </view>
            <view class="bottom-space" />
        </scroll-view>
        <EmptyState v-if="!article" text="文章不存在" />
    </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import PageNavbar from '@/components/PageNavbar.vue'
import EmptyState from '@/components/EmptyState.vue'
import { getArticleById } from '@/mock/lookup'
import type { ArticleItem } from '@/mock/articles'

const article = ref<ArticleItem | undefined>()

const fullContent = computed(() => {
    if (!article.value) return ''
    return `${article.value.summary}\n\n${article.value.summary} 本平台建议家长在预约前充分了解老师资质，可通过试课、查看评价等方式做出选择。如有疑问，请联系在线客服获取帮助。`
})

onLoad((query) => {
    const id = query?.id as string
    if (id) article.value = getArticleById(id)
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
.cover {
    height: 200rpx;
    @include flex-center;
}
.cover-text {
    font-size: 40rpx;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 700;
}
.article-card {
    margin: -40rpx 32rpx 0;
    @include card-base;
    padding: 36rpx;
    position: relative;
    z-index: 1;
}
.article-title {
    font-size: 36rpx;
    font-weight: 700;
    color: $color-title;
    display: block;
    margin-bottom: 16rpx;
    line-height: 1.4;
}
.article-meta {
    display: flex;
    flex-direction: row;
    gap: 24rpx;
    font-size: 24rpx;
    color: $color-auxiliary;
    margin-bottom: 24rpx;
}
.article-summary {
    font-size: 28rpx;
    color: $color-body;
    font-weight: 500;
    display: block;
    margin-bottom: 24rpx;
    padding-bottom: 24rpx;
    border-bottom: 1rpx solid $color-border;
}
.article-content {
    font-size: 30rpx;
    color: $color-body;
    line-height: 1.8;
    white-space: pre-wrap;
}
.bottom-space {
    height: 48rpx;
}
</style>
