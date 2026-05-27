<template>
    <view class="sub-page">
        <PageNavbar title="我的收入" />
        <scroll-view class="scroll" scroll-y>
            <view class="summary-card">
                <text class="summary-label">累计收入（元）</text>
                <text class="summary-total">{{ incomeSummary.total.toLocaleString() }}</text>
                <view class="summary-row">
                    <view class="summary-item">
                        <text class="item-value">{{ incomeSummary.month }}</text>
                        <text class="item-label">本月收入</text>
                    </view>
                    <view class="summary-divider" />
                    <view class="summary-item">
                        <text class="item-value pending">{{ incomeSummary.pending }}</text>
                        <text class="item-label">待结算</text>
                    </view>
                </view>
                <view class="withdraw-btn" @tap="onWithdraw">
                    <text>申请提现</text>
                </view>
            </view>
            <view class="section-head">
                <text class="section-title">收入明细</text>
            </view>
            <view v-for="item in incomeRecords" :key="item.id" class="record-card">
                <view class="record-left">
                    <text class="record-title">{{ item.title }}</text>
                    <text class="record-date">{{ item.date }}</text>
                </view>
                <view class="record-right">
                    <text class="record-amount">+{{ item.amount }}</text>
                    <text class="record-status" :class="item.status">
                        {{ item.status === 'settled' ? '已结算' : '待结算' }}
                    </text>
                </view>
            </view>
            <view class="bottom-space" />
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import PageNavbar from '@/components/PageNavbar.vue'
import { incomeSummary, incomeRecords } from '@/mock/income'

const onWithdraw = () => {
    uni.showModal({
        title: '申请提现',
        content: `可提现金额：¥${incomeSummary.total - incomeSummary.pending}\n预计 1-3 个工作日到账`,
        confirmText: '确认提现',
        success: (res) => {
            if (res.confirm) uni.showToast({ title: '提现申请已提交', icon: 'success' })
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
.summary-card {
    background: $gradient-primary;
    border-radius: $radius-card;
    padding: 40rpx 32rpx;
    margin-bottom: 32rpx;
    box-shadow: $shadow-float;
}
.summary-label {
    font-size: 26rpx;
    color: rgba(255, 255, 255, 0.85);
}
.summary-total {
    font-size: 64rpx;
    font-weight: 700;
    color: #fff;
    margin: 12rpx 0 28rpx;
}
.summary-row {
    display: flex;
    flex-direction: row;
    margin-bottom: 28rpx;
}
.summary-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.summary-divider {
    width: 1rpx;
    background: rgba(255, 255, 255, 0.3);
}
.item-value {
    font-size: 36rpx;
    font-weight: 600;
    color: #fff;
}
.item-value.pending {
    color: #ffe58f;
}
.item-label {
    font-size: 24rpx;
    color: rgba(255, 255, 255, 0.75);
    margin-top: 4rpx;
}
.withdraw-btn {
    background: #fff;
    border-radius: $radius-button;
    height: 80rpx;
    @include flex-center;
    color: $color-primary;
    font-size: 30rpx;
    font-weight: 600;
}
.section-head {
    margin-bottom: 16rpx;
}
.section-title {
    font-size: 32rpx;
    font-weight: 600;
    color: $color-title;
}
.record-card {
    @include card-base;
    padding: 28rpx;
    margin-bottom: 16rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.record-title {
    font-size: 28rpx;
    color: $color-title;
    font-weight: 500;
    display: block;
    margin-bottom: 8rpx;
}
.record-date {
    font-size: 24rpx;
    color: $color-auxiliary;
}
.record-amount {
    font-size: 32rpx;
    font-weight: 600;
    color: $color-success;
    display: block;
    text-align: right;
}
.record-status {
    font-size: 22rpx;
    text-align: right;
    display: block;
    margin-top: 4rpx;
}
.record-status.settled {
    color: $color-auxiliary;
}
.record-status.pending {
    color: $color-warning;
}
.bottom-space {
    height: 32rpx;
}
</style>
