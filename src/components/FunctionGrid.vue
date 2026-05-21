<template>
  <view class="function-section">
    <view class="function-grid">
      <view
        v-for="item in items"
        :key="item.id"
        class="grid-item"
        @tap="onItemTap(item)"
      >
        <view class="grid-icon-wrap">
          <view class="grid-icon" :style="{ background: item.color }">
            <text class="grid-icon-text">{{ item.icon }}</text>
          </view>
          <view v-if="item.badge" class="grid-badge">
            <text class="grid-badge-text">{{ item.badge }}</text>
          </view>
        </view>
        <text class="grid-name">{{ item.name }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { NavItem } from '@/mock/nav'
import { go } from '@/utils/router'

defineProps<{
  items: NavItem[]
}>()

const onItemTap = (item: NavItem) => {
  if (item.path) go(item.path)
}
</script>

<style lang="scss" scoped>
@import '@/common/theme.scss';

.function-section {
  margin: 20rpx 32rpx 0;
}

.function-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @include card-base;
  padding: 32rpx 8rpx 24rpx;
}

.grid-item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.grid-icon-wrap {
  position: relative;
  margin-bottom: 14rpx;
}

.grid-icon {
  width: 88rpx;
  height: 88rpx;
  border-radius: 22rpx;
  @include flex-center;
}

.grid-icon-text {
  font-size: 32rpx;
  color: #fff;
  font-weight: 700;
}

.grid-badge {
  position: absolute;
  top: -8rpx;
  right: -12rpx;
  min-width: 32rpx;
  height: 32rpx;
  padding: 0 8rpx;
  background: $color-danger;
  border-radius: 16rpx;
  border: 2rpx solid #fff;
  @include flex-center;
}

.grid-badge-text {
  font-size: 18rpx;
  color: #fff;
  font-weight: 600;
}

.grid-name {
  font-size: 24rpx;
  color: $color-title;
  font-weight: 500;
}
</style>
