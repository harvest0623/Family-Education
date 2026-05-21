<template>
  <view class="sub-page">
    <PageNavbar title="我的订单" />
    <scroll-view class="scroll" scroll-y>
      <view v-for="item in orderList" :key="item.id" class="order-card">
        <view class="order-head">
          <text class="order-id">订单号 {{ item.id }}</text>
          <text class="order-status" :class="item.status">{{ statusMap[item.status] }}</text>
        </view>
        <text class="order-teacher">{{ item.teacher }} · {{ item.subject }}</text>
        <view class="order-foot">
          <text class="order-date">{{ item.date }}</text>
          <text class="order-amount">¥{{ item.amount }}</text>
        </view>
        <view v-if="item.status === 'pending'" class="order-actions">
          <view class="order-btn" @tap="onPay(item)">
            <text>去支付</text>
          </view>
        </view>
        <view v-if="item.status === 'paid'" class="order-actions">
          <view class="order-btn outline" @tap="onRefund(item)">
            <text>申请退款</text>
          </view>
          <view class="order-btn" @tap="onAgain">
            <text>再次预约</text>
          </view>
        </view>
      </view>
      <view class="bottom-space" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import PageNavbar from '@/components/PageNavbar.vue'
import { orderList, type OrderItem } from '@/mock/orders'
import { ROUTES, go } from '@/utils/router'

const statusMap = {
  paid: '已支付',
  pending: '待支付',
  refund: '退款中',
}

const onPay = (item: OrderItem) => {
  uni.showModal({
    title: '确认支付',
    content: `支付 ¥${item.amount} 给 ${item.teacher}`,
    confirmText: '支付',
    success: (res) => {
      if (res.confirm) uni.showToast({ title: '支付成功', icon: 'success' })
    },
  })
}

const onRefund = (item: OrderItem) => {
  uni.showModal({
    title: '申请退款',
    content: `确定对订单 ${item.id} 申请退款？`,
    success: (res) => {
      if (res.confirm) uni.showToast({ title: '退款申请已提交', icon: 'none' })
    },
  })
}

const onAgain = () => {
  go(ROUTES.PARENT_TEACHERS)
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
.order-card {
  @include card-base;
  padding: 28rpx;
  margin-bottom: 20rpx;
}
.order-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12rpx;
}
.order-id {
  font-size: 24rpx;
  color: $color-auxiliary;
}
.order-status {
  font-size: 24rpx;
  font-weight: 500;
}
.order-status.paid {
  color: $color-success;
}
.order-status.pending {
  color: $color-warning;
}
.order-status.refund {
  color: $color-danger;
}
.order-teacher {
  font-size: 30rpx;
  font-weight: 600;
  color: $color-title;
  display: block;
  margin-bottom: 16rpx;
}
.order-foot {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.order-date {
  font-size: 26rpx;
  color: $color-auxiliary;
}
.order-amount {
  font-size: 32rpx;
  font-weight: 700;
  color: $color-primary;
}
.order-actions {
  display: flex;
  flex-direction: row;
  gap: 16rpx;
  margin-top: 20rpx;
  padding-top: 20rpx;
  border-top: 1rpx solid $color-border;
}
.order-btn {
  flex: 1;
  height: 68rpx;
  border-radius: 34rpx;
  background: $gradient-primary;
  @include flex-center;
  color: #fff;
  font-size: 26rpx;
}
.order-btn.outline {
  background: transparent;
  border: 1rpx solid $color-auxiliary;
  color: $color-body;
}
.bottom-space {
  height: 32rpx;
}
</style>
