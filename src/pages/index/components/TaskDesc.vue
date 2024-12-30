<template>
  <view v-if="props.type === 'create'">
    🫡 我创建了一项任务，要在
    <view :class="`${importTextClass}`">2025年12月11日</view>
    前完成
    <view :class="`${importTextClass}`">Unaipp 小程序的迁移</view>
  </view>
  <view v-else>
    <view class="mb-2">
      👏 我提前
      <view :class="`${importTextClass} text-red`">3</view>
      天完成了
      <view :class="`${importTextClass}`">Unaipp 小程序的迁移</view>
    </view>
    <wd-swiper class="pt-2" :list="swiperList" autoplay v-model:current="current" />
  </view>
</template>
<script setup lang="ts">
const props = defineProps<{
  type: 'create' | 'done'
}>()

const importTextClass = 'mx-[2px] px-[4px] py-[2px] inline bg-[#f1f1f1] rounded-[2px]'

const current = ref<number>(0)
const swiperList = ref([
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/capybara.jpg',
  'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_155516.mp4',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/meng.jpg',
  'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/moon.jpg',
])
</script>
