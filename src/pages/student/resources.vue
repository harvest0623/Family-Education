<template>
  <view class="sub-page">
    <PageNavbar title="教学资源" />
    <scroll-view class="scroll" scroll-y>
      <view v-for="item in resourceList" :key="item.id" class="resource-card" @tap="onDownload(item)">
        <view class="resource-cover" :style="{ background: item.coverColor }">
          <text class="resource-type">{{ item.type }}</text>
        </view>
        <view class="resource-info">
          <text class="resource-title">{{ item.title }}</text>
          <text class="resource-meta">{{ item.size }} · {{ item.downloads }} 次下载</text>
        </view>
        <view class="download-btn">
          <text>下载</text>
        </view>
      </view>
      <view class="bottom-space" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import PageNavbar from '@/components/PageNavbar.vue'
import { resourceList, type ResourceItem } from '@/mock/resources'

const onDownload = (item: ResourceItem) => {
  uni.showModal({
    title: '下载资源',
    content: `确定下载「${item.title}」？\n文件大小：${item.size}`,
    confirmText: '下载',
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({ title: '下载中...' })
        setTimeout(() => {
          uni.hideLoading()
          uni.showToast({ title: '下载成功', icon: 'success' })
        }, 1200)
      }
    },
  })
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
.resource-card {
  @include card-base;
  padding: 24rpx;
  margin-bottom: 20rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.resource-cover {
  width: 100rpx;
  height: 100rpx;
  border-radius: 12rpx;
  @include flex-center;
  margin-right: 20rpx;
  flex-shrink: 0;
}
.resource-type {
  font-size: 28rpx;
  color: #fff;
  font-weight: 700;
}
.resource-info {
  flex: 1;
  min-width: 0;
}
.resource-title {
  font-size: 28rpx;
  font-weight: 600;
  color: $color-title;
  display: block;
  margin-bottom: 8rpx;
}
.resource-meta {
  font-size: 24rpx;
  color: $color-auxiliary;
}
.download-btn {
  padding: 12rpx 28rpx;
  background: rgba(54, 120, 255, 0.1);
  border-radius: 32rpx;
  color: $color-primary;
  font-size: 26rpx;
  flex-shrink: 0;
}
.bottom-space {
  height: 32rpx;
}
</style>
