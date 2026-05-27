<template>
    <view class="sub-page">
        <PageNavbar title="老师详情" />
        <scroll-view v-if="teacher" class="scroll" scroll-y>
            <view class="profile-card">
                <view class="avatar" :style="{ background: teacher.avatarGradient }">
                    <text class="avatar-text">{{ teacher.name.charAt(0) }}</text>
                </view>
                <view class="profile-info">
                    <view class="name-row">
                        <text class="name">{{ teacher.name }}</text>
                        <VerifiedBadge v-if="teacher.isVerified" />
                    </view>
                    <text class="school">{{ teacher.school }}</text>
                    <view class="rating-row">
                        <text class="stars">★★★★★</text>
                        <text class="rating">{{ teacher.rating }} 分</text>
                        <text class="orders">{{ teacher.orderCount }} 单成交</text>
                    </view>
                </view>
            </view>
            <view class="info-card">
                <text class="info-title">老师简介</text>
                <text class="info-desc">{{ teacher.intro }}</text>
                <view class="tag-row">
                    <text v-for="t in teacher.tags" :key="t" class="tag">{{ t }}</text>
                </view>
            </view>
            <view class="info-card">
                <view class="info-line">
                    <text class="label">辅导科目</text>
                    <text class="value">{{ teacher.subject }}</text>
                </view>
                <view class="info-line">
                    <text class="label">教学经验</text>
                    <text class="value">{{ teacher.experience }}</text>
                </view>
                <view class="info-line">
                    <text class="label">授课时间</text>
                    <text class="value">{{ teacher.time }}</text>
                </view>
                <view class="info-line">
                    <text class="label">距离</text>
                    <text class="value">{{ teacher.distance }}</text>
                </view>
                <view class="info-line">
                    <text class="label">课时费</text>
                    <text class="value price">¥{{ teacher.price }}{{ teacher.priceUnit }}</text>
                </view>
            </view>
            <view class="bottom-space" />
        </scroll-view>
        <view v-if="teacher" class="footer-bar">
            <view class="footer-btn outline" @tap="onChat">
                <text>在线咨询</text>
            </view>
            <view class="footer-btn primary" :class="{ disabled: booked }" @tap="onBook">
                <text>{{ booked ? '已预约' : '立即预约' }}</text>
            </view>
        </view>
        <EmptyState v-if="!teacher" text="老师不存在" />
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import PageNavbar from '@/components/PageNavbar.vue'
import EmptyState from '@/components/EmptyState.vue'
import { getTeacherById } from '@/mock/lookup'
import type { TeacherItem } from '@/mock/teachers'
import { addBookedTeacher, isTeacherBooked } from '@/utils/storage'
import { ROUTES, go } from '@/utils/router'
import VerifiedBadge from '@/components/VerifiedBadge.vue'

const teacher = ref<TeacherItem | undefined>()
const booked = ref(false)

onLoad((query) => {
    const id = query?.id as string
    if (id) {
        teacher.value = getTeacherById(id)
        booked.value = isTeacherBooked(id)
    }
})

const onBook = () => {
    if (!teacher.value || booked.value) return
    uni.showModal({
        title: '预约老师',
        content: `确定预约 ${teacher.value.name}？\n课时费 ¥${teacher.value.price}${teacher.value.priceUnit}`,
        confirmText: '确认预约',
        success: (res) => {
            if (res.confirm && teacher.value) {
                addBookedTeacher(teacher.value.id)
                booked.value = true
                uni.showModal({
                    title: '预约成功',
                    content: '是否前往查看订单？',
                    confirmText: '查看订单',
                    cancelText: '留在此页',
                    success: (r) => {
                        if (r.confirm) go(ROUTES.PARENT_ORDERS)
                    },
                })
            }
        },
    })
}

const onChat = () => {
    if (!teacher.value) return
    uni.showModal({
        title: '在线咨询',
        content: `即将与 ${teacher.value.name} 建立会话`,
        confirmText: '开始聊天',
        success: (res) => {
            if (res.confirm) uni.showToast({ title: '已发送咨询消息', icon: 'success' })
        },
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
.profile-card {
    @include card-base;
    padding: 32rpx;
    display: flex;
    flex-direction: row;
    margin-bottom: 20rpx;
}
.avatar {
    width: 140rpx;
    height: 140rpx;
    border-radius: 28rpx;
    @include flex-center;
    margin-right: 24rpx;
    flex-shrink: 0;
}
.avatar-text {
    font-size: 56rpx;
    color: #fff;
    font-weight: 700;
}
.profile-info {
    flex: 1;
}
.name-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12rpx;
    margin-bottom: 8rpx;
}
.name {
    font-size: 36rpx;
    font-weight: 700;
    color: $color-title;
}
.school {
    font-size: 26rpx;
    color: $color-auxiliary;
    display: block;
    margin-bottom: 12rpx;
}
.rating-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12rpx;
    flex-wrap: wrap;
}
.stars {
    color: $color-gold;
    font-size: 24rpx;
}
.rating {
    font-size: 26rpx;
    color: $color-gold;
    font-weight: 600;
}
.orders {
    font-size: 24rpx;
    color: $color-auxiliary;
}
.info-card {
    @include card-base;
    padding: 28rpx;
    margin-bottom: 20rpx;
}
.info-title {
    font-size: 30rpx;
    font-weight: 600;
    color: $color-title;
    display: block;
    margin-bottom: 12rpx;
}
.info-desc {
    font-size: 28rpx;
    color: $color-body;
    line-height: 1.6;
    margin-bottom: 16rpx;
    display: block;
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
    padding: 14rpx 0;
    border-bottom: 1rpx solid $color-border;
}
.info-line:last-child {
    border-bottom: none;
}
.label {
    width: 160rpx;
    font-size: 28rpx;
    color: $color-auxiliary;
}
.value {
    flex: 1;
    font-size: 28rpx;
    color: $color-title;
}
.value.price {
    color: $color-primary;
    font-weight: 600;
}
.footer-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
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
