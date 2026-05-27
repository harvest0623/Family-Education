<template>
    <view class="register-page">
        <view class="register-bg">
            <view class="bg-circle c1" />
            <view class="bg-circle c2" />
        </view>
        <view class="register-content">
            <view class="register-header">
                <view class="logo-wrap">
                    <text class="logo-text">家教</text>
                </view>
                <text class="register-title">创建账号</text>
                <text class="register-subtitle">注册您的家教系统账号</text>
            </view>
            <view class="register-form">
                <view class="form-item">
                    <view class="input-wrap">
                        <text class="input-icon">👤</text>
                        <input
                            v-model="formData.username"
                            placeholder="请输入用户名"
                            maxlength="20"
                            class="form-input"
                        />
                    </view>
                </view>
                <view class="form-item">
                    <view class="input-wrap">
                        <text class="input-icon">📱</text>
                        <input
                            v-model="formData.phone"
                            type="number"
                            placeholder="请输入手机号"
                            maxlength="11"
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
                            placeholder="请输入密码（6-20位）"
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
                            placeholder="请确认密码"
                            maxlength="20"
                            class="form-input"
                        />
                        <view class="eye-icon" @tap="showConfirmPassword = !showConfirmPassword">
                            <text>{{ showConfirmPassword ? '👁' : '🙈' }}</text>
                        </view>
                    </view>
                </view>
                <view class="agreement">
                    <view :class="['checkbox', agreeTerms ? 'checked' : '']" @tap="agreeTerms = !agreeTerms">
                        <text v-if="agreeTerms" class="check-icon">✓</text>
                    </view>
                    <text class="agreement-text">我已阅读并同意</text>
                    <text class="agreement-link">《用户协议》</text>
                    <text class="agreement-text">和</text>
                    <text class="agreement-link">《隐私政策》</text>
                </view>
                <view class="register-btn" @tap="handleRegister">
                    <text class="btn-text">注 册</text>
                </view>
                <view class="login-link">
                    <text class="link-text">已有账号？</text>
                    <text class="link-action" @tap="goLogin">立即登录</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/composables/useUserStore'

const store = useUserStore()

const formData = reactive({
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
})
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const agreeTerms = ref(false)

const handleRegister = () => {
    if (!formData.username.trim()) {
        uni.showToast({ title: '请输入用户名', icon: 'none' })
        return
    }
    if (formData.username.trim().length < 2) {
        uni.showToast({ title: '用户名长度不能少于2位', icon: 'none' })
        return
    }
    if (!formData.phone) {
        uni.showToast({ title: '请输入手机号', icon: 'none' })
        return
    }
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
        uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
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
    if (formData.password !== formData.confirmPassword) {
        uni.showToast({ title: '两次输入的密码不一致', icon: 'none' })
        return
    }
    if (!agreeTerms.value) {
        uni.showToast({ title: '请同意用户协议和隐私政策', icon: 'none' })
        return
    }

    const result = store.register(formData.username.trim(), formData.phone, formData.password)
    if (!result.success) {
        uni.showToast({ title: result.message, icon: 'none' })
        return
    }

    uni.showToast({ title: '注册成功', icon: 'success' })
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

.register-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #f8faff 0%, $color-page-bg 100%);
    position: relative;
    overflow: hidden;
}

.register-bg {
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

.register-content {
    position: relative;
    z-index: 1;
    padding: 80rpx 48rpx;
}

.register-header {
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

.register-title {
    font-size: 48rpx;
    font-weight: 800;
    color: #fff;
    margin-bottom: 12rpx;
    text-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.register-subtitle {
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.9);
}

.register-form {
    background: #ffffff;
    border-radius: 24rpx;
    padding: 48rpx 40rpx;
    box-shadow: 0 8rpx 40rpx rgba(0, 0, 0, 0.08);
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

.agreement {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8rpx;
    margin-bottom: 36rpx;
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

.agreement-text {
    font-size: 24rpx;
    color: $color-body;
}

.agreement-link {
    font-size: 24rpx;
    color: $color-primary;
    font-weight: 500;
}

.register-btn {
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

.login-link {
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
