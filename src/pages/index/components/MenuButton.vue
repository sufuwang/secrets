<template>
  <wd-fab
    :draggable="true"
    :gap="{
      bottom: 100,
    }"
    :zIndex="props.zIndex"
  >
    <template #trigger>
      <view
        class="w-[34px] h-[34px] shadow-[2px_2px_4px_rgba(0,0,0,.4)] bg-white rounded-br-[8px] flex justify-center items-center p-[4px]"
        @click="onClick"
      >
        <wd-icon name="edit-outline" size="18px"></wd-icon>
      </view>
    </template>
  </wd-fab>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store'

const props = defineProps<{ zIndex: number }>()
const { login } = useUserStore()

const onClick = async () => {
  const openid = await uni.getStorageSync('openid')
  if (openid) {
    const profile = JSON.parse((await uni.getStorageSync('profile')) || '{}')
    if (openid === '-' || (profile.nickname && profile.avatar)) {
      uni.navigateTo({
        url: '/pages/task/index',
      })
    } else {
      uni.navigateTo({
        url: '/pages/profile/index?to=/pages/task/index',
      })
    }
  } else {
    login()
  }
}
</script>
<style lang="scss" scoped></style>
