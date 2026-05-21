<template>
  <scroll-view class="filter-tabs" scroll-x :show-scrollbar="false">
    <view class="filter-inner">
      <view
        v-for="tab in tabs"
        :key="tab"
        class="filter-item"
        :class="{ active: activeTab === tab }"
        @tap="onTabTap(tab)"
      >
        <text class="filter-text">{{ tab }}</text>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
const props = defineProps<{
  tabs: string[]
  activeTab: string
}>()

const emit = defineEmits<{
  change: [tab: string]
}>()

const onTabTap = (tab: string) => {
  if (tab !== props.activeTab) {
    emit('change', tab)
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/theme.scss';

.filter-tabs {
  width: 100%;
  white-space: nowrap;
  padding: 0 32rpx 16rpx;
}

.filter-inner {
  display: flex;
  flex-direction: row;
  gap: 16rpx;
}

.filter-item {
  flex-shrink: 0;
  padding: 12rpx 28rpx;
  border-radius: 32rpx;
  background: $color-card-bg;
  border: 1rpx solid $color-border;
}

.filter-item.active {
  background: $gradient-primary;
  border-color: transparent;
  box-shadow: 0 4rpx 16rpx rgba(54, 120, 255, 0.3);
}

.filter-text {
  font-size: 26rpx;
  color: $color-body;
}

.filter-item.active .filter-text {
  color: #fff;
  font-weight: 500;
}
</style>
