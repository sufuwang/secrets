<template>
  <view v-if="topHeight" class="flex flex-col">
    <view
      class="position w-full h-[fit-content] font-500 fixed bg-white/34 backdrop-blur-md flex flex-row justify-center items-end pb-[10px] z-[100]"
      :style="{
        height: `${topHeight}px`,
      }"
    >
      <view v-if="!props.disableNavigateBack" class="absolute left-[12px]">
        <wd-icon name="thin-arrow-left" size="16px" @click="onNavigateBack"></wd-icon>
      </view>
      <slot v-if="$slots.title" name="title" />
      <view v-else>
        {{ props.title || 'Secretsss' }}
      </view>
    </view>
    <view
      :class="`bg-[#f1f2f3] pb-2 grow full ${props.childClass}`"
      :style="{
        marginTop: `${10 + topHeight}px`,
      }"
    >
      <slot />
    </view>
  </view>
</template>
<script lang="ts" setup>
interface Props {
  title?: string
  disableNavigateBack?: boolean
  childClass?: string
}

const props = defineProps<Props>()
const height = reactive({
  system: 0,
  menuButton: 0,
})
const topHeight = computed(() => height.system + height.menuButton)

onMounted(() => {
  const systemInfo = uni.getWindowInfo()
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
  height.system = systemInfo.statusBarHeight
  height.menuButton = menuButtonInfo.height
})

const onNavigateBack = () => {
  uni.navigateBack().catch(() => {
    uni.redirectTo({
      url: '/pages/index/index',
    })
  })
}
</script>
<style lang="scss" scoped>
.full {
  min-height: calc(94vh - var(--window-top) - env(safe-area-inset-bottom));
}
</style>
