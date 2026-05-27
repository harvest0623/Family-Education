<template>
    <view class="role-page">
        <view class="role-bg">
            <view class="bg-circle c1" />
            <view class="bg-circle c2" />
        </view>
        <view class="role-content">
            <view class="role-header">
                <view class="logo-wrap">
                    <text class="logo-text">家教</text>
                </view>
                <text class="role-title">选择角色</text>
                <text class="role-subtitle">请选择您的身份以继续使用系统</text>
            </view>
            <view class="role-cards">
                <view :class="['role-card', selectedRole === 'student' ? 'selected' : '']" @tap="selectRole('student')">
                    <view class="role-card-bg student-bg" />
                    <view class="role-icon-wrap student-icon-wrap">
                        <text class="role-icon-text">学</text>
                    </view>
                    <view class="role-info">
                        <text class="role-name">学生</text>
                        <text class="role-desc">找兼职、课程学习、收入管理、教学资源</text>
                    </view>
                    <view v-if="selectedRole === 'student'" class="selected-badge">
                        <text class="selected-badge-text">✓</text>
                    </view>
                </view>
                <view :class="['role-card', selectedRole === 'teacher' ? 'selected' : '']" @tap="selectRole('teacher')">
                    <view class="role-card-bg teacher-bg" />
                    <view class="role-icon-wrap teacher-icon-wrap">
                        <text class="role-icon-text">师</text>
                    </view>
                    <view class="role-info">
                        <text class="role-name">老师</text>
                        <text class="role-desc">发布课程、管理学生、收益查看、教学管理</text>
                    </view>
                    <view v-if="selectedRole === 'teacher'" class="selected-badge">
                        <text class="selected-badge-text">✓</text>
                    </view>
                </view>
            </view>
            <view :class="['confirm-btn', selectedRole ? '' : 'disabled']" @tap="confirmRole">
                <text class="confirm-btn-text">确认进入</text>
            </view>
            <view class="logout-link" @tap="handleLogout">
                <text class="logout-text">退出登录</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore, type UserRole } from '@/composables/useUserStore'

const store = useUserStore()
const selectedRole = ref<UserRole>('')

const selectRole = (role: UserRole) => {
    selectedRole.value = role
}

const confirmRole = () => {
    if (!selectedRole.value) {
        uni.showToast({ title: '请选择角色', icon: 'none' })
        return
    }
    store.setRole(selectedRole.value)
    const target = selectedRole.value === 'student'
        ? '/pages/student/home'
        : '/pages/parent/home'
    uni.reLaunch({ url: target })
}

const handleLogout = () => {
    uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        confirmColor: '#3678ff',
        success: (res) => {
            if (res.confirm) {
                store.logout()
                uni.reLaunch({ url: '/pages/auth/login' })
            }
        }
    })
}
</script>

<style lang="scss" scoped>
@use '@/common/theme.scss' as *;

.role-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #f8faff 0%, $color-page-bg 100%);
    position: relative;
    overflow: hidden;
}

.role-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 400rpx;
    background: $gradient-header;
}

.bg-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
}

.c1 {
    width: 300rpx;
    height: 300rpx;
    top: -100rpx;
    right: -60rpx;
}

.c2 {
    width: 200rpx;
    height: 200rpx;
    top: 100rpx;
    left: -40rpx;
}

.role-content {
    position: relative;
    z-index: 1;
    padding: 80rpx 48rpx;
}

.role-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 60rpx;
}

.logo-wrap {
    width: 120rpx;
    height: 120rpx;
    background: rgba(255, 255, 255, 0.98);
    border-radius: 32rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32rpx;
    box-shadow: 0 12rpx 40rpx rgba(54, 120, 255, 0.18);
}

.logo-text {
    font-size: 48rpx;
    font-weight: 800;
    background: $gradient-primary;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.role-title {
    font-size: 48rpx;
    font-weight: 800;
    color: #fff;
    margin-bottom: 12rpx;
    text-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.role-subtitle {
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.9);
}

.role-cards {
    display: flex;
    flex-direction: column;
    gap: 28rpx;
    margin-bottom: 48rpx;
}

.role-card {
    position: relative;
    background: #ffffff;
    border-radius: 24rpx;
    padding: 40rpx 36rpx;
    display: flex;
    align-items: center;
    gap: 28rpx;
    box-shadow: 0 4rpx 24rpx rgba(31, 56, 88, 0.06);
    border: 3rpx solid transparent;
    overflow: hidden;
    transition: all 0.3s ease;

    &:active {
        transform: scale(0.98);
    }

    &.selected {
        border-color: $color-primary;
        box-shadow: 0 8rpx 32rpx rgba(54, 120, 255, 0.15);
    }
}

.role-card-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6rpx;
}

.student-bg {
    background: $gradient-primary;
}

.teacher-bg {
    background: linear-gradient(135deg, #52c41a, #73d13d);
}

.role-icon-wrap {
    width: 96rpx;
    height: 96rpx;
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.student-icon-wrap {
    background: $gradient-primary;
    box-shadow: 0 8rpx 24rpx rgba(54, 120, 255, 0.35);
}

.teacher-icon-wrap {
    background: linear-gradient(135deg, #52c41a, #73d13d);
    box-shadow: 0 8rpx 24rpx rgba(82, 196, 26, 0.35);
}

.role-icon-text {
    font-size: 40rpx;
    font-weight: 800;
    color: #fff;
}

.role-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8rpx;
}

.role-name {
    font-size: 36rpx;
    font-weight: 700;
    color: $color-title;
}

.role-desc {
    font-size: 24rpx;
    color: $color-body;
    line-height: 1.5;
}

.selected-badge {
    position: absolute;
    top: 16rpx;
    right: 16rpx;
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    background: $color-primary;
    display: flex;
    align-items: center;
    justify-content: center;
}

.selected-badge-text {
    font-size: 24rpx;
    color: #fff;
    font-weight: 700;
}

.confirm-btn {
    background: $gradient-primary;
    border-radius: 48rpx;
    padding: 28rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8rpx 24rpx rgba(54, 120, 255, 0.35);
    transition: all 0.3s ease;

    &:active {
        transform: scale(0.98);
    }

    &.disabled {
        opacity: 0.5;
        box-shadow: none;
    }
}

.confirm-btn-text {
    font-size: 32rpx;
    font-weight: 700;
    color: #fff;
    letter-spacing: 8rpx;
}

.logout-link {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 32rpx;
}

.logout-text {
    font-size: 26rpx;
    color: $color-auxiliary;
}
</style>
