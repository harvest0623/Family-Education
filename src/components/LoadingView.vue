<template>
  <view class="loading-view">
    <view class="loading-card">
      <view class="spinner-wrap">
        <view class="spinner" />
        <view class="spinner-inner" />
      </view>
      <text class="loading-text">{{ text }}</text>
      <text class="loading-sub">{{ subtext }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string
    subtext?: string
  }>(),
  {
    text: '加载中...',
    subtext: '正在获取最新数据',
  }
)
</script>

<style lang="scss" scoped>
@import '@/common/theme.scss';

.loading-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80rpx 32rpx;
}

.loading-card {
  @include card-base;
  padding: 60rpx 80rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spinner-wrap {
  position: relative;
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 28rpx;
}

.spinner {
  width: 80rpx;
  height: 80rpx;
  border: 6rpx solid rgba(54, 120, 255, 0.15);
  border-top-color: $color-primary;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

.spinner-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24rpx;
  height: 24rpx;
  background: $color-primary;
  border-radius: 50%;
  opacity: 0.6;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: 28rpx;
  color: $color-title;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.loading-sub {
  font-size: 24rpx;
  color: $color-auxiliary;
}
</style>
