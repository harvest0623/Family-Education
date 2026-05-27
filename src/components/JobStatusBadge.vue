<template>
    <view class="status-badge" :class="type">
        <view class="badge-glow" />
        <view class="badge-inner">
            <view class="badge-icon-wrap">
                <text class="badge-icon">{{ icon }}</text>
            </view>
            <text class="badge-text">{{ label }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    type: 'hot' | 'urgent'
}>()

const label = computed(() => (props.type === 'hot' ? '热门' : '急聘'))
const icon = computed(() => (props.type === 'hot' ? '热' : '急'))
</script>

<style lang="scss" scoped>
.status-badge {
    position: relative;
    border-radius: 10rpx;
    overflow: hidden;
    flex-shrink: 0;
}

.badge-glow {
    position: absolute;
    inset: 0;
    opacity: 0.35;
    filter: blur(4rpx);
}

.badge-inner {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6rpx;
    padding: 8rpx 18rpx 8rpx 10rpx;
}

.badge-icon-wrap {
    width: 32rpx;
    height: 32rpx;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.28);
}

.badge-icon {
    font-size: 20rpx;
    color: #fff;
    font-weight: 800;
    line-height: 1;
}

.badge-text {
    font-size: 22rpx;
    color: #fff;
    font-weight: 700;
    letter-spacing: 2rpx;
    line-height: 1;
}

/* 热门：橙金渐变 + 光晕 */
.status-badge.hot {
    background: linear-gradient(135deg, #ff6b35 0%, #ff8a3d 45%, #ffb347 100%);
    box-shadow: 0 6rpx 16rpx rgba(255, 107, 53, 0.45);
}

.status-badge.hot .badge-glow {
    background: linear-gradient(135deg, #ff8a3d, #ffb347);
}

/* 急聘：红色渐变 + 光晕 */
.status-badge.urgent {
    background: linear-gradient(135deg, #ff4d4f 0%, #ff6b6b 50%, #ff7875 100%);
    box-shadow: 0 6rpx 16rpx rgba(255, 77, 79, 0.45);
}

.status-badge.urgent .badge-glow {
    background: linear-gradient(135deg, #ff4d4f, #ff7875);
}
</style>
