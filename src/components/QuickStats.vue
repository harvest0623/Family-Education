<template>
  <view class="quick-stats">
    <view
      v-for="(item, index) in items"
      :key="index"
      class="stat-item"
      :class="{ highlight: item.highlight }"
    >
      <view class="stat-value-row">
        <text class="stat-value">{{ item.value }}</text>
        <text v-if="item.unit" class="stat-unit">{{ item.unit }}</text>
      </view>
      <text class="stat-label">{{ item.label }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { StatItem } from '@/mock/stats'

defineProps<{
  items: StatItem[]
}>()
</script>

<style lang="scss" scoped>
@import '@/common/theme.scss';

.quick-stats {
  display: flex;
  flex-direction: row;
  margin: 0 32rpx 20rpx;
  padding: 28rpx 12rpx;
  @include card-base;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.stat-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1rpx;
  height: 40rpx;
  background: $color-border;
}

.stat-value-row {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 6rpx;
}

.stat-value {
  font-size: 38rpx;
  font-weight: 700;
  color: $color-title;
  line-height: 1.1;
}

.stat-item.highlight .stat-value {
  color: $color-primary;
}

.stat-unit {
  font-size: 22rpx;
  color: $color-auxiliary;
  margin-left: 4rpx;
}

.stat-label {
  font-size: 24rpx;
  color: $color-auxiliary;
}
</style>
