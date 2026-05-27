import { reactive, readonly } from 'vue'

export type UserRole = 'student' | 'teacher' | ''

export interface UserInfo {
    username: string
    phone: string
    nickname: string
    avatar: string
    role: UserRole
}

const state = reactive({
    isLoggedIn: false,
    userInfo: {
        username: '',
        phone: '',
        nickname: '',
        avatar: '',
        role: '' as UserRole,
    } as UserInfo,
})

const AUTH_KEY = 'fe_auth'
const USERS_KEY = 'fe_registered_users'

function persist() {
    uni.setStorageSync(AUTH_KEY, JSON.stringify({
        isLoggedIn: state.isLoggedIn,
        userInfo: state.userInfo,
    }))
}

function restore() {
    try {
        const raw = uni.getStorageSync(AUTH_KEY)
        if (raw) {
            const data = JSON.parse(raw)
            if (data.isLoggedIn && data.userInfo) {
                state.isLoggedIn = true
                Object.assign(state.userInfo, data.userInfo)
            }
        }
    } catch {
        // ignore
    }
}

function getRegisteredUsers(): Record<string, { password: string; username: string; nickname: string }> {
    try {
        const raw = uni.getStorageSync(USERS_KEY)
        return raw ? JSON.parse(raw) : {}
    } catch {
        return {}
    }
}

function saveRegisteredUsers(users: Record<string, { password: string; username: string; nickname: string }>) {
    uni.setStorageSync(USERS_KEY, JSON.stringify(users))
}

restore()

export function useUserStore() {
    function login(phoneOrUsername: string, password: string): boolean {
        const users = getRegisteredUsers()
        const user = users[phoneOrUsername]
        if (!user) return false
        if (user.password !== password) return false

        state.isLoggedIn = true
        state.userInfo.username = user.username
        state.userInfo.phone = phoneOrUsername.startsWith('1') ? phoneOrUsername : ''
        state.userInfo.nickname = user.nickname
        state.userInfo.role = ''
        persist()
        return true
    }

    function register(username: string, phone: string, password: string): { success: boolean; message: string } {
        const users = getRegisteredUsers()
        if (users[phone]) {
            return { success: false, message: '该手机号已注册' }
        }
        users[phone] = { password, username, nickname: username }
        users[username] = { password, username, nickname: username }
        saveRegisteredUsers(users)
        return { success: true, message: '注册成功' }
    }

    function resetPassword(phone: string, newPassword: string): boolean {
        const users = getRegisteredUsers()
        if (!users[phone]) return false
        users[phone].password = newPassword
        saveRegisteredUsers(users)
        return true
    }

    function setRole(role: UserRole) {
        state.userInfo.role = role
        persist()
    }

    function logout() {
        state.isLoggedIn = false
        Object.assign(state.userInfo, {
            username: '',
            phone: '',
            nickname: '',
            avatar: '',
            role: '',
        })
        uni.removeStorageSync(AUTH_KEY)
    }

    function isLoggedInUser() {
        return state.isLoggedIn
    }

    function getUserRole(): UserRole {
        return state.userInfo.role
    }

    return {
        state: readonly(state),
        login,
        register,
        resetPassword,
        setRole,
        logout,
        isLoggedInUser,
        getUserRole,
    }
}
