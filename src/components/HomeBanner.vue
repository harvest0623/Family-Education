<template>
    <view class="banner-wrap">
        <swiper
            class="banner-swiper"
            :indicator-dots="banners.length > 1"
            indicator-color="rgba(255,255,255,0.35)"
            indicator-active-color="#ffffff"
            :autoplay="true"
            :interval="4500"
            :circular="true"
        >
            <swiper-item v-for="item in banners" :key="item.id">
                <view class="banner-item" :style="{ background: item.bgColor }" @tap="onBannerTap(item)">
                    <view class="banner-deco deco-1" />
                    <view class="banner-deco deco-2" />
                    <view class="banner-deco deco-3" />
                    <view class="banner-content">
                        <view v-if="item.tag" class="banner-tag">
                            <text class="banner-tag-text">{{ item.tag }}</text>
                        </view>
                        <text class="banner-title">{{ item.title }}</text>
                        <text v-if="item.subtitle" class="banner-subtitle">{{ item.subtitle }}</text>
                        <view v-if="item.btnText" class="banner-btn" @tap.stop="onBannerTap(item)">
                            <text class="banner-btn-text">{{ item.btnText }}</text>
                        </view>
                    </view>
                </view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script setup lang="ts">
import type { BannerItem } from '@/mock/banners'
import { ROUTES, goWithQuery } from '@/utils/router'

const props = withDefaults(
    defineProps<{
        banners: BannerItem[]
        role?: 'student' | 'parent'
    }>(),
    {
        role: 'student',
    }
)

const onBannerTap = (item: BannerItem) => {
    goWithQuery(ROUTES.BANNER_DETAIL, {
        id: item.id,
        role: props.role,
    })
}
</script>

<style lang="scss" scoped>
@use '@/common/theme.scss' as *;

.banner-wrap {
    padding: 16rpx 32rpx 0;
}

.banner-swiper {
    height: 300rpx;
    border-radius: $radius-card;
    overflow: hidden;
    box-shadow: $shadow-float;
}

.banner-item {
    height: 300rpx;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 40rpx;
}

.banner-deco {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
}

.deco-1 {
    width: 200rpx;
    height: 200rpx;
    top: -60rpx;
    right: -40rpx;
}

.deco-2 {
    width: 120rpx;
    height: 120rpx;
    bottom: -30rpx;
    right: 120rpx;
}

.deco-3 {
    width: 80rpx;
    height: 80rpx;
    top: 40rpx;
    right: 200rpx;
    background: rgba(255, 255, 255, 0.05);
}

.banner-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    max-width: 75%;
}

.banner-tag {
    align-self: flex-start;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 8rpx;
    padding: 4rpx 16rpx;
    margin-bottom: 16rpx;
}

.banner-tag-text {
    font-size: 22rpx;
    color: #fff;
    font-weight: 500;
}

.banner-title {
    font-size: 38rpx;
    font-weight: 700;
    color: #fff;
    margin-bottom: 12rpx;
    line-height: 1.3;
}

.banner-subtitle {
    font-size: 26rpx;
    color: rgba(255, 255, 255, 0.88);
    margin-bottom: 24rpx;
    line-height: 1.4;
}

.banner-btn {
    align-self: flex-start;
    background: #fff;
    border-radius: 32rpx;
    padding: 12rpx 32rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.banner-btn-text {
    font-size: 26rpx;
    color: $color-primary;
    font-weight: 600;
}
</style>
