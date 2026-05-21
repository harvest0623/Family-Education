<template>
  <view class="section-title">
    <view class="title-left">
      <view class="title-bar" />
      <view class="title-text-wrap">
        <text class="title-text">{{ title }}</text>
        <text v-if="subtitle" class="title-sub">{{ subtitle }}</text>
      </view>
    </view>
    <view v-if="showMore" class="more-btn" @tap="onMoreTap">
      <text class="more-text">{{ moreText }}</text>
      <view class="more-arrow" />
    </view>
  </view>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    showMore?: boolean
    moreText?: string
  }>(),
  {
    showMore: false,
    moreText: '查看更多',
  }
)

const emit = defineEmits<{
  more: []
}>()

const onMoreTap = () => {
  emit('more')
}
</script>

<style lang="scss" scoped>
@import '@/common/theme.scss';

.section-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx 32rpx 12rpx;
}

.title-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.title-bar {
  width: 8rpx;
  height: 32rpx;
  background: $gradient-primary;
  border-radius: 4rpx;
  margin-right: 16rpx;
}

.title-text-wrap {
  display: flex;
  flex-direction: column;
}

.title-text {
  font-size: 34rpx;
  font-weight: 700;
  color: $color-title;
}

.title-sub {
  font-size: 22rpx;
  color: $color-auxiliary;
  margin-top: 4rpx;
}

.more-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4rpx;
}

.more-text {
  font-size: 26rpx;
  color: $color-primary;
}

.more-arrow {
  width: 10rpx;
  height: 10rpx;
  border-right: 2rpx solid $color-primary;
  border-bottom: 2rpx solid $color-primary;
  transform: rotate(-45deg);
}
</style>
