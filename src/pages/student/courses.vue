<template>
    <view class="sub-page">
        <PageNavbar title="我的课程" />
        <scroll-view class="scroll" scroll-y>
            <view v-for="item in studentCourses" :key="item.id" class="course-card">
                <view class="course-head">
                    <text class="course-title">{{ item.title }}</text>
                    <view class="status-tag" :class="item.status">
                        <text>{{ statusText[item.status] }}</text>
                    </view>
                </view>
                <text class="course-meta">学员：{{ item.student }}</text>
                <text class="course-meta">时间：{{ item.schedule }}</text>
                <view class="progress-wrap">
                    <view class="progress-bar">
                        <view class="progress-fill" :style="{ width: item.progress + '%' }" />
                    </view>
                    <text class="progress-text">{{ item.progress }}%</text>
                </view>
                <view class="course-actions">
                    <view class="action-btn outline" @tap="onEnter(item)">
                        <text>进入课堂</text>
                    </view>
                    <view class="action-btn primary" @tap="onContact(item)">
                        <text>联系学员</text>
                    </view>
                </view>
            </view>
            <view class="bottom-space" />
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import PageNavbar from '@/components/PageNavbar.vue'
import { studentCourses, type CourseItem } from '@/mock/courses'

const statusText = {
    ongoing: '进行中',
    upcoming: '待开始',
    done: '已结束',
}

const onEnter = (item: CourseItem) => {
    uni.showModal({
        title: '进入课堂',
        content: `即将进入「${item.title}」在线教室`,
        confirmText: '进入',
        success: (res) => {
            if (res.confirm) uni.showToast({ title: '已进入课堂', icon: 'success' })
        },
    })
}

const onContact = (item: CourseItem) => {
    uni.showModal({
        title: '联系学员',
        content: `学员：${item.student}\n可通过平台消息联系`,
        showCancel: false,
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
    padding: 4rpx 16rpx;
    border-radius: 8rpx;
    font-size: 22rpx;
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
    margin-bottom: 8rpx;
    display: block;
}
.progress-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 16rpx 0 20rpx;
    gap: 16rpx;
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
    border-radius: 6rpx;
}
.progress-text {
    font-size: 24rpx;
    color: $color-primary;
}
.course-actions {
    display: flex;
    flex-direction: row;
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
