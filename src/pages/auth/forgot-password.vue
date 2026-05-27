<template>
    <view class="forgot-page">
        <view class="forgot-bg">
            <view class="bg-circle c1" />
            <view class="bg-circle c2" />
        </view>
        <view class="forgot-content">
            <view class="forgot-header">
                <view class="logo-wrap">
                    <text class="logo-text">家教</text>
                </view>
                <text class="forgot-title">忘记密码</text>
                <text class="forgot-subtitle">通过手机号验证重置密码</text>
            </view>
            <view class="forgot-form">
                <view class="step-indicator">
                    <view :class="['step-dot', currentStep >= 1 ? 'active' : '']">
                        <text class="step-num">1</text>
                    </view>
                    <view :class="['step-line', currentStep >= 2 ? 'active' : '']" />
                    <view :class="['step-dot', currentStep >= 2 ? 'active' : '']">
                        <text class="step-num">2</text>
                    </view>
                </view>
                <view v-if="currentStep === 1" class="step-content">
                    <view class="form-item">
                        <view class="input-wrap">
                            <text class="input-icon">📱</text>
                            <input
                                v-model="formData.phone"
                                type="number"
                                placeholder="请输入注册手机号"
                                maxlength="11"
                                class="form-input"
                            />
                        </view>
                    </view>
                    <view class="form-item">
                        <view class="input-wrap code-wrap">
                            <text class="input-icon">🔢</text>
                            <input
                                v-model="formData.code"
                                type="number"
                                placeholder="请输入验证码"
                                maxlength="6"
                                class="form-input"
                            />
                            <view :class="['code-btn', countdown > 0 ? 'disabled' : '']" @tap="sendCode">
                                <text class="code-btn-text">{{ countdown > 0 ? countdown + 's' : '获取验证码' }}</text>
                            </view>
                        </view>
                    </view>
                    <view class="next-btn" @tap="verifyCode">
                        <text class="btn-text">下一步</text>
                    </view>
                </view>
                <view v-else class="step-content">
                    <view class="form-item">
                        <view class="input-wrap">
                            <text class="input-icon">🔒</text>
                            <input
                                v-model="formData.newPassword"
                                :password="!showPassword"
                                placeholder="请输入新密码（6-20位）"
                                maxlength="20"
                                class="form-input"
                            />
                            <view class="eye-icon" @tap="showPassword = !showPassword">
                                <text>{{ showPassword ? '👁' : '🙈' }}</text>
                            </view>
                        </view>
                    </view>
                    <view class="form-item">
                        <view class="input-wrap">
                            <text class="input-icon">🔒</text>
                            <input
                                v-model="formData.confirmPassword"
                                :password="!showConfirmPassword"
                                placeholder="请确认新密码"
                                maxlength="20"
                                class="form-input"
                            />
                            <view class="eye-icon" @tap="showConfirmPassword = !showConfirmPassword">
                                <text>{{ showConfirmPassword ? '👁' : '🙈' }}</text>
                            </view>
                        </view>
                    </view>
                    <view class="reset-btn" @tap="handleResetPassword">
                        <text class="btn-text">重置密码</text>
                    </view>
                </view>
                <view class="back-login" @tap="goLogin">
                    <text class="link-text">返回登录</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/composables/useUserStore'

const store = useUserStore()
const currentStep = ref(1)
const countdown = ref(0)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const formData = reactive({
    phone: '',
    code: '',
    newPassword: '',
    confirmPassword: '',
})

let countdownTimer: ReturnType<typeof setInterval> | null = null

const sendCode = () => {
    if (countdown.value > 0) return
    if (!formData.phone) {
        uni.showToast({ title: '请输入手机号', icon: 'none' })
        return
    }
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
        uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
        return
    }
    countdown.value = 60
    uni.showToast({ title: '验证码已发送', icon: 'success' })
    countdownTimer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0 && countdownTimer) {
            clearInterval(countdownTimer)
            countdownTimer = null
        }
    }, 1000)
}

const verifyCode = () => {
    if (!formData.phone) {
        uni.showToast({ title: '请输入手机号', icon: 'none' })
        return
    }
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
        uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
        return
    }
    if (!formData.code) {
        uni.showToast({ title: '请输入验证码', icon: 'none' })
        return
    }
    if (formData.code.length !== 6) {
        uni.showToast({ title: '请输入6位验证码', icon: 'none' })
        return
    }
    currentStep.value = 2
}

