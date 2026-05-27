<template>
    <view class="teacher-card" @tap="onTap">
        <view class="card-main">
            <view class="avatar" :style="{ background: teacher.avatarGradient }">
                <text class="avatar-text">{{ teacher.name.charAt(0) }}</text>
            </view>
            <view class="info-block">
                <view class="name-row">
                    <view class="name-group">
                        <text class="teacher-name">{{ teacher.name }}</text>
                        <VerifiedBadge v-if="teacher.isVerified" />
                    </view>
                    <view class="rating-box">
                        <text v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.round(teacher.rating) }">★</text>
                        <text class="rating-num">{{ teacher.rating }}</text>
                    </view>
                </view>
                <text class="school-line">{{ teacher.school }} · {{ teacher.experience }}</text>
                <text class="intro">{{ teacher.intro }}</text>
                <view class="tag-row">
                    <text v-for="tag in teacher.tags" :key="tag" class="tag">{{ tag }}</text>
                </view>
            </view>
        </view>
        <view class="card-meta">
            <view class="meta-chips">
                <view class="chip">
                    <text class="chip-label">距离</text>
                    <text class="chip-value">{{ teacher.distance }}</text>
                </view>
                <view class="chip">
                    <text class="chip-label">时间</text>
                    <text class="chip-value">{{ teacher.time }}</text>
                </view>
                <view class="chip">
                    <text class="chip-label">成交</text>
                    <text class="chip-value">{{ teacher.orderCount }}单</text>
                </view>
            </view>
            <view class="price-action">
                <view class="price-block">
                    <text class="price-num">{{ teacher.price }}</text>
                    <text class="price-unit">{{ teacher.priceUnit }}</text>
                </view>
                <view class="book-btn" :class="{ booked }" @tap.stop="onBook">
                    <text class="book-btn-text">{{ booked ? '已预约' : '预约' }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { TeacherItem } from '@/mock/teachers'
import { ROUTES, goWithQuery } from '@/utils/router'
import { isTeacherBooked } from '@/utils/storage'
import VerifiedBadge from './VerifiedBadge.vue'

const props = defineProps<{
    teacher: TeacherItem
}>()

const booked = ref(false)

onMounted(() => {
    booked.value = isTeacherBooked(props.teacher.id)
})

const onTap = () => {
    goWithQuery(ROUTES.PARENT_TEACHER_DETAIL, { id: props.teacher.id })
}

const onBook = () => {
    goWithQuery(ROUTES.PARENT_TEACHER_DETAIL, { id: props.teacher.id })
}
</script>

<style lang="scss" scoped>
@use '@/common/theme.scss' as *;

.teacher-card {
    margin: 0 32rpx 24rpx;
    @include card-base;
    padding: 28rpx;
}

.card-main {
    display: flex;
    flex-direction: row;
    margin-bottom: 24rpx;
}

.avatar {
    width: 112rpx;
    height: 112rpx;
    border-radius: 16rpx;
    @include flex-center;
    margin-right: 20rpx;
    flex-shrink: 0;
}

.avatar-text {
    font-size: 44rpx;
    color: #fff;
    font-weight: 700;
}

.info-block {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
}

.name-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12rpx;
    margin-bottom: 8rpx;
}

.name-group {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 10rpx;
    flex: 1;
    min-width: 0;
}

.teacher-name {
    font-size: 32rpx;
    font-weight: 700;
    color: $color-title;
    line-height: 1.3;
}

/* BOSS 直聘风格：姓名旁横向小标签，不压在头像上 */
.rating-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-shrink: 0;
    padding-top: 4rpx;
}

.star {
    font-size: 22rpx;
    color: #e8e8e8;
    margin-right: 2rpx;
}

.star.filled {
    color: $color-gold;
}

.rating-num {
    font-size: 24rpx;
    color: $color-gold;
    font-weight: 700;
    margin-left: 4rpx;
}

.school-line {
    font-size: 24rpx;
    color: $color-auxiliary;
    margin-bottom: 8rpx;
}

.intro {
    font-size: 24rpx;
    color: $color-body;
    margin-bottom: 12rpx;
    line-height: 1.4;
}

.tag-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10rpx;
}

.tag {
    font-size: 22rpx;
    color: $color-body;
    background: $color-page-bg;
    padding: 4rpx 14rpx;
    border-radius: 6rpx;
}

.card-meta {
    padding-top: 20rpx;
    border-top: 1rpx solid $color-border;
}

.meta-chips {
    display: flex;
    flex-direction: row;
    gap: 16rpx;
    margin-bottom: 20rpx;
}

.chip {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12rpx 8rpx;
    background: $color-page-bg;
    border-radius: 12rpx;
}

.chip-label {
    font-size: 20rpx;
    color: $color-auxiliary;
    margin-bottom: 4rpx;
}

.chip-value {
    font-size: 24rpx;
    color: $color-title;
    font-weight: 500;
}

.price-action {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.price-block {
    display: flex;
    flex-direction: row;
    align-items: baseline;
}

.price-num {
    font-size: 44rpx;
    font-weight: 700;
    color: $color-primary;
}

.price-unit {
    font-size: 24rpx;
    color: $color-primary;
    margin-left: 4rpx;
}

.book-btn {
    background: $gradient-primary;
    border-radius: 32rpx;
    padding: 14rpx 40rpx;
    box-shadow: 0 4rpx 16rpx rgba(54, 120, 255, 0.28);
}

.book-btn.booked {
    background: #e8e8e8;
    box-shadow: none;
}

.book-btn-text {
    font-size: 28rpx;
    color: #fff;
    font-weight: 600;
}

.book-btn.booked .book-btn-text {
    color: $color-auxiliary;
}
</style>
