<template>
    <view class="sub-page">
        <PageNavbar title="兼职详情" />
        <scroll-view v-if="job" class="scroll" scroll-y>
            <view class="detail-card">
                <view v-if="job.isHot || job.isUrgent" class="badge-row">
                    <JobStatusBadge v-if="job.isHot" type="hot" />
                    <JobStatusBadge v-if="job.isUrgent" type="urgent" />
                </view>
                <text class="detail-title">{{ job.title }}</text>
                <view class="price-row">
                    <text class="price">¥{{ job.price }}</text>
                    <text class="unit">{{ job.priceUnit }}</text>
                </view>
                <view class="tag-row">
                    <text v-for="t in job.tags" :key="t" class="tag">{{ t }}</text>
                </view>
            </view>
            <view class="info-card">
                <view class="info-line">
                    <text class="label">发布者</text>
                    <text class="value">{{ job.publisher }}</text>
                </view>
                <view class="info-line">
                    <text class="label">地点</text>
                    <text class="value">{{ job.location }}（{{ job.distance }}）</text>
                </view>
                <view class="info-line">
                    <text class="label">时间</text>
                    <text class="value">{{ job.time }}</text>
                </view>
                <view class="info-line">
                    <text class="label">科目</text>
                    <text class="value">{{ job.subject }} · {{ job.grade }}</text>
                </view>
                <view class="info-line">
                    <text class="label">报名</text>
                    <text class="value">{{ job.applyCount }} 人已报名</text>
                </view>
            </view>
            <view class="desc-card">
                <text class="desc-title">岗位说明</text>
                <text class="desc-text">
                    负责{{ job.grade }}{{ job.subject }}辅导，要求有耐心、责任心强。首次上课前可与家长沟通教学计划，平台提供担保交易保障。
                </text>
            </view>
            <view class="bottom-space" />
        </scroll-view>
        <view v-if="job" class="footer-bar">
            <view class="footer-btn outline" @tap="onCollect">
                <text>{{ collected ? '已收藏' : '收藏' }}</text>
            </view>
            <view class="footer-btn primary" :class="{ disabled: applied }" @tap="onApply">
                <text>{{ applied ? '已报名' : '立即报名' }}</text>
            </view>
        </view>
        <EmptyState v-if="!job" text="兼职不存在" />
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import PageNavbar from '@/components/PageNavbar.vue'
import EmptyState from '@/components/EmptyState.vue'
import JobStatusBadge from '@/components/JobStatusBadge.vue'
import { getJobById } from '@/mock/lookup'
import type { JobItem } from '@/mock/jobs'
import { addAppliedJob, isJobApplied } from '@/utils/storage'

const job = ref<JobItem | undefined>()
const applied = ref(false)
const collected = ref(false)

onLoad((query) => {
    const id = query?.id as string
    if (id) {
        job.value = getJobById(id)
        applied.value = isJobApplied(id)
    }
})

const onApply = () => {
    if (!job.value || applied.value) return
    uni.showModal({
        title: '确认报名',
        content: `确定报名「${job.value.title}」？`,
        success: (res) => {
            if (res.confirm && job.value) {
                addAppliedJob(job.value.id)
                applied.value = true
                uni.showToast({ title: '报名成功', icon: 'success' })
            }
        },
    })
}

const onCollect = () => {
    collected.value = !collected.value
    uni.showToast({
        title: collected.value ? '已收藏' : '已取消收藏',
        icon: 'none',
    })
}
</script>

<style lang="scss" scoped>
@use '@/common/theme.scss' as *;
.sub-page {
    min-height: 100vh;
    background: $color-page-bg;
    padding-bottom: 140rpx;
}
.scroll {
    height: calc(100vh - 88rpx - 120rpx);
    padding: 24rpx 32rpx;
}
.detail-card,
.info-card,
.desc-card {
    @include card-base;
    padding: 28rpx;
    margin-bottom: 20rpx;
}
.badge-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12rpx;
    margin-bottom: 16rpx;
}
.detail-title {
    font-size: 36rpx;
    font-weight: 700;
    color: $color-title;
    line-height: 1.45;
    display: block;
    margin-bottom: 16rpx;
}
.price-row {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 16rpx;
}
.price {
    font-size: 48rpx;
    font-weight: 700;
    color: $color-danger;
}
.unit {
    font-size: 26rpx;
    color: $color-danger;
    margin-left: 8rpx;
}
.tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12rpx;
}
.tag {
    font-size: 22rpx;
    color: $color-primary;
    background: rgba(54, 120, 255, 0.1);
    padding: 6rpx 16rpx;
    border-radius: 8rpx;
}
.info-line {
    display: flex;
    flex-direction: row;
    padding: 16rpx 0;
    border-bottom: 1rpx solid $color-border;
}
.info-line:last-child {
    border-bottom: none;
}
.label {
    width: 140rpx;
    font-size: 28rpx;
    color: $color-auxiliary;
}
.value {
    flex: 1;
    font-size: 28rpx;
    color: $color-title;
}
.desc-title {
    font-size: 30rpx;
    font-weight: 600;
    color: $color-title;
    display: block;
    margin-bottom: 12rpx;
}
.desc-text {
    font-size: 28rpx;
    color: $color-body;
    line-height: 1.6;
}
.footer-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    gap: 20rpx;
    padding: 20rpx 32rpx;
    padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
    background: $color-card-bg;
    box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.06);
}
.footer-btn {
    flex: 1;
    height: 88rpx;
    border-radius: $radius-button;
    @include flex-center;
    font-size: 30rpx;
    font-weight: 600;
}
.footer-btn.outline {
    border: 1rpx solid $color-primary;
    color: $color-primary;
}
.footer-btn.primary {
    background: $gradient-primary;
    color: #fff;
}
.footer-btn.primary.disabled {
    opacity: 0.6;
}
.bottom-space {
    height: 32rpx;
}
</style>