const handleResetPassword = () => {
    if (!formData.newPassword) {
        uni.showToast({ title: '请输入新密码', icon: 'none' })
        return
    }
    if (formData.newPassword.length < 6) {
        uni.showToast({ title: '密码长度不能少于6位', icon: 'none' })
        return
    }
    if (formData.newPassword !== formData.confirmPassword) {
        uni.showToast({ title: '两次输入的密码不一致', icon: 'none' })
        return
    }

    const ok = store.resetPassword(formData.phone, formData.newPassword)
    if (!ok) {
        uni.showToast({ title: '该手机号未注册', icon: 'none' })
        return
    }

    uni.showToast({ title: '密码重置成功', icon: 'success' })
    setTimeout(() => {
        uni.navigateBack()
    }, 1200)
}

const goLogin = () => {
    uni.navigateBack()
}
</script>

<style lang="scss" scoped>
@use '@/common/theme.scss' as *;

.forgot-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #f8faff 0%, $color-page-bg 100%);
    position: relative;
    overflow: hidden;
}

.forgot-bg {
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

.forgot-content {
    position: relative;
    z-index: 1;
    padding: 80rpx 48rpx;
}

.forgot-header {
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

.forgot-title {
    font-size: 48rpx;
    font-weight: 800;
    color: #fff;
    margin-bottom: 12rpx;
    text-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.forgot-subtitle {
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.9);
}

.forgot-form {
    background: #ffffff;
    border-radius: 24rpx;
    padding: 48rpx 40rpx;
    box-shadow: 0 8rpx 40rpx rgba(0, 0, 0, 0.08);
}

.step-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40rpx;
    gap: 0;
}

.step-dot {
    width: 52rpx;
    height: 52rpx;
    border-radius: 50%;
    background: #eef1f6;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &.active {
        background: $gradient-primary;
        box-shadow: 0 4rpx 16rpx rgba(54, 120, 255, 0.3);
    }
}

.step-num {
    font-size: 24rpx;
    font-weight: 700;
    color: $color-auxiliary;

    .step-dot.active & {
        color: #fff;
    }
}

.step-line {
    width: 120rpx;
    height: 4rpx;
    background: #eef1f6;
    transition: all 0.3s ease;

    &.active {
        background: $color-primary;
    }
}

.step-content {
    margin-bottom: 32rpx;
}

.form-item {
    margin-bottom: 28rpx;
}

.input-wrap {
    display: flex;
    align-items: center;
    background: #f8faff;
    border-radius: 16rpx;
    padding: 24rpx 28rpx;
    border: 2rpx solid #eef1f6;
    transition: all 0.3s ease;
}

.code-wrap {
    padding-right: 16rpx;
}

.input-icon {
    font-size: 32rpx;
    margin-right: 20rpx;
}

.form-input {
    flex: 1;
    font-size: 30rpx;
    color: $color-title;
    background: transparent;
}

.eye-icon {
    font-size: 32rpx;
    padding: 8rpx;
}

.code-btn {
    background: $gradient-primary;
    border-radius: 12rpx;
    padding: 12rpx 24rpx;

    &.disabled {
        opacity: 0.6;
    }
}

.code-btn-text {
    font-size: 24rpx;
    color: #fff;
    font-weight: 600;
    white-space: nowrap;
}

.next-btn,
.reset-btn {
    background: $gradient-primary;
    border-radius: 48rpx;
    padding: 28rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40rpx;
    box-shadow: 0 8rpx 24rpx rgba(54, 120, 255, 0.35);
    transition: all 0.3s ease;

    &:active {
        transform: scale(0.98);
        box-shadow: 0 4rpx 12rpx rgba(54, 120, 255, 0.25);
    }
}

.btn-text {
    font-size: 32rpx;
    font-weight: 700;
    color: #fff;
    letter-spacing: 8rpx;
}

.back-login {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24rpx;
}

.link-text {
    font-size: 28rpx;
    color: $color-primary;
    font-weight: 600;
}
</style>
