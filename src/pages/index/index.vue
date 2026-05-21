<template>
  <view class="entry-page">
    <view class="entry-bg">
      <view class="bg-circle c1" />
      <view class="bg-circle c2" />
      <view class="bg-circle c3" />
    </view>
    <view class="entry-content">
      <view class="entry-header">
        <view class="logo-wrap">
          <text class="logo-text">家教</text>
        </view>
        <text class="entry-title">家教系统</text>
        <text class="entry-subtitle">Uni-app + Vue3 · 双端首页笔试项目</text>
      </view>
      <view class="entry-cards">
        <view class="entry-card student" @tap="goStudent">
          <view class="card-badge">学生</view>
          <view class="card-icon-wrap student-icon">
            <text class="card-icon-char">学</text>
          </view>
          <text class="card-title">学生端首页</text>
          <text class="card-desc">找兼职 · 我的课程 · 我的收入 · 教学资源</text>
          <view class="card-tags">
            <text class="mini-tag">推荐兼职</text>
            <text class="mini-tag">下拉刷新</text>
          </view>
          <view class="card-arrow" />
        </view>
        <view class="entry-card parent" @tap="goParent">
          <view class="card-badge parent-badge">家长</view>
          <view class="card-icon-wrap parent-icon">
            <text class="card-icon-char">家</text>
          </view>
          <text class="card-title">家长端首页</text>
          <text class="card-desc">找老师 · 课程管理 · 推荐名师 · 家长必读</text>
          <view class="card-tags">
            <text class="mini-tag">认证老师</text>
            <text class="mini-tag">家长必读</text>
          </view>
          <view class="card-arrow" />
        </view>
      </view>
      <text class="entry-tip">点击卡片进入对应端侧首页预览</text>
    </view>
  </view>
</template>

<script setup lang="ts">
const goStudent = () => {
  uni.navigateTo({ url: '/pages/student/home' })
}

const goParent = () => {
  uni.navigateTo({ url: '/pages/parent/home' })
}
</script>

<style lang="scss" scoped>
@import '@/common/theme.scss';

.entry-page {
  min-height: 100vh;
  background: $color-page-bg;
  position: relative;
  overflow: hidden;
}

.entry-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 480rpx;
  background: $gradient-header;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
}

.c1 {
  width: 300rpx;
  height: 300rpx;
  top: -80rpx;
  right: -60rpx;
}

.c2 {
  width: 180rpx;
  height: 180rpx;
  top: 120rpx;
  left: -40rpx;
}

.c3 {
  width: 100rpx;
  height: 100rpx;
  top: 60rpx;
  right: 120rpx;
}

.entry-content {
  position: relative;
  z-index: 1;
  padding: 120rpx 40rpx 60rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.entry-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 64rpx;
}

.logo-wrap {
  width: 120rpx;
  height: 120rpx;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 32rpx;
  @include flex-center;
  margin-bottom: 28rpx;
  box-shadow: $shadow-float;
}

.logo-text {
  font-size: 48rpx;
  font-weight: 800;
  color: $color-primary;
}

.entry-title {
  font-size: 52rpx;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12rpx;
}

.entry-subtitle {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.85);
}

.entry-cards {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 28rpx;
}

.entry-card {
  position: relative;
  @include card-base;
  padding: 40rpx 36rpx 36rpx;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.entry-card.student {
  border-top: 6rpx solid $color-primary;
}

.entry-card.parent {
  border-top: 6rpx solid $color-success;
}

.card-badge {
  position: absolute;
  top: 24rpx;
  right: 24rpx;
  background: rgba(54, 120, 255, 0.1);
  color: $color-primary;
  font-size: 22rpx;
  padding: 4rpx 16rpx;
  border-radius: 16rpx;
  font-weight: 600;
}

.parent-badge {
  background: rgba(82, 196, 26, 0.1);
  color: $color-success;
}

.card-icon-wrap {
  width: 88rpx;
  height: 88rpx;
  border-radius: 22rpx;
  @include flex-center;
  margin-bottom: 20rpx;
}

.student-icon {
  background: $gradient-primary;
  box-shadow: 0 8rpx 24rpx rgba(54, 120, 255, 0.35);
}

.parent-icon {
  background: linear-gradient(135deg, #52c41a, #73d13d);
  box-shadow: 0 8rpx 24rpx rgba(82, 196, 26, 0.35);
}

.card-icon-char {
  font-size: 40rpx;
  color: #fff;
  font-weight: 700;
}

.card-title {
  font-size: 36rpx;
  font-weight: 700;
  color: $color-title;
  margin-bottom: 12rpx;
}

.card-desc {
  font-size: 26rpx;
  color: $color-body;
  line-height: 1.5;
  margin-bottom: 20rpx;
}

.card-tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12rpx;
}

.mini-tag {
  font-size: 22rpx;
  color: $color-auxiliary;
  background: $color-page-bg;
  padding: 6rpx 16rpx;
  border-radius: 8rpx;
}

.card-arrow {
  position: absolute;
  right: 36rpx;
  bottom: 48rpx;
  width: 16rpx;
  height: 16rpx;
  border-right: 4rpx solid $color-auxiliary;
  border-bottom: 4rpx solid $color-auxiliary;
  transform: rotate(-45deg);
}

.entry-tip {
  margin-top: 48rpx;
  font-size: 24rpx;
  color: $color-auxiliary;
}
</style>
