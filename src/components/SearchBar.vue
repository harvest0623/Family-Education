<template>
  <view class="search-bar">
    <view class="search-inner" @tap="goSearch">
      <view class="search-icon-wrap">
        <view class="search-icon" />
      </view>
      <text class="search-placeholder">{{ placeholder }}</text>
    </view>
    <view v-if="showBtn" class="search-btn" @tap="goSearch">
      <text class="search-btn-text">搜索</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ROUTES, go } from '@/utils/router'

const props = withDefaults(
  defineProps<{
    placeholder?: string
    showBtn?: boolean
    role?: 'student' | 'parent'
  }>(),
  {
    placeholder: '搜索兼职、课程、地点',
    showBtn: true,
    role: 'student',
  }
)

const goSearch = () => {
  go(props.role === 'parent' ? ROUTES.PARENT_SEARCH : ROUTES.STUDENT_SEARCH)
}
</script>

<style lang="scss" scoped>
@import '@/common/theme.scss';

.search-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 32rpx 20rpx;
  gap: 16rpx;
}

.search-inner {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 72rpx;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 36rpx;
  padding: 0 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
}

.search-icon-wrap {
  margin-right: 16rpx;
  @include flex-center;
}

.search-icon {
  width: 28rpx;
  height: 28rpx;
  border: 3rpx solid $color-auxiliary;
  border-radius: 50%;
  position: relative;
}

.search-placeholder {
  font-size: 28rpx;
  color: $color-auxiliary;
}

.search-btn {
  height: 72rpx;
  padding: 0 28rpx;
  background: $color-card-bg;
  border-radius: 36rpx;
  @include flex-center;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
}

.search-btn-text {
  font-size: 28rpx;
  color: $color-primary;
  font-weight: 500;
}
</style>
