<template>
  <view class="sub-page">
    <PageNavbar title="公告详情" />
    <scroll-view class="scroll" scroll-y>
      <view class="notice-card">
        <view class="notice-tag">
          <text>{{ tag }}</text>
        </view>
        <text class="notice-title">{{ title }}</text>
        <text class="notice-time">发布时间：{{ date }}</text>
        <text class="notice-body">{{ content }}</text>
        <view class="action-btn" @tap="onAction">
          <text>{{ actionText }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import PageNavbar from '@/components/PageNavbar.vue'
import { ROUTES, go } from '@/utils/router'

const tag = ref('公告')
const title = ref('')
const content = ref('')
const date = ref('2026-05-20')
const role = ref<'student' | 'parent'>('student')
const actionText = ref('查看详情')

onLoad((query) => {
  role.value = (query?.role as 'student' | 'parent') || 'student'
  tag.value = (query?.tag as string) || '公告'
  title.value = decodeURIComponent((query?.title as string) || '平台公告')
  content.value = decodeURIComponent(
    (query?.content as string) ||
      '本周平台推出多项优惠活动，欢迎广大学生和家长参与。详情请查看各频道列表。'
  )
  actionText.value = role.value === 'student' ? '去看兼职' : '去找老师'
})

const onAction = () => {
  go(role.value === 'student' ? ROUTES.STUDENT_JOBS : ROUTES.PARENT_TEACHERS)
}
</script>

<style lang="scss" scoped>
@import '@/common/theme.scss';
.sub-page {
  min-height: 100vh;
  background: $color-page-bg;
}
.scroll {
  height: calc(100vh - 88rpx);
  padding: 24rpx 32rpx;
}
.notice-card {
  @include card-base;
  padding: 36rpx;
}
.notice-tag {
  align-self: flex-start;
  background: $gradient-primary;
  padding: 6rpx 20rpx;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
  display: inline-block;
  color: #fff;
  font-size: 24rpx;
}
.notice-title {
  font-size: 36rpx;
  font-weight: 700;
  color: $color-title;
  display: block;
  margin-bottom: 12rpx;
}
.notice-time {
  font-size: 24rpx;
  color: $color-auxiliary;
  display: block;
  margin-bottom: 28rpx;
}
.notice-body {
  font-size: 30rpx;
  color: $color-body;
  line-height: 1.8;
  display: block;
  margin-bottom: 40rpx;
}
.action-btn {
  height: 88rpx;
  background: $gradient-primary;
  border-radius: $radius-button;
  @include flex-center;
  color: #fff;
  font-size: 30rpx;
  font-weight: 600;
}
</style>
