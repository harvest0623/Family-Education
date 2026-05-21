<template>
  <view class="notice-bar" @tap="onTap">
    <view class="notice-tag">
      <text class="notice-tag-text">{{ tag }}</text>
    </view>
    <swiper
      class="notice-swiper"
      vertical
      :autoplay="true"
      :interval="3500"
      :circular="true"
      :disable-touch="true"
    >
      <swiper-item v-for="item in noticeItems" :key="item.id">
        <text class="notice-text">{{ item.text }}</text>
      </swiper-item>
    </swiper>
    <view class="notice-arrow" />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ROUTES, goWithQuery } from '@/utils/router'
import type { NoticeItem } from '@/mock/notices'

const props = withDefaults(
  defineProps<{
    notices?: NoticeItem[]
    text?: string
    tag?: string
    role?: 'student' | 'parent'
  }>(),
  {
    tag: '公告',
    role: 'student',
  }
)

const noticeItems = computed(() => {
  if (props.notices?.length) return props.notices
  if (props.text) return [{ id: 'default', text: props.text }]
  return [{ id: 'default', text: '' }]
})

const onTap = () => {
  const current = noticeItems.value[0]
  goWithQuery(ROUTES.NOTICE, {
    role: props.role,
    tag: props.tag,
    title: current.text.slice(0, 24),
    content: current.text,
  })
}
</script>

<style lang="scss" scoped>
@import '@/common/theme.scss';

.notice-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 32rpx 20rpx;
  padding: 18rpx 24rpx;
  @include card-base;
  background: $color-card-bg;
  border: 1rpx solid $color-border;
}

.notice-tag {
  flex-shrink: 0;
  background: rgba(54, 120, 255, 0.1);
  border-radius: 8rpx;
  padding: 6rpx 14rpx;
  margin-right: 16rpx;
}

.notice-tag-text {
  font-size: 22rpx;
  color: $color-primary;
  font-weight: 600;
}

.notice-swiper {
  flex: 1;
  height: 40rpx;
}

.notice-text {
  font-size: 26rpx;
  color: $color-body;
  line-height: 40rpx;
  @include ellipsis;
}

.notice-arrow {
  width: 12rpx;
  height: 12rpx;
  border-right: 3rpx solid $color-auxiliary;
  border-bottom: 3rpx solid $color-auxiliary;
  transform: rotate(-45deg);
  margin-left: 12rpx;
  flex-shrink: 0;
}
</style>
