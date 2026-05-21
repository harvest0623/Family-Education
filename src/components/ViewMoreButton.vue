<template>
  <view class="view-more" :class="{ disabled: !hasMore && !showListLink }" @tap="onTap">
    <text class="view-more-text">{{ btnText }}</text>
    <view v-if="hasMore" class="view-more-icon" />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    hasMore?: boolean
    remaining?: number
    moreText?: string
    doneText?: string
    showListLink?: boolean
  }>(),
  {
    hasMore: true,
    remaining: 0,
    moreText: '查看更多',
    doneText: '查看全部列表',
    showListLink: true,
  }
)

const emit = defineEmits<{
  tap: []
}>()

const btnText = computed(() => {
  if (props.hasMore && props.remaining > 0) {
    return `${props.moreText}（还有 ${props.remaining} 条）`
  }
  if (props.hasMore) return props.moreText
  return `${props.doneText} →`
})

const onTap = () => {
  emit('tap')
}
</script>

<style lang="scss" scoped>
@import '@/common/theme.scss';

.view-more {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 8rpx 32rpx 24rpx;
  height: 84rpx;
  background: $color-card-bg;
  border-radius: $radius-button;
  border: 1rpx solid $color-border;
  gap: 8rpx;
}

.view-more.disabled {
  opacity: 0.85;
}

.view-more-text {
  font-size: 28rpx;
  color: $color-primary;
  font-weight: 500;
}

.view-more-icon {
  width: 12rpx;
  height: 12rpx;
  border-right: 3rpx solid $color-primary;
  border-bottom: 3rpx solid $color-primary;
  transform: rotate(45deg);
  margin-top: -4rpx;
}
</style>
