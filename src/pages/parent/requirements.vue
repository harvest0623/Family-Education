<template>
    <view class="sub-page">
        <PageNavbar title="我的需求">
            <template #right>
                <text class="add-btn" @tap="onAdd">发布</text>
            </template>
        </PageNavbar>
        <scroll-view class="scroll" scroll-y>
            <view v-for="item in requirementList" :key="item.id" class="req-card">
                <view class="req-head">
                    <text class="req-subject">{{ item.subject }} · {{ item.grade }}</text>
                    <view class="req-status" :class="item.status">
                        <text>{{ statusMap[item.status] }}</text>
                    </view>
                </view>
                <text class="req-line">预算：{{ item.budget }}</text>
                <text class="req-line">时间：{{ item.schedule }}</text>
                <text class="req-line">已有 {{ item.applicants }} 位老师申请</text>
                <view class="req-actions">
                    <view class="req-btn" @tap="onViewApplicants(item)">
                        <text>查看申请</text>
                    </view>
                    <view class="req-btn primary" @tap="onEdit(item)">
                        <text>编辑需求</text>
                    </view>
                </view>
            </view>
            <view class="bottom-space" />
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import PageNavbar from '@/components/PageNavbar.vue'
import { requirementList, type RequirementItem } from '@/mock/requirements'

const statusMap = {
    matching: '匹配中',
    matched: '已匹配',
    closed: '已关闭',
}

const onAdd = () => {
    uni.showModal({
        title: '发布需求',
        editable: true,
        placeholderText: '请输入辅导科目',
        success: (res) => {
            if (res.confirm) {
                uni.showToast({ title: '需求已发布', icon: 'success' })
            }
        },
    })
}

const onViewApplicants = (item: RequirementItem) => {
    uni.showModal({
        title: '申请列表',
        content: `「${item.subject}」共有 ${item.applicants} 位老师申请，可在消息中心查看详情`,
        showCancel: false,
    })
}

const onEdit = (item: RequirementItem) => {
    uni.showModal({
        title: '编辑需求',
        content: `编辑「${item.subject} · ${item.grade}」的需求信息`,
        confirmText: '保存',
        success: (res) => {
            if (res.confirm) uni.showToast({ title: '已保存', icon: 'success' })
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
.add-btn {
    font-size: 28rpx;
    color: $color-primary;
    font-weight: 500;
}
.scroll {
    height: calc(100vh - 88rpx);
    padding: 24rpx 32rpx;
}
.req-card {
    @include card-base;
    padding: 28rpx;
    margin-bottom: 20rpx;
}
.req-head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 12rpx;
}
.req-subject {
    font-size: 32rpx;
    font-weight: 600;
    color: $color-title;
}
.req-status {
    font-size: 22rpx;
    padding: 4rpx 14rpx;
    border-radius: 8rpx;
}
.req-status.matching {
    background: rgba(54, 120, 255, 0.1);
    color: $color-primary;
}
.req-status.matched {
    background: rgba(82, 196, 26, 0.1);
    color: $color-success;
}
.req-status.closed {
    background: #f0f0f0;
    color: $color-auxiliary;
}
.req-line {
    font-size: 26rpx;
    color: $color-body;
    display: block;
    margin-bottom: 8rpx;
}
.req-actions {
    display: flex;
    flex-direction: row;
    gap: 16rpx;
    margin-top: 20rpx;
}
.req-btn {
    flex: 1;
    height: 68rpx;
    border-radius: 34rpx;
    border: 1rpx solid $color-primary;
    @include flex-center;
    color: $color-primary;
    font-size: 26rpx;
}
.req-btn.primary {
    background: $gradient-primary;
    border: none;
    color: #fff;
}
.bottom-space {
    height: 32rpx;
}
</style>
