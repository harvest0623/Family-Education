<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useUserStore } from "@/composables/useUserStore";

const AUTH_PAGES = [
    '/pages/auth/login',
    '/pages/auth/register',
    '/pages/auth/forgot-password',
]

function getCurrentPagePath(): string {
    const pages = getCurrentPages()
    if (pages.length > 0) {
        const page = pages[pages.length - 1] as any
        return '/' + (page.route || page.$page?.fullPath?.split('?')[0] || '')
    }
    return ''
}

onLaunch(() => {
    const store = useUserStore()
    const currentPath = getCurrentPagePath()

    if (!store.isLoggedInUser() && !AUTH_PAGES.includes(currentPath) && currentPath !== '/pages/index/index') {
        uni.reLaunch({ url: '/pages/auth/login' })
    }
});
onShow(() => {
    console.log("App Show");
});
onHide(() => {
    console.log("App Hide");
});
</script>
<style lang="scss">
@use '@/common/theme.scss' as *;

page {
    background-color: $color-page-bg;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        sans-serif;
}
</style>
