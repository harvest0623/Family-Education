<template>
    <view class="verified-badge">
        <view class="badge-inner">
            <view class="icon-wrap">
                <text class="icon">✓</text>
            </view>
            <text class="label">平台认证</text>
        </view>
    </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use '@/common/theme.scss' as *;

.verified-badge {
    flex-shrink: 0;
    border-radius: 8rpx;
    overflow: hidden;
    background: linear-gradient(135deg, #3678ff 0%, #5b9dff 100%);
    box-shadow: 0 4rpx 12rpx rgba(54, 120, 255, 0.25);
}

.badge-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6rpx;
    padding: 6rpx 14rpx 6rpx 8rpx;
}

.icon-wrap {
    width: 28rpx;
    height: 28rpx;
    border-radius: 6rpx;
    background: rgba(255, 255, 255, 0.25);
    @include flex-center;
}

.icon {
    font-size: 18rpx;
    color: #fff;
    font-weight: 800;
}

.label {
    font-size: 20rpx;
    color: #fff;
    font-weight: 600;
    letter-spacing: 1rpx;
}
</style>
