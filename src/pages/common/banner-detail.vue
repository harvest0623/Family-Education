<template>
    <view class="sub-page">
        <PageNavbar title="活动详情" />
        <scroll-view v-if="banner" class="scroll" scroll-y>
            <view class="banner-hero" :style="{ background: banner.bgColor }">
                <view v-if="banner.tag" class="hero-tag">
                    <text>{{ banner.tag }}</text>
                </view>
                <text class="hero-title">{{ banner.title }}</text>
                <text class="hero-sub">{{ banner.subtitle }}</text>
            </view>
            <view class="detail-card">
                <text class="detail-title">活动说明</text>
                <text class="detail-text">
                    {{ banner.subtitle }}。活动期间，平台为用户提供额外保障与优惠，详情请咨询客服或点击下方按钮参与。
                </text>
                <view class="cta-btn" @tap="onJoin">
                    <text>{{ banner.btnText || '立即参与' }}</text>
                </view>
            </view>
        </scroll-view>
        <EmptyState v-if="!banner" text="活动不存在" />
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import PageNavbar from '@/components/PageNavbar.vue'
import EmptyState from '@/components/EmptyState.vue'
import { getBannerById } from '@/mock/lookup'
import type { BannerItem } from '@/mock/banners'
import { ROUTES, go } from '@/utils/router'

const banner = ref<BannerItem | undefined>()
const role = ref<'student' | 'parent'>('student')

onLoad((query) => {
    role.value = (query?.role as 'student' | 'parent') || 'student'
    const id = query?.id as string
    if (id) banner.value = getBannerById(id, role.value)
})

const onJoin = () => {
    go(role.value === 'student' ? ROUTES.STUDENT_JOBS : ROUTES.PARENT_TEACHERS)
}
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
.banner-hero {
    padding: 48rpx 40rpx 56rpx;
    min-height: 280rpx;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
.hero-tag {
    align-self: flex-start;
    background: rgba(255, 255, 255, 0.25);
    padding: 6rpx 20rpx;
    border-radius: 8rpx;
    color: #fff;
    font-size: 24rpx;
    margin-bottom: 16rpx;
}
.hero-title {
    font-size: 40rpx;
    font-weight: 700;
    color: #fff;
    margin-bottom: 12rpx;
}
.hero-sub {
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.9);
}
.detail-card {
    margin: -32rpx 32rpx 32rpx;
    @include card-base;
    padding: 36rpx;
    position: relative;
    z-index: 1;
}
.detail-title {
    font-size: 32rpx;
    font-weight: 600;
    color: $color-title;
    display: block;
    margin-bottom: 16rpx;
}
.detail-text {
    font-size: 28rpx;
    color: $color-body;
    line-height: 1.7;
    margin-bottom: 32rpx;
    display: block;
}
.cta-btn {
    height: 88rpx;
    background: $gradient-primary;
    border-radius: $radius-button;
    @include flex-center;
    color: #fff;
    font-size: 30rpx;
    font-weight: 600;
}
</style>
