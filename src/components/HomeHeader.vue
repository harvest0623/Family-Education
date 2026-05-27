<template>
    <view class="home-header">
        <view class="header-bg" :style="{ paddingTop: statusBarHeight + 'px' }">
            <view class="header-top">
                <view class="header-brand">
                    <text class="header-title">{{ title }}</text>
                    <text class="header-slogan">{{ slogan }}</text>
                </view>
                <view class="header-actions">
                    <view class="city-btn" @tap="onCityTap">
                        <view class="city-icon" />
                        <text class="city-name">{{ currentCity }}</text>
                        <view class="city-arrow" />
                    </view>
                    <view class="msg-btn" @tap="onMessageTap">
                        <view class="msg-icon" />
                        <view v-if="messageCount > 0" class="msg-badge">
                            <text class="msg-badge-text">{{ badgeText }}</text>
                        </view>
                    </view>
                </view>
            </view>
            <slot />
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { getCity, setCity } from '@/utils/storage'
import { ROUTES, go } from '@/utils/router'

const props = withDefaults(
    defineProps<{
        title?: string
        slogan?: string
        city?: string
        messageCount?: number
    }>(),
    {
        title: '家教系统',
        slogan: '专业家教服务平台',
        city: '北京',
        messageCount: 0,
    }
)

const emit = defineEmits<{
    cityChange: [city: string]
}>()

const currentCity = ref(props.city)
const statusBarHeight = ref(0)

const badgeText = computed(() =>
    props.messageCount > 99 ? '99+' : String(props.messageCount)
)

onMounted(() => {
    const info = uni.getSystemInfoSync()
    statusBarHeight.value = info.statusBarHeight || 20
    currentCity.value = getCity() || props.city
})

const onCityTap = () => {
    const cities = ['北京', '上海', '广州', '深圳', '杭州']
    uni.showActionSheet({
        itemList: cities,
        success: (res) => {
            currentCity.value = cities[res.tapIndex]
            setCity(currentCity.value)
            emit('cityChange', currentCity.value)
            uni.showToast({ title: `已切换至${currentCity.value}`, icon: 'none' })
        },
    })
}

const onMessageTap = () => {
    go(ROUTES.MESSAGES)
}
</script>

<style lang="scss" scoped>
@use '@/common/theme.scss' as *;

.home-header {
    position: sticky;
    top: 0;
    z-index: 100;
}

.header-bg {
    background: $gradient-header;
    padding-bottom: 8rpx;
}

.header-top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16rpx 32rpx 12rpx;
}

.header-brand {
    display: flex;
    flex-direction: column;
}

.header-title {
    font-size: 40rpx;
    font-weight: 700;
    color: #fff;
    letter-spacing: 2rpx;
}

.header-slogan {
    font-size: 22rpx;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 4rpx;
}

.header-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16rpx;
}

.city-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 32rpx;
    padding: 10rpx 20rpx;
    border: 1rpx solid rgba(255, 255, 255, 0.3);
}

.city-icon {
    width: 20rpx;
    height: 20rpx;
    background: #fff;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    margin-right: 8rpx;
}

.city-name {
    font-size: 26rpx;
    color: #fff;
    font-weight: 500;
}

.city-arrow {
    width: 0;
    height: 0;
    border-left: 8rpx solid transparent;
    border-right: 8rpx solid transparent;
    border-top: 10rpx solid rgba(255, 255, 255, 0.8);
    margin-left: 8rpx;
}

.msg-btn {
    position: relative;
    width: 72rpx;
    height: 72rpx;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    border: 1rpx solid rgba(255, 255, 255, 0.3);
    @include flex-center;
}

.msg-icon {
    width: 32rpx;
    height: 28rpx;
    border: 3rpx solid #fff;
    border-radius: 6rpx 6rpx 12rpx 12rpx;
    position: relative;
}

.msg-icon::before {
    content: '';
    position: absolute;
    top: -10rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 10rpx;
    height: 8rpx;
    border: 3rpx solid #fff;
    border-bottom: none;
    border-radius: 8rpx 8rpx 0 0;
}

.msg-badge {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 32rpx;
    height: 32rpx;
    background: $color-danger;
    border-radius: 16rpx;
    @include flex-center;
    padding: 0 8rpx;
    border: 2rpx solid #fff;
}

.msg-badge-text {
    font-size: 18rpx;
    color: #fff;
    font-weight: 600;
}
</style>
