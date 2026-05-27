<template>
    <view class="entry-page">
        <view class="entry-bg">
            <view class="bg-circle c1" />
            <view class="bg-circle c2" />
            <view class="bg-circle c3" />
        </view>
        <view class="entry-content">
            <view class="entry-header">
                <view class="logo-wrap">
                    <text class="logo-text">家教</text>
                </view>
                <text class="entry-title">家教系统</text>
            </view>
            <view class="entry-intro-card">
                <text class="entry-subtitle">专注家教服务匹配，连接学生与家长，提供找老师、课程管理、教学资源等一站式服务</text>
            </view>
            <view class="entry-cards">
                <view class="entry-card student" @tap="goStudent">
                    <view class="card-badge">学生</view>
                    <view class="card-icon-wrap student-icon">
                        <text class="card-icon-char">学</text>
                    </view>
                    <text class="card-title">学生端首页</text>
                    <text class="card-desc">找兼职 · 我的课程 · 我的收入 · 教学资源</text>
                    <view class="card-tags">
                        <text class="mini-tag">推荐兼职</text>
                        <text class="mini-tag">在线学习</text>
                    </view>
                    <view class="card-arrow" />
                </view>
                <view class="entry-card parent" @tap="goParent">
                    <view class="card-badge parent-badge">家长</view>
                    <view class="card-icon-wrap parent-icon">
                        <text class="card-icon-char">家</text>
                    </view>
                    <text class="card-title">家长端首页</text>
                    <text class="card-desc">找老师 · 课程管理 · 推荐名师 · 家长必读</text>
                    <view class="card-tags">
                        <text class="mini-tag">认证老师</text>
                        <text class="mini-tag">家长必读</text>
                    </view>
                    <view class="card-arrow" />
                </view>
            </view>
            <text class="entry-tip">点击卡片进入对应端侧首页预览</text>
            <view class="login-entry" @tap="goLogin">
                <text class="login-entry-text">{{ store.isLoggedInUser() ? '切换账号' : '登录 / 注册' }}</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/composables/useUserStore'

const store = useUserStore()

const goStudent = () => {
    if (!store.isLoggedInUser()) {
        uni.navigateTo({ url: '/pages/auth/login' })
        return
    }
    if (store.getUserRole() !== 'student') {
        uni.navigateTo({ url: '/pages/auth/role-select' })
        return
    }
    uni.navigateTo({ url: '/pages/student/home' })
}

const goParent = () => {
    if (!store.isLoggedInUser()) {
        uni.navigateTo({ url: '/pages/auth/login' })
        return
    }
    if (store.getUserRole() !== 'teacher') {
        uni.navigateTo({ url: '/pages/auth/role-select' })
        return
    }
    uni.navigateTo({ url: '/pages/parent/home' })
}

const goLogin = () => {
    uni.navigateTo({ url: '/pages/auth/login' })
}
</script>

<style lang="scss" scoped>
@use '@/common/theme.scss' as *;

.entry-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #f8faff 0%, $color-page-bg 100%);
    position: relative;
    overflow: hidden;
}

.entry-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 480rpx;
    background: $gradient-header;
}

.bg-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(2rpx);
}

.c1 {
    width: 360rpx;
    height: 360rpx;
    top: -120rpx;
    right: -80rpx;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
}

.c2 {
    width: 220rpx;
    height: 220rpx;
    top: 140rpx;
    left: -60rpx;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.08) 100%);
}

.c3 {
    width: 140rpx;
    height: 140rpx;
    top: 80rpx;
    right: 150rpx;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
}

.entry-content {
    position: relative;
    z-index: 1;
    padding: 120rpx 40rpx 60rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.entry-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 64rpx;
}

.logo-wrap {
    width: 140rpx;
    height: 140rpx;
    background: rgba(255, 255, 255, 0.98);
    border-radius: 36rpx;
    @include flex-center;
    margin-bottom: 32rpx;
    box-shadow: 0 12rpx 40rpx rgba(54, 120, 255, 0.18);
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: -2rpx;
        left: -2rpx;
        right: -2rpx;
        bottom: -2rpx;
        background: $gradient-primary;
        border-radius: 38rpx;
        z-index: -1;
    }
}

