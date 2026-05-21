<template>
  <view class="job-card" @tap="onTap">
    <view class="card-body">
      <view class="publisher-row">
        <view class="publisher-avatar" :style="{ background: job.avatarColor }">
          <text class="avatar-char">{{ job.publisher.charAt(0) }}</text>
        </view>
        <view class="publisher-info">
          <text class="publisher-name">{{ job.publisher }}</text>
          <text class="apply-count">{{ job.applyCount }} 人已报名</text>
        </view>
        <view class="price-box">
          <text class="price-symbol">¥</text>
          <text class="price-num">{{ job.price }}</text>
          <text class="price-unit">/{{ job.priceUnit.replace('元/', '') }}</text>
        </view>
      </view>

      <view v-if="job.isHot || job.isUrgent" class="badge-row">
        <JobStatusBadge v-if="job.isHot" type="hot" />
        <JobStatusBadge v-if="job.isUrgent" type="urgent" />
      </view>
      <text class="job-title">{{ job.title }}</text>

      <view class="tag-row">
        <text v-for="tag in job.tags" :key="tag" class="tag">{{ tag }}</text>
      </view>
      <view class="meta-grid">
        <view class="meta-item">
          <view class="meta-icon location" />
          <text class="meta-text">{{ job.location }}</text>
          <text class="meta-extra">{{ job.distance }}</text>
        </view>
        <view class="meta-item">
          <view class="meta-icon time" />
          <text class="meta-text">{{ job.time }}</text>
        </view>
        <view class="meta-item">
          <view class="meta-icon book" />
          <text class="meta-text">{{ job.subject }} · {{ job.grade }}</text>
        </view>
      </view>
      <view class="card-footer">
        <text class="footer-tip">平台担保 · 准时结算</text>
        <view class="apply-btn" :class="{ applied }" @tap.stop="onApply">
          <text class="apply-btn-text">{{ applied ? '已报名' : '立即报名' }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { JobItem } from '@/mock/jobs'
import { ROUTES, goWithQuery } from '@/utils/router'
import { addAppliedJob, isJobApplied } from '@/utils/storage'
import JobStatusBadge from './JobStatusBadge.vue'

const props = defineProps<{
  job: JobItem
}>()

const applied = ref(false)

onMounted(() => {
  applied.value = isJobApplied(props.job.id)
})

const onTap = () => {
  goWithQuery(ROUTES.STUDENT_JOB_DETAIL, { id: props.job.id })
}

const onApply = () => {
  if (applied.value) {
    goWithQuery(ROUTES.STUDENT_JOB_DETAIL, { id: props.job.id })
    return
  }
  uni.showModal({
    title: '确认报名',
    content: `确定报名「${props.job.title}」？`,
    success: (res) => {
      if (res.confirm) {
        addAppliedJob(props.job.id)
        applied.value = true
        uni.showToast({ title: '报名成功', icon: 'success' })
      }
    },
  })
}
</script>

<style lang="scss" scoped>
@import '@/common/theme.scss';

.job-card {
  margin: 0 32rpx 24rpx;
  @include card-base;
}

.card-body {
  padding: 28rpx;
}

.publisher-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20rpx;
}

.publisher-avatar {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  @include flex-center;
  margin-right: 16rpx;
  flex-shrink: 0;
}

.avatar-char {
  font-size: 32rpx;
  color: #fff;
  font-weight: 600;
}

.publisher-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.publisher-name {
  font-size: 28rpx;
  font-weight: 600;
  color: $color-title;
}

.apply-count {
  font-size: 22rpx;
  color: $color-auxiliary;
  margin-top: 4rpx;
}

.price-box {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  flex-shrink: 0;
  margin-left: 12rpx;
}

.price-symbol {
  font-size: 24rpx;
  color: $color-danger;
  font-weight: 600;
}

.price-num {
  font-size: 44rpx;
  font-weight: 700;
  color: $color-danger;
  line-height: 1;
}

.price-unit {
  font-size: 22rpx;
  color: $color-danger;
  margin-left: 2rpx;
}

/* 角标独立一行：保留渐变视觉，不挡头像姓名 */
.badge-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 14rpx;
}

.job-title {
  font-size: 32rpx;
  font-weight: 700;
  color: $color-title;
  line-height: 1.45;
  margin-bottom: 16rpx;
  display: block;
}

.tag-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-bottom: 20rpx;
}

.tag {
  font-size: 22rpx;
  color: $color-body;
  background: $color-page-bg;
  padding: 6rpx 18rpx;
  border-radius: 6rpx;
}

.meta-grid {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  padding: 20rpx;
  background: $color-page-bg;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
}

.meta-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.meta-icon {
  width: 28rpx;
  height: 28rpx;
  margin-right: 12rpx;
  flex-shrink: 0;
}

.meta-icon.location {
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  width: 20rpx;
  height: 20rpx;
  margin: 4rpx 16rpx 4rpx 4rpx;
  background: $color-primary;
}

.meta-icon.time {
  width: 24rpx;
  height: 24rpx;
  border: 3rpx solid $color-primary;
  border-radius: 50%;
}

.meta-icon.book {
  width: 22rpx;
  height: 18rpx;
  border: 3rpx solid $color-primary;
  border-radius: 2rpx;
}

.meta-text {
  flex: 1;
  font-size: 24rpx;
  color: $color-body;
}

.meta-extra {
  font-size: 24rpx;
  color: $color-primary;
  font-weight: 500;
}

.card-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 16rpx;
  border-top: 1rpx solid $color-border;
}

.footer-tip {
  font-size: 22rpx;
  color: $color-auxiliary;
}

.apply-btn {
  background: $gradient-primary;
  border-radius: 32rpx;
  padding: 12rpx 32rpx;
  box-shadow: 0 4rpx 16rpx rgba(54, 120, 255, 0.28);
}

.apply-btn.applied {
  background: #e8e8e8;
  box-shadow: none;
}

.apply-btn-text {
  font-size: 26rpx;
  color: #fff;
  font-weight: 600;
}

.apply-btn.applied .apply-btn-text {
  color: $color-auxiliary;
}
</style>
