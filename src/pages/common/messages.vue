<template>
    <view class="sub-page">
        <PageNavbar title="消息中心" />
        <scroll-view class="scroll" scroll-y>
            <view
                v-for="item in messages"
                :key="item.id"
                class="msg-card"
                :class="{ unread: !item.read }"
                @tap="onOpen(item)"
            >
                <view class="msg-icon" :class="item.type" />
                <view class="msg-body">
                    <view class="msg-head">
                        <text class="msg-title">{{ item.title }}</text>
                        <text class="msg-time">{{ item.time }}</text>
                    </view>
                    <text class="msg-content">{{ item.content }}</text>
                </view>
                <view v-if="!item.read" class="unread-dot" />
            </view>
            <view class="bottom-space" />
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PageNavbar from '@/components/PageNavbar.vue'
import { messageList, type MessageItem } from '@/mock/messages'
import { getReadMessageIds, markMessageRead } from '@/utils/storage'

interface MsgView extends MessageItem {
    read: boolean
}

const messages = ref<MsgView[]>([])

onMounted(() => {
    const readIds = getReadMessageIds()
    messages.value = messageList.map((m) => ({
        ...m,
        read: readIds.includes(m.id),
    }))
})

const onOpen = (item: MsgView) => {
    markMessageRead(item.id)
    item.read = true
    uni.showModal({
        title: item.title,
        content: item.content,
        showCancel: false,
        confirmText: '知道了',
    })
}
</script>

<style lang="scss" scoped>
@use '@/common/theme.scss' as *;
.sub-page {
    min-height: 100vh;
    background: $color-page-bg;
}
.scroll {
    height: calc(100vh - 88rpx);
    padding: 16rpx 32rpx;
}
.msg-card {
    @include card-base;
    padding: 24rpx;
    margin-bottom: 16rpx;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: relative;
}
.msg-card.unread {
    background: linear-gradient(90deg, rgba(54, 120, 255, 0.04) 0%, #fff 100%);
}
.msg-icon {
    width: 72rpx;
    height: 72rpx;
    border-radius: 16rpx;
    margin-right: 20rpx;
    flex-shrink: 0;
}
.msg-icon.system {
    background: rgba(54, 120, 255, 0.15);
}
.msg-icon.order {
    background: rgba(82, 196, 26, 0.15);
}
.msg-icon.job {
    background: rgba(255, 138, 61, 0.15);
}
.msg-body {
    flex: 1;
    min-width: 0;
}
.msg-head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 8rpx;
}
.msg-title {
    font-size: 28rpx;
    font-weight: 600;
    color: $color-title;
}
.msg-time {
    font-size: 22rpx;
    color: $color-auxiliary;
    flex-shrink: 0;
    margin-left: 12rpx;
}
.msg-content {
    font-size: 26rpx;
    color: $color-body;
    @include ellipsis;
}
.unread-dot {
    position: absolute;
    top: 24rpx;
    right: 24rpx;
    width: 16rpx;
    height: 16rpx;
    background: $color-danger;
    border-radius: 50%;
}
.bottom-space {
    height: 32rpx;
}
</style>