.logo-text {
    font-size: 52rpx;
    font-weight: 800;
    background: $gradient-primary;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.entry-title {
    font-size: 56rpx;
    font-weight: 800;
    color: #fff;
    margin-bottom: 16rpx;
    text-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.entry-subtitle {
    font-size: 28rpx;
    color: #555555;
    line-height: 1.6;
    text-align: center;
    max-width: 85%;
    letter-spacing: 1rpx;
}

.entry-intro-card {
    width: 100%;
    background: #ffffff;
    border-radius: 20rpx;
    padding: 32rpx;
    margin-bottom: 32rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
    border: 2rpx solid rgba(54, 120, 255, 0.08);
}

.entry-cards {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 28rpx;
}

.entry-card {
    position: relative;
    @include card-base;
    padding: 44rpx 40rpx 40rpx;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s ease;
    
    &:active {
        transform: scale(0.98);
        box-shadow: $shadow-float;
    }
}

.entry-card.student {
    border-top: 8rpx solid $color-primary;
    border-left: 2rpx solid rgba(54, 120, 255, 0.1);
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 200rpx;
        background: linear-gradient(180deg, rgba(54, 120, 255, 0.03) 0%, transparent 100%);
        pointer-events: none;
    }
}

.entry-card.parent {
    border-top: 8rpx solid $color-success;
    border-left: 2rpx solid rgba(82, 196, 26, 0.1);
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 200rpx;
        background: linear-gradient(180deg, rgba(82, 196, 26, 0.03) 0%, transparent 100%);
        pointer-events: none;
    }
}

.card-badge {
    position: absolute;
    top: 28rpx;
    right: 28rpx;
    background: rgba(54, 120, 255, 0.08);
    color: $color-primary;
    font-size: 24rpx;
    padding: 8rpx 20rpx;
    border-radius: 20rpx;
    font-weight: 700;
    letter-spacing: 2rpx;
    border: 2rpx solid rgba(54, 120, 255, 0.15);
}

.parent-badge {
    background: rgba(82, 196, 26, 0.08);
    color: $color-success;
    border: 2rpx solid rgba(82, 196, 26, 0.15);
}

.card-icon-wrap {
    width: 96rpx;
    height: 96rpx;
    border-radius: 24rpx;
    @include flex-center;
    margin-bottom: 24rpx;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        top: -4rpx;
        left: -4rpx;
        right: -4rpx;
        bottom: -4rpx;
        border-radius: 28rpx;
        background: inherit;
        opacity: 0.3;
        z-index: -1;
    }
}

.student-icon {
    background: $gradient-primary;
    box-shadow: 0 12rpx 32rpx rgba(54, 120, 255, 0.4);
}

.parent-icon {
    background: linear-gradient(135deg, #52c41a, #73d13d);
    box-shadow: 0 12rpx 32rpx rgba(82, 196, 26, 0.4);
}

.card-icon-char {
    font-size: 44rpx;
    color: #fff;
    font-weight: 800;
    text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.card-title {
    font-size: 38rpx;
    font-weight: 800;
    color: $color-title;
    margin-bottom: 16rpx;
    letter-spacing: 2rpx;
}

.card-desc {
    font-size: 28rpx;
    color: $color-body;
    line-height: 1.6;
    margin-bottom: 24rpx;
    letter-spacing: 1rpx;
}

.card-tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12rpx;
}

.mini-tag {
    font-size: 24rpx;
    color: $color-body;
    background: linear-gradient(135deg, #f8faff 0%, #f0f5ff 100%);
    padding: 8rpx 20rpx;
    border-radius: 12rpx;
    border: 2rpx solid rgba(54, 120, 255, 0.08);
    font-weight: 500;
}

.card-arrow {
    position: absolute;
    right: 40rpx;
    bottom: 52rpx;
    width: 20rpx;
    height: 20rpx;
    border-right: 4rpx solid $color-primary;
    border-bottom: 4rpx solid $color-primary;
    transform: rotate(-45deg);
    opacity: 0.6;
    transition: all 0.3s ease;
    
    .entry-card:active & {
        opacity: 1;
        transform: rotate(-45deg) translateX(4rpx);
    }
}

.entry-tip {
    margin-top: 56rpx;
    font-size: 26rpx;
    color: $color-auxiliary;
    letter-spacing: 2rpx;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -40rpx;
        width: 24rpx;
        height: 2rpx;
        background: linear-gradient(90deg, transparent, $color-auxiliary);
        transform: translateY(-50%);
    }
    
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -40rpx;
        width: 24rpx;
        height: 2rpx;
        background: linear-gradient(90deg, $color-auxiliary, transparent);
        transform: translateY(-50%);
    }
}

.login-entry {
    margin-top: 24rpx;
    padding: 16rpx 48rpx;
    border-radius: 40rpx;
    border: 2rpx solid $color-primary;
    transition: all 0.3s ease;

    &:active {
        background: rgba(54, 120, 255, 0.05);
        transform: scale(0.98);
    }
}

.login-entry-text {
    font-size: 28rpx;
    color: $color-primary;
    font-weight: 600;
}
</style>
