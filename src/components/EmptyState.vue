<template>
    <view class="empty-state">
        <view class="empty-icon-wrap">
            <view class="empty-box" />
            <view class="empty-line l1" />
            <view class="empty-line l2" />
        </view>
        <text class="empty-text">{{ text }}</text>
        <text v-if="subtext" class="empty-subtext">{{ subtext }}</text>
    </view>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        text?: string
        subtext?: string
        icon?: string
    }>(),
    {
        text: '暂无数据',
        subtext: '',
        icon: '',
    }
)
</script>

<style lang="scss" scoped>
@use '@/common/theme.scss' as *;

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80rpx 32rpx;
}

.empty-icon-wrap {
    position: relative;
    width: 120rpx;
    height: 100rpx;
    margin-bottom: 32rpx;
}

.empty-box {
    width: 100rpx;
    height: 72rpx;
    border: 4rpx solid $color-border;
    border-radius: 12rpx;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}

.empty-line {
    position: absolute;
    height: 4rpx;
    background: $color-border;
    border-radius: 2rpx;
}

.l1 {
    width: 60rpx;
    top: 20rpx;
    left: 30rpx;
}

.l2 {
    width: 40rpx;
    top: 36rpx;
    left: 40rpx;
}

.empty-text {
    font-size: 30rpx;
    color: $color-body;
    font-weight: 500;
    margin-bottom: 12rpx;
}

.empty-subtext {
    font-size: 26rpx;
    color: $color-auxiliary;
}
</style>
