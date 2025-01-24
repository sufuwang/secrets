<template>
  <view v-if="topHeight" class="flex flex-col">
    <view
      :class="`w-full h-[fit-content] font-500 fixed bg-white/38 backdrop-blur-md flex flex-row justify-center items-end pb-[10px] z-[100] ${props.barClass}`"
      :style="{
        height: `${topHeight}px`,
      }"
    >
      <template v-if="!disableShowTitle">
        <view v-if="showNavigateBack" class="absolute left-[12px]">
          <wd-icon name="thin-arrow-left" size="16px" @click="onNavigateBack"></wd-icon>
        </view>
        <slot v-if="$slots.title" name="title" />
        <view v-else>
          {{ props.title || 'Secretsss' }}
        </view>
      </template>
    </view>
    <view
      :class="`grow h-fit ${props.childClass}`"
      :style="{
        marginTop: `${10 + topHeight}px`,
        minHeight: `calc(100vh - ${topHeight}px)`,
      }"
    >
      <slot />
    </view>
  </view>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store'

interface Props {
  title?: string
  disableShowTitle?: boolean
  disableNavigateBack?: boolean
  dynamicNavigateBack?: boolean
  barClass?: string
  childClass?: string
}

const props = defineProps<Props>()
const { userInfo } = useUserStore()

const height = reactive({
  system: 0,
  menuButton: 0,
})
const topHeight = computed(() => height.system + height.menuButton)
const showNavigateBack = computed(() => {
  if (props.disableNavigateBack) {
    return false
  }
  if (props.dynamicNavigateBack) {
    const { route } = getCurrentPages().at(-1)
    return userInfo.homeUrl !== `/${route}`
  }
  return true
})

onMounted(() => {
  const systemInfo = uni.getWindowInfo()
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
  height.system = systemInfo.statusBarHeight
  height.menuButton = menuButtonInfo.height
})

const onNavigateBack = () => {
  uni.navigateBack().catch(() => {
    uni.redirectTo({
      url: '/pages/community/index',
    })
  })
}
</script>
<style lang="scss" scoped>
.full {
  min-height: calc(94vh - var(--window-top) - env(safe-area-inset-bottom));
}
</style>
