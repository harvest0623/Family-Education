<template>
    <view class="sub-page">
        <PageNavbar title="课程管理" />
        <scroll-view class="scroll" scroll-y>
            <view v-for="item in parentCourses" :key="item.id" class="course-card">
                <view class="course-head">
                    <text class="course-title">{{ item.title }}</text>
                    <view class="status-tag" :class="item.status">
                        <text>{{ statusText[item.status] }}</text>
                    </view>
                </view>
                <text class="course-meta">{{ item.schedule }}</text>
                <view class="progress-wrap">
                    <view class="progress-bar">
                        <view class="progress-fill" :style="{ width: item.progress + '%' }" />
                    </view>
                    <text class="progress-text">进度 {{ item.progress }}%</text>
                </view>
                <view class="course-actions">
                    <view class="action-btn outline" @tap="onAdjust(item)">
                        <text>调课</text>
                    </view>
                    <view class="action-btn primary" @tap="onEvaluate(item)">
                        <text>评价老师</text>
                    </view>
                </view>
            </view>
            <view class="bottom-space" />
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import PageNavbar from '@/components/PageNavbar.vue'
import { parentCourses, type CourseItem } from '@/mock/courses'

const statusText = {
    ongoing: '进行中',
    upcoming: '待开始',
    done: '已结束',
}

const onAdjust = (item: CourseItem) => {
    uni.showModal({
        title: '调整课程',
        content: `联系客服调整「${item.title}」上课时间`,
        confirmText: '联系客服',
        success: (res) => {
            if (res.confirm) uni.showToast({ title: '客服将尽快联系您', icon: 'none' })
        },
    })
}

const onEvaluate = (item: CourseItem) => {
    uni.showModal({
        title: '评价老师',
        content: `为「${item.title}」的老师评分`,
        confirmText: '去评价',
        success: (res) => {
            if (res.confirm) uni.showToast({ title: '感谢您的评价', icon: 'success' })
        },
    })
}
</script>

<style lang="scss" scoped>
@use '@/common/theme.scss' as *;
.sub-page {
    min-height: 100vh;
    background: $color-page-bg;
}
.scroll {
    height: calc(100vh - 88rpx);
    padding: 24rpx 32rpx;
}
.course-card {
    @include card-base;
    padding: 28rpx;
    margin-bottom: 24rpx;
}
.course-head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 12rpx;
}
.course-title {
    font-size: 32rpx;
    font-weight: 600;
    color: $color-title;
}
.status-tag {
    font-size: 22rpx;
    padding: 4rpx 16rpx;
    border-radius: 8rpx;
}
.status-tag.ongoing {
    background: rgba(54, 120, 255, 0.1);
    color: $color-primary;
}
.status-tag.upcoming {
    background: rgba(255, 138, 61, 0.1);
    color: $color-warning;
}
.status-tag.done {
    background: #f0f0f0;
    color: $color-auxiliary;
}
.course-meta {
    font-size: 26rpx;
    color: $color-body;
    margin-bottom: 16rpx;
    display: block;
}
.progress-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16rpx;
    margin-bottom: 20rpx;
}
.progress-bar {
    flex: 1;
    height: 12rpx;
    background: $color-page-bg;
    border-radius: 6rpx;
    overflow: hidden;
}
.progress-fill {
    height: 100%;
    background: $gradient-primary;
}
.progress-text {
    font-size: 24rpx;
    color: $color-primary;
}
.course-actions {
    display: flex;
    gap: 20rpx;
}
.action-btn {
    flex: 1;
    height: 72rpx;
    border-radius: 36rpx;
    @include flex-center;
    font-size: 28rpx;
}
.action-btn.outline {
    border: 1rpx solid $color-primary;
    color: $color-primary;
}
.action-btn.primary {
    background: $gradient-primary;
    color: #fff;
}
.bottom-space {
    height: 32rpx;
}
</style>
