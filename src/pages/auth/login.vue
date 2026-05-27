<template>
    <view class="login-page">
        <view class="login-bg">
            <view class="bg-circle c1" />
            <view class="bg-circle c2" />
        </view>
        <view class="login-content">
            <view class="login-header">
                <view class="logo-wrap">
                    <text class="logo-text">家教</text>
                </view>
                <text class="login-title">欢迎回来</text>
                <text class="login-subtitle">登录您的家教系统账号</text>
            </view>
            <view class="login-form">
                <view class="form-item">
                    <view class="input-wrap">
                        <text class="input-icon">👤</text>
                        <input
                            v-model="formData.account"
                            placeholder="请输入用户名或手机号"
                            maxlength="20"
                            class="form-input"
                        />
                    </view>
                </view>
                <view class="form-item">
                    <view class="input-wrap">
                        <text class="input-icon">🔒</text>
                        <input
                            v-model="formData.password"
                            :password="!showPassword"
                            placeholder="请输入密码"
                            maxlength="20"
                            class="form-input"
                        />
                        <view class="eye-icon" @tap="togglePasswordVisibility">
                            <text>{{ showPassword ? '👁' : '🙈' }}</text>
                        </view>
                    </view>
                </view>
                <view class="form-options">
                    <view class="remember-me" @tap="toggleRemember">
                        <view :class="['checkbox', rememberMe ? 'checked' : '']">
                            <text v-if="rememberMe" class="check-icon">✓</text>
                        </view>
                        <text class="remember-text">记住我</text>
                    </view>
                    <text class="forgot-password" @tap="goForgotPassword">忘记密码？</text>
                </view>
                <view class="login-btn" @tap="handleLogin">
                    <text class="btn-text">登 录</text>
                </view>
                <view class="divider">
                    <view class="divider-line" />
                    <text class="divider-text">其他方式</text>
                    <view class="divider-line" />
                </view>
                <view class="register-link">
                    <text class="link-text">还没有账号？</text>
                    <text class="link-action" @tap="goRegister">立即注册</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '@/composables/useUserStore'

const store = useUserStore()

const formData = reactive({
    account: '',
    password: '',
})
const showPassword = ref(false)
const rememberMe = ref(false)

const REMEMBER_KEY = 'fe_remember_account'

onMounted(() => {
    const saved = uni.getStorageSync(REMEMBER_KEY)
    if (saved) {
        formData.account = saved
        rememberMe.value = true
    }
})

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}

const toggleRemember = () => {
    rememberMe.value = !rememberMe.value
}

const handleLogin = () => {
    if (!formData.account.trim()) {
        uni.showToast({ title: '请输入用户名或手机号', icon: 'none' })
        return
    }
    if (!formData.password) {
        uni.showToast({ title: '请输入密码', icon: 'none' })
        return
    }
    if (formData.password.length < 6) {
        uni.showToast({ title: '密码长度不能少于6位', icon: 'none' })
        return
    }

    const ok = store.login(formData.account.trim(), formData.password)
    if (!ok) {
        uni.showToast({ title: '用户名或密码错误', icon: 'none' })
        return
    }

    if (rememberMe.value) {
        uni.setStorageSync(REMEMBER_KEY, formData.account.trim())
    } else {
        uni.removeStorageSync(REMEMBER_KEY)
    }

    uni.showToast({ title: '登录成功', icon: 'success' })
    setTimeout(() => {
        uni.redirectTo({ url: '/pages/auth/role-select' })
    }, 1200)
}

const goRegister = () => {
    uni.navigateTo({ url: '/pages/auth/register' })
}

const goForgotPassword = () => {
    uni.navigateTo({ url: '/pages/auth/forgot-password' })
}
</script>

<style lang="scss" scoped>
@use '@/common/theme.scss' as *;

.login-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #f8faff 0%, $color-page-bg 100%);
    position: relative;
    overflow: hidden;
}

.login-bg {
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

.login-content {
    position: relative;
    z-index: 1;
    padding: 80rpx 48rpx;
}

.login-header {
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

.login-title {
    font-size: 48rpx;
    font-weight: 800;
    color: #fff;
    margin-bottom: 12rpx;
    text-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.login-subtitle {
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.9);
}

.login-form {
    background: #ffffff;
    border-radius: 24rpx;
    padding: 48rpx 40rpx;
    box-shadow: 0 8rpx 40rpx rgba(0, 0, 0, 0.08);
}

.form-item {
    margin-bottom: 32rpx;
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

.form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40rpx;
}

.remember-me {
    display: flex;
    align-items: center;
    gap: 12rpx;
}

.checkbox {
    width: 36rpx;
    height: 36rpx;
    border-radius: 8rpx;
    border: 2rpx solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &.checked {
        background: $color-primary;
        border-color: $color-primary;
    }
}

.check-icon {
    font-size: 24rpx;
    color: #fff;
    font-weight: 700;
}

.remember-text {
    font-size: 26rpx;
    color: $color-body;
}

.forgot-password {
    font-size: 26rpx;
    color: $color-primary;
    font-weight: 500;
}

.login-btn {
    background: $gradient-primary;
    border-radius: 48rpx;
    padding: 28rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32rpx;
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

.divider {
    display: flex;
    align-items: center;
    gap: 20rpx;
    margin-bottom: 28rpx;
}

.divider-line {
    flex: 1;
    height: 2rpx;
    background: #eef1f6;
}

.divider-text {
    font-size: 24rpx;
    color: $color-auxiliary;
    white-space: nowrap;
}

.register-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8rpx;
}

.link-text {
    font-size: 26rpx;
    color: $color-body;
}

.link-action {
    font-size: 26rpx;
    color: $color-primary;
    font-weight: 600;
}
</style>
