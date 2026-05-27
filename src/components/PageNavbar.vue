<template>
    <view class="page-navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
        <view class="navbar-inner">
            <view class="nav-back" @tap="onBack">
                <view class="back-arrow" />
                <text v-if="showBackText" class="back-text">返回</text>
            </view>
            <text class="nav-title">{{ title }}</text>
            <view class="nav-right">
                <slot name="right" />
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { back } from '@/utils/router'

withDefaults(
    defineProps<{
        title: string
        showBackText?: boolean
    }>(),
    {
        showBackText: false,
    }
)

const statusBarHeight = ref(0)

onMounted(() => {
    statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight || 20
})

const onBack = () => {
    const pages = getCurrentPages()
    if (pages.length > 1) {
        back()
    } else {
        uni.reLaunch({ url: '/pages/index/index' })
    }
}
</script>

<style lang="scss" scoped>
@use '@/common/theme.scss' as *;

.page-navbar {
    background: $color-card-bg;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.navbar-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 88rpx;
    padding: 0 24rpx;
    position: relative;
}

.nav-back {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-width: 120rpx;
    z-index: 2;
}

.back-arrow {
    width: 20rpx;
    height: 20rpx;
    border-left: 4rpx solid $color-title;
    border-bottom: 4rpx solid $color-title;
    transform: rotate(45deg);
    margin-left: 8rpx;
}

.back-text {
    font-size: 28rpx;
    color: $color-body;
    margin-left: 8rpx;
}

.nav-title {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 34rpx;
    font-weight: 600;
    color: $color-title;
}

.nav-right {
    margin-left: auto;
    min-width: 120rpx;
    display: flex;
    justify-content: flex-end;
    z-index: 2;
}
</style>
